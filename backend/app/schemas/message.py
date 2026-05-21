import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict


class MessageCreate(BaseModel):
    account_id: uuid.UUID
    message_id: str
    from_address: str
    to_addresses: str | None = None
    cc_addresses: str | None = None
    subject: str | None = None
    snippet: str | None = None
    body_text: str | None = None
    body_html: str | None = None
    received_at: datetime | None = None


class MessageUpdate(BaseModel):
    is_read: bool | None = None
    is_starred: bool | None = None
    is_archived: bool | None = None


class MessageRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    account_id: uuid.UUID
    thread_id: uuid.UUID | None
    message_id: str
    from_address: str
    to_addresses: str | None
    cc_addresses: str | None
    subject: str | None
    snippet: str | None
    received_at: datetime | None
    is_read: bool
    is_starred: bool
    is_archived: bool
    labels: dict | None
    created_at: datetime


class MessageList(BaseModel):
    items: list[MessageRead]
    total: int
