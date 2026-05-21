import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.models.thread import Thread
from app.repositories.base_repo import BaseRepository


class ThreadRepository(BaseRepository[Thread]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, Thread)

    async def list_by_account(
        self, account_id: uuid.UUID, limit: int = 20, offset: int = 0
    ) -> tuple[list[Thread], int]:
        result = await self.db.execute(
            select(Thread)
            .where(Thread.account_id == account_id)
            .order_by(Thread.last_message_at.desc().nullslast())
            .limit(limit)
            .offset(offset)
        )
        items = list(result.scalars().all())
        count_result = await self.db.execute(
            select(func.count()).select_from(Thread).where(Thread.account_id == account_id)
        )
        total = count_result.scalar() or 0
        return items, total

    async def get_by_thread_id(self, account_id: uuid.UUID, thread_id: str) -> Thread | None:
        result = await self.db.execute(
            select(Thread).where(
                Thread.account_id == account_id, Thread.thread_id == thread_id
            )
        )
        return result.scalar_one_or_none()
