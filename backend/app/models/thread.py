import uuid
from datetime import datetime
from typing import TYPE_CHECKING
from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base
from app.core.utils import utc_now

if TYPE_CHECKING:
    from app.models.account import Account
    from app.models.message import Message


class Thread(Base):
    __tablename__ = "threads"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    account_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("accounts.id", ondelete="CASCADE"), index=True
    )
    thread_id: Mapped[str] = mapped_column(String(255), index=True)
    subject: Mapped[str | None] = mapped_column(String(998))
    last_message_at: Mapped[datetime | None] = mapped_column()
    message_count: Mapped[int] = mapped_column(Integer, default=0)
    unread_count: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(default=utc_now)

    account: Mapped["Account"] = relationship(back_populates="threads", lazy="selectin")
    messages: Mapped[list["Message"]] = relationship(
        back_populates="thread", lazy="selectin", cascade="all, delete-orphan"
    )
