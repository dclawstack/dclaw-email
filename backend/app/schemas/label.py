import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict


class LabelCreate(BaseModel):
    account_id: uuid.UUID
    name: str
    color: str | None = None
    is_system: bool = False


class LabelRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    account_id: uuid.UUID
    name: str
    color: str | None
    is_system: bool
    created_at: datetime


class LabelList(BaseModel):
    items: list[LabelRead]
    total: int
