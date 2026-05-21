import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.repositories.thread_repo import ThreadRepository
from app.repositories.message_repo import MessageRepository
from app.schemas.thread import ThreadRead, ThreadList
from app.schemas.message import MessageRead

router = APIRouter()


@router.get("/", response_model=ThreadList)
async def list_threads(
    account_id: uuid.UUID,
    limit: int = Query(default=20, le=100),
    offset: int = 0,
    db: AsyncSession = Depends(get_db),
) -> ThreadList:
    repo = ThreadRepository(db)
    items, total = await repo.list_by_account(account_id, limit, offset)
    return ThreadList(items=items, total=total)


@router.get("/{thread_id}", response_model=ThreadRead)
async def get_thread(
    thread_id: uuid.UUID, db: AsyncSession = Depends(get_db)
) -> ThreadRead:
    repo = ThreadRepository(db)
    thread = await repo.get_by_id(thread_id)
    if not thread:
        raise HTTPException(status_code=404, detail="Thread not found")
    return thread


@router.get("/{thread_id}/messages", response_model=list[MessageRead])
async def get_thread_messages(
    thread_id: uuid.UUID, db: AsyncSession = Depends(get_db)
) -> list[MessageRead]:
    thread_repo = ThreadRepository(db)
    thread = await thread_repo.get_by_id(thread_id)
    if not thread:
        raise HTTPException(status_code=404, detail="Thread not found")
    msg_repo = MessageRepository(db)
    return await msg_repo.list_by_thread(thread_id)
