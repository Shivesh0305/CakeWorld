from datetime import datetime, timezone

from pydantic import Field

from models.base import BaseDocument


class MenuItemDocument(BaseDocument):
    name: str
    name_kn: str = ""
    category: str
    category_kn: str = ""
    description: str
    description_kn: str = ""
    price_inr: int | None = Field(default=None, ge=0)
    image_url: str = ""
    alt: str = "Bakery menu item"
    is_visible: bool = True
    is_featured: bool = False
    sort_order: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
