import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr


class AccountCreate(BaseModel):
    provider: str
    email: EmailStr
    display_name: str | None = None


class AccountUpdate(BaseModel):
    display_name: str | None = None
    is_active: bool | None = None


class AccountRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    provider: str
    email: str
    display_name: str | None
    is_active: bool
    created_at: datetime
    updated_at: datetime
