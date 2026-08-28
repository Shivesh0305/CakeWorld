from datetime import datetime, timezone

from pydantic import BaseModel, ConfigDict, Field

from models.base import BaseDocument


class UserDocument(BaseDocument):
    email: str
    password_hash: str
    name: str = "Bakery Owner"
    role: str = "admin"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class UserPublic(BaseModel):
    id: str
    email: str
    name: str
    role: str

    model_config = ConfigDict(from_attributes=True)
