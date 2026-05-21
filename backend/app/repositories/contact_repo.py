import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.contact import Contact
from app.repositories.base_repo import BaseRepository


class ContactRepository(BaseRepository[Contact]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, Contact)

    async def get_by_email(self, account_id: uuid.UUID, email: str) -> Contact | None:
        result = await self.db.execute(
            select(Contact).where(
                Contact.account_id == account_id, Contact.email == email
            )
        )
        return result.scalar_one_or_none()

    async def list_by_account(
        self, account_id: uuid.UUID, limit: int = 50, offset: int = 0
    ) -> list[Contact]:
        result = await self.db.execute(
            select(Contact)
            .where(Contact.account_id == account_id)
            .order_by(Contact.interaction_count.desc())
            .limit(limit)
            .offset(offset)
        )
        return list(result.scalars().all())
