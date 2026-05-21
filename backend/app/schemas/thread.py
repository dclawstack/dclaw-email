import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict


class ThreadRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    account_id: uuid.UUID
    thread_id: str
    subject: str | None
    last_message_at: datetime | None
    message_count: int
    unread_count: int
    created_at: datetime


class ThreadList(BaseModel):
    items: list[ThreadRead]
    total: int
