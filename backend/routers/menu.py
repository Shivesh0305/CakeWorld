from datetime import datetime, timezone

from bson import ObjectId
from bson.errors import InvalidId
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field

from lib.db import db
from models.menu import MenuItemDocument
from models.user import UserDocument
from routers.auth import require_admin

router = APIRouter(prefix="/menu", tags=["menu"])


class MenuItemPayload(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    name_kn: str = Field(default="", max_length=120)
    category: str = Field(min_length=1, max_length=80)
    category_kn: str = Field(default="", max_length=80)
    description: str = Field(min_length=1, max_length=360)
    description_kn: str = Field(default="", max_length=360)
    price_inr: int | None = Field(default=None, ge=0, le=100000)
    image_url: str = Field(default="", max_length=600)
    alt: str = Field(default="Bakery menu item", max_length=180)
    is_visible: bool = True
    is_featured: bool = False
    sort_order: int = Field(default=0, ge=0, le=999)


class MenuItemView(BaseModel):
    id: str
    name: str
    name_kn: str
    category: str
    category_kn: str
    description: str
    description_kn: str
    price_inr: int | None
    image_url: str
    alt: str
    is_visible: bool
    is_featured: bool
    sort_order: int


def to_view(item: MenuItemDocument) -> MenuItemView:
    return MenuItemView(
        id=item.id,
        name=item.name,
        name_kn=item.name_kn,
        category=item.category,
        category_kn=item.category_kn,
        description=item.description,
        description_kn=item.description_kn,
        price_inr=item.price_inr,
        image_url=item.image_url,
        alt=item.alt,
        is_visible=item.is_visible,
        is_featured=item.is_featured,
        sort_order=item.sort_order,
    )


SEED_ITEMS = [
    {
        "name": "Birthday cakes",
        "name_kn": "ಹುಟ್ಟುಹಬ್ಬದ ಕೇಕ್‌ಗಳು",
        "category": "Celebrations",
        "category_kn": "ಆಚರಣೆಗಳು",
        "description": "A centrepiece for the candle moment, chosen with a little help from the people behind the counter.",
        "description_kn": "ಮೇಣದಬತ್ತಿ ಹಚ್ಚುವ ಕ್ಷಣಕ್ಕೆ, ಕೌಂಟರ್ ಹಿಂದಿನವರ ಸಹಾಯದಿಂದ ಆಯ್ಕೆಮಾಡುವ ವಿಶೇಷ ಕೇಕ್.",
        "image_url": "https://static.prod-images.emergentagent.com/jobs/97bc0cba-d75d-4760-9020-70de12137d5a/images/52644be104f165919bfcb32e68df3626d590ebea189b4e10485489bc28b7f7dc.jpeg",
        "alt": "Dark chocolate celebration cake topped with cherries",
        "is_featured": True,
        "sort_order": 1,
    },
    {
        "name": "Vanilla berry cakes",
        "name_kn": "ವೆನಿಲ್ಲಾ ಬೆರಿ ಕೇಕ್‌ಗಳು",
        "category": "Light & bright",
        "category_kn": "ಹಗುರವಾದ ಸಿಹಿ",
        "description": "Soft layers, creamy finishes and fresh colour for celebrations that call for something lighter.",
        "description_kn": "ಹಗುರವಾದ ಆಚರಣೆಗಳಿಗೆ ಮೃದುವಾದ ಪದರಗಳು, ಕ್ರೀಮ್ ಮತ್ತು ತಾಜಾ ಬಣ್ಣ.",
        "image_url": "https://static.prod-images.emergentagent.com/jobs/97bc0cba-d75d-4760-9020-70de12137d5a/images/24e454598c599a4ca9f629ddf602d1d27f56236231ccbddb40cfe65094409e25.jpeg",
        "alt": "Ivory frosted celebration cake with berries and flowers",
        "is_featured": False,
        "sort_order": 2,
    },
    {
        "name": "Chocolate pastries",
        "name_kn": "ಚಾಕೊಲೇಟ್ ಪೇಸ್ಟ್ರಿಗಳು",
        "category": "Rich & familiar",
        "category_kn": "ಚಾಕೊಲೇಟ್ ಸಿಹಿತಿಂಡಿ",
        "description": "Deep cocoa, generous cream and a little drama for the first forkful.",
        "description_kn": "ಮೊದಲ ತುಂಡಿಗೇ ಗಾಢ ಕೋಕೋ, ಸಾಕಷ್ಟು ಕ್ರೀಮ್ ಮತ್ತು ಸಿಹಿಯಾದ ಅನುಭವ.",
        "image_url": "https://static.prod-images.emergentagent.com/jobs/97bc0cba-d75d-4760-9020-70de12137d5a/images/35788acdcfcb35d2d7dc3406fa8baf3fefe82024b89ac7c154c8e1f48df14e1b.jpeg",
        "alt": "Chocolate cake slice with cream layers and a cherry",
        "is_featured": False,
        "sort_order": 3,
    },
    {
        "name": "Chicken burger with French fries",
        "name_kn": "ಚಿಕನ್ ಬರ್ಗರ್ ಮತ್ತು ಫ್ರೆಂಚ್ ಫ್ರೈಸ್",
        "category": "Savory favourite",
        "category_kn": "ಖಾರದ ಮೆಚ್ಚಿನದು",
        "description": "A filling bakery-counter favourite for the savoury craving.",
        "description_kn": "ಖಾರವಾದ ಹಸಿವಿಗೆ ತುಂಬುವ ಬೇಕರಿ ಕೌಂಟರ್ ಮೆಚ್ಚಿನ ತಿಂಡಿ.",
        "image_url": "https://static.prod-images.emergentagent.com/jobs/97bc0cba-d75d-4760-9020-70de12137d5a/images/351ac4cb35b1252e3660c5f3a405631e9833834cf8f287732bdb920e5125afe8.jpeg",
        "alt": "Fresh bakery counter preparation",
        "is_featured": False,
        "sort_order": 4,
    },
    {
        "name": "Veg sandwiches",
        "name_kn": "ವೆಜ್ ಸ್ಯಾಂಡ್‌ವಿಚ್‌ಗಳು",
        "category": "Savory favourite",
        "category_kn": "ಖಾರದ ಮೆಚ್ಚಿನದು",
        "description": "An easy, familiar bite for takeaway, lunch or the walk home.",
        "description_kn": "ಟೇಕ್‌ಅವೇ, ಮಧ್ಯಾಹ್ನದ ಊಟ ಅಥವಾ ಮನೆಗೆ ಹೋಗುವ ದಾರಿಗೆ ಸುಲಭವಾದ ಪರಿಚಿತ ತಿಂಡಿ.",
        "image_url": "",
        "alt": "Veg sandwiches from Cake World Bakery",
        "is_featured": False,
        "sort_order": 5,
    },
    {
        "name": "Custom celebration cake",
        "name_kn": "ಕಸ್ಟಮ್ ಆಚರಣೆಯ ಕೇಕ್",
        "category": "Behind the counter",
        "category_kn": "ಕೌಂಟರ್ ಹಿಂದಿನ ಆಯ್ಕೆ",
        "description": "Share the date, size and mood. We will help you find the right cake for the room.",
        "description_kn": "ದಿನಾಂಕ, ಗಾತ್ರ ಮತ್ತು ನಿಮ್ಮ ಕಲ್ಪನೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ. ನಿಮಗೆ ಸರಿಯಾದ ಕೇಕ್ ಆಯ್ಕೆ ಮಾಡಲು ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.",
        "image_url": "https://static.prod-images.emergentagent.com/jobs/97bc0cba-d75d-4760-9020-70de12137d5a/images/351ac4cb35b1252e3660c5f3a405631e9833834cf8f287732bdb920e5125afe8.jpeg",
        "alt": "Baker piping cream onto a layered celebration cake",
        "is_featured": True,
        "sort_order": 6,
    },
]


async def seed_menu() -> None:
    if await db.menu_items.count_documents({}) > 0:
        return
    now = datetime.now(timezone.utc)
    documents = [MenuItemDocument(**item, created_at=now, updated_at=now).to_mongo() for item in SEED_ITEMS]
    await db.menu_items.insert_many(documents)


async def find_item(item_id: str) -> MenuItemDocument:
    try:
        object_id = ObjectId(item_id)
    except InvalidId:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid menu item id")
    document = await db.menu_items.find_one({"_id": object_id})
    if document is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Menu item not found")
    return MenuItemDocument.from_mongo(document)


@router.get("", response_model=list[MenuItemView])
async def get_visible_menu() -> list[MenuItemView]:
    documents = await db.menu_items.find({"is_visible": True}).sort([("sort_order", 1), ("created_at", 1)]).to_list(200)
    return [to_view(MenuItemDocument.from_mongo(document)) for document in documents]


@router.get("/admin", response_model=list[MenuItemView])
async def get_admin_menu(_: UserDocument = Depends(require_admin)) -> list[MenuItemView]:
    documents = await db.menu_items.find().sort([("sort_order", 1), ("created_at", 1)]).to_list(200)
    return [to_view(MenuItemDocument.from_mongo(document)) for document in documents]


@router.post("/admin", response_model=MenuItemView)
async def create_menu_item(payload: MenuItemPayload, _: UserDocument = Depends(require_admin)) -> MenuItemView:
    now = datetime.now(timezone.utc)
    item = MenuItemDocument(**payload.model_dump(), created_at=now, updated_at=now)
    await db.menu_items.insert_one(item.to_mongo())
    return to_view(item)


@router.patch("/admin/{item_id}", response_model=MenuItemView)
async def update_menu_item(item_id: str, payload: MenuItemPayload, _: UserDocument = Depends(require_admin)) -> MenuItemView:
    item = await find_item(item_id)
    update = payload.model_dump()
    update["updated_at"] = datetime.now(timezone.utc)
    await db.menu_items.update_one({"_id": ObjectId(item.id)}, {"$set": update})
    return to_view(await find_item(item.id))


@router.delete("/admin/{item_id}", response_model=MenuItemView)
async def hide_menu_item(item_id: str, _: UserDocument = Depends(require_admin)) -> MenuItemView:
    item = await find_item(item_id)
    await db.menu_items.update_one(
        {"_id": ObjectId(item.id)},
        {"$set": {"is_visible": False, "updated_at": datetime.now(timezone.utc)}},
    )
    return to_view(await find_item(item.id))
