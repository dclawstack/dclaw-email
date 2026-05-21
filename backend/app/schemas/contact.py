import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict


class ContactCreate(BaseModel):
    account_id: uuid.UUID
    email: str
    display_name: str | None = None


class ContactRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    account_id: uuid.UUID
    email: str
    display_name: str | None
    last_interaction_at: datetime | None
    interaction_count: int
    created_at: datetime


class ContactList(BaseModel):
    items: list[ContactRead]
    total: int
