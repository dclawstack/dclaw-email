import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.account import Account
from app.repositories.account_repo import AccountRepository
from app.schemas.account import AccountCreate, AccountRead, AccountUpdate

router = APIRouter()


@router.get("/", response_model=list[AccountRead])
async def list_accounts(db: AsyncSession = Depends(get_db)) -> list[AccountRead]:
    repo = AccountRepository(db)
    accounts, _ = await repo.list_all()
    return accounts


@router.post("/", response_model=AccountRead, status_code=status.HTTP_201_CREATED)
async def create_account(
    body: AccountCreate, db: AsyncSession = Depends(get_db)
) -> AccountRead:
    repo = AccountRepository(db)
    existing = await repo.get_by_email(body.email)
    if existing:
        raise HTTPException(status_code=409, detail="Account already connected")
    account = Account(
        provider=body.provider,
        email=body.email,
        display_name=body.display_name,
    )
    return await repo.create(account)


@router.get("/{account_id}", response_model=AccountRead)
async def get_account(
    account_id: uuid.UUID, db: AsyncSession = Depends(get_db)
) -> AccountRead:
    repo = AccountRepository(db)
    account = await repo.get_by_id(account_id)
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    return account


@router.patch("/{account_id}", response_model=AccountRead)
async def update_account(
    account_id: uuid.UUID, body: AccountUpdate, db: AsyncSession = Depends(get_db)
) -> AccountRead:
    repo = AccountRepository(db)
    account = await repo.get_by_id(account_id)
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    for field, value in body.model_dump(exclude_unset=True).items():
        setattr(account, field, value)
    await db.commit()
    await db.refresh(account)
    return account


@router.delete("/{account_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_account(
    account_id: uuid.UUID, db: AsyncSession = Depends(get_db)
) -> None:
    repo = AccountRepository(db)
    account = await repo.get_by_id(account_id)
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    await repo.delete(account)
