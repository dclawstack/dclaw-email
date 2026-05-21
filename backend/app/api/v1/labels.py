import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.label import Label
from app.repositories.label_repo import LabelRepository
from app.schemas.label import LabelCreate, LabelRead, LabelList

router = APIRouter()


@router.get("/", response_model=LabelList)
async def list_labels(
    account_id: uuid.UUID, db: AsyncSession = Depends(get_db)
) -> LabelList:
    repo = LabelRepository(db)
    items = await repo.list_by_account(account_id)
    return LabelList(items=items, total=len(items))


@router.post("/", response_model=LabelRead, status_code=status.HTTP_201_CREATED)
async def create_label(
    body: LabelCreate, db: AsyncSession = Depends(get_db)
) -> LabelRead:
    repo = LabelRepository(db)
    label = Label(
        account_id=body.account_id,
        name=body.name,
        color=body.color,
        is_system=body.is_system,
    )
    return await repo.create(label)


@router.get("/{label_id}", response_model=LabelRead)
async def get_label(
    label_id: uuid.UUID, db: AsyncSession = Depends(get_db)
) -> LabelRead:
    repo = LabelRepository(db)
    label = await repo.get_by_id(label_id)
    if not label:
        raise HTTPException(status_code=404, detail="Label not found")
    return label


@router.delete("/{label_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_label(
    label_id: uuid.UUID, db: AsyncSession = Depends(get_db)
) -> None:
    repo = LabelRepository(db)
    label = await repo.get_by_id(label_id)
    if not label:
        raise HTTPException(status_code=404, detail="Label not found")
    await repo.delete(label)
