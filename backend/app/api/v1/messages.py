import uuid
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.message import Message
from app.repositories.message_repo import MessageRepository
from app.schemas.message import MessageCreate, MessageRead, MessageList, MessageUpdate

router = APIRouter()


@router.get("/", response_model=MessageList)
async def list_messages(
    account_id: uuid.UUID,
    archived: bool = False,
    limit: int = Query(default=20, le=100),
    offset: int = 0,
    db: AsyncSession = Depends(get_db),
) -> MessageList:
    repo = MessageRepository(db)
    items, total = await repo.list_by_account(account_id, limit, offset, archived)
    return MessageList(items=items, total=total)


@router.post("/", response_model=MessageRead, status_code=status.HTTP_201_CREATED)
async def create_message(
    body: MessageCreate, db: AsyncSession = Depends(get_db)
) -> MessageRead:
    repo = MessageRepository(db)
    message = Message(
        account_id=body.account_id,
        message_id=body.message_id,
        from_address=body.from_address,
        to_addresses=body.to_addresses,
        cc_addresses=body.cc_addresses,
        subject=body.subject,
        snippet=body.snippet,
        body_text=body.body_text,
        body_html=body.body_html,
        received_at=body.received_at,
    )
    return await repo.create(message)


@router.get("/{message_id}", response_model=MessageRead)
async def get_message(
    message_id: uuid.UUID, db: AsyncSession = Depends(get_db)
) -> MessageRead:
    repo = MessageRepository(db)
    message = await repo.get_by_id(message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    return message


@router.patch("/{message_id}", response_model=MessageRead)
async def update_message(
    message_id: uuid.UUID, body: MessageUpdate, db: AsyncSession = Depends(get_db)
) -> MessageRead:
    repo = MessageRepository(db)
    message = await repo.get_by_id(message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    for field, value in body.model_dump(exclude_unset=True).items():
        setattr(message, field, value)
    await db.commit()
    await db.refresh(message)
    return message


@router.delete("/{message_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_message(
    message_id: uuid.UUID, db: AsyncSession = Depends(get_db)
) -> None:
    repo = MessageRepository(db)
    message = await repo.get_by_id(message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    await repo.delete(message)
