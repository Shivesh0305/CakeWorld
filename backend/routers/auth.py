import os
from datetime import datetime, timedelta, timezone

import bcrypt
import jwt
from bson import ObjectId
from bson.errors import InvalidId
from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from pydantic import BaseModel, EmailStr, Field

from lib.db import db
from models.user import UserDocument, UserPublic

JWT_ALGORITHM = "HS256"
ACCESS_MAX_AGE = 900
REFRESH_MAX_AGE = 604800
COOKIE_SECURE = os.environ.get("COOKIE_SECURE", "false").lower() == "true"
COOKIE_SAMESITE = os.environ.get("COOKIE_SAMESITE", "lax")

router = APIRouter(prefix="/auth", tags=["auth"])


class Credentials(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))


def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=15),
        "type": "access",
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


def create_refresh_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
        "type": "refresh",
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


def public_user(user: UserDocument) -> UserPublic:
    return UserPublic(id=user.id, email=user.email, name=user.name, role=user.role)


def set_auth_cookies(response: Response, user: UserDocument) -> None:
    response.set_cookie(
        key="access_token",
        value=create_access_token(user.id, user.email),
        httponly=True,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        max_age=ACCESS_MAX_AGE,
        path="/",
    )
    response.set_cookie(
        key="refresh_token",
        value=create_refresh_token(user.id),
        httponly=True,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        max_age=REFRESH_MAX_AGE,
        path="/",
    )


def normalize_email(email: str) -> str:
    return email.strip().lower()


def aware_datetime(value: datetime | None) -> datetime | None:
    if value is None or value.tzinfo is not None:
        return value
    return value.replace(tzinfo=timezone.utc)


async def get_current_user(request: Request) -> UserDocument:
    token = request.cookies.get("access_token")
    if not token:
        authorization = request.headers.get("Authorization", "")
        if authorization.startswith("Bearer "):
            token = authorization[7:]
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token type")
        user_id = ObjectId(str(payload["sub"]))
        document = await db.users.find_one({"_id": user_id})
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, InvalidId, KeyError, TypeError):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid session")

    if document is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return UserDocument.from_mongo(document)


async def require_admin(user: UserDocument = Depends(get_current_user)) -> UserDocument:
    if user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Owner access required")
    return user


async def seed_admin() -> None:
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    email = normalize_email(os.environ["ADMIN_EMAIL"])
    password = os.environ["ADMIN_PASSWORD"]
    document = await db.users.find_one({"email": email})
    if document is None:
        user = UserDocument(email=email, password_hash=hash_password(password), role="admin")
        await db.users.insert_one(user.to_mongo())
        return

    user = UserDocument.from_mongo(document)
    if not verify_password(password, user.password_hash) or user.role != "admin":
        await db.users.update_one(
            {"_id": ObjectId(user.id)},
            {"$set": {"password_hash": hash_password(password), "role": "admin"}},
        )


@router.post("/login", response_model=UserPublic)
async def login(payload: Credentials, request: Request, response: Response) -> UserPublic:
    email = normalize_email(str(payload.email))
    identifier = f"{request.client.host if request.client else 'unknown'}:{email}"
    now = datetime.now(timezone.utc)
    attempt = await db.login_attempts.find_one({"identifier": identifier})
    locked_until = aware_datetime(attempt.get("locked_until") if attempt else None)
    if locked_until and locked_until > now:
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail="Too many attempts. Try again later.")

    document = await db.users.find_one({"email": email})
    valid = document is not None and verify_password(payload.password, document["password_hash"])
    if not valid:
        failed_count = int(attempt.get("failed_count", 0) if attempt else 0) + 1
        update: dict[str, object] = {"$set": {"identifier": identifier, "updated_at": now}, "$inc": {"failed_count": 1}}
        if failed_count >= 5:
            update["$set"]["locked_until"] = now + timedelta(minutes=15)  # type: ignore[index]
        await db.login_attempts.update_one({"identifier": identifier}, update, upsert=True)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Email or password is incorrect")

    await db.login_attempts.delete_one({"identifier": identifier})
    user = UserDocument.from_mongo(document)
    set_auth_cookies(response, user)
    return public_user(user)


@router.post("/register", response_model=UserPublic)
async def register(payload: Credentials, response: Response) -> UserPublic:
    if await db.users.count_documents({}) > 0:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Owner account is already provisioned")
    user = UserDocument(email=normalize_email(str(payload.email)), password_hash=hash_password(payload.password), role="admin")
    await db.users.insert_one(user.to_mongo())
    set_auth_cookies(response, user)
    return public_user(user)


@router.post("/refresh", response_model=UserPublic)
async def refresh(request: Request, response: Response) -> UserPublic:
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No refresh session")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")
        document = await db.users.find_one({"_id": ObjectId(str(payload["sub"]))})
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, InvalidId, KeyError, TypeError):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh session")
    if document is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    user = UserDocument.from_mongo(document)
    set_auth_cookies(response, user)
    return public_user(user)


@router.post("/logout")
async def logout(response: Response) -> dict[str, bool]:
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"ok": True}


@router.get("/me", response_model=UserPublic)
async def me(user: UserDocument = Depends(get_current_user)) -> UserPublic:
    return public_user(user)
