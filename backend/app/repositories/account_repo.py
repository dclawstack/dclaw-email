from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.account import Account
from app.repositories.base_repo import BaseRepository


class AccountRepository(BaseRepository[Account]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, Account)

    async def get_by_email(self, email: str) -> Account | None:
        result = await self.db.execute(select(Account).where(Account.email == email))
        return result.scalar_one_or_none()

    async def list_active(self) -> list[Account]:
        result = await self.db.execute(select(Account).where(Account.is_active.is_(True)))
        return list(result.scalars().all())
