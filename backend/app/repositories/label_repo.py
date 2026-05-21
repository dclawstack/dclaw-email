import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.label import Label
from app.repositories.base_repo import BaseRepository


class LabelRepository(BaseRepository[Label]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, Label)

    async def list_by_account(self, account_id: uuid.UUID) -> list[Label]:
        result = await self.db.execute(
            select(Label).where(Label.account_id == account_id).order_by(Label.name)
        )
        return list(result.scalars().all())
