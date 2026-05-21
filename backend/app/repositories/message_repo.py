import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.models.message import Message
from app.repositories.base_repo import BaseRepository


class MessageRepository(BaseRepository[Message]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, Message)

    async def list_by_account(
        self, account_id: uuid.UUID, limit: int = 20, offset: int = 0,
        archived: bool = False
    ) -> tuple[list[Message], int]:
        q = (
            select(Message)
            .where(Message.account_id == account_id, Message.is_archived.is_(archived))
            .order_by(Message.received_at.desc().nullslast())
            .limit(limit)
            .offset(offset)
        )
        result = await self.db.execute(q)
        items = list(result.scalars().all())
        count_q = select(func.count()).select_from(Message).where(
            Message.account_id == account_id, Message.is_archived.is_(archived)
        )
        total = (await self.db.execute(count_q)).scalar() or 0
        return items, total

    async def list_by_thread(
        self, thread_id: uuid.UUID
    ) -> list[Message]:
        result = await self.db.execute(
            select(Message)
            .where(Message.thread_id == thread_id)
            .order_by(Message.received_at.asc().nullslast())
        )
        return list(result.scalars().all())

    async def get_by_message_id(
        self, account_id: uuid.UUID, message_id: str
    ) -> Message | None:
        result = await self.db.execute(
            select(Message).where(
                Message.account_id == account_id, Message.message_id == message_id
            )
        )
        return result.scalar_one_or_none()
