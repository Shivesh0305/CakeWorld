from typing import Annotated, Any, Mapping, TypeVar

from bson import ObjectId
from pydantic import BaseModel, BeforeValidator, ConfigDict, Field


def object_id_to_str(value: Any) -> Any:
    return str(value) if isinstance(value, ObjectId) else value


PyObjectId = Annotated[str, BeforeValidator(object_id_to_str)]
T = TypeVar("T", bound="BaseDocument")


class BaseDocument(BaseModel):
    id: PyObjectId = Field(default_factory=lambda: str(ObjectId()), alias="_id")

    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        extra="ignore",
        populate_by_name=True,
    )

    def to_mongo(self) -> dict[str, Any]:
        data = self.model_dump(by_alias=True, exclude_none=True)
        data["_id"] = ObjectId(self.id)
        return data

    @classmethod
    def from_mongo(cls: type[T], document: Mapping[str, Any]) -> T:
        return cls.model_validate(document)
