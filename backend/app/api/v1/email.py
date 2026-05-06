import uuid
from datetime import datetime, timezone

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class CreateEmailRequest(BaseModel):
    recipient: str
    subject: str
    body: str


class EmailDraftResponse(BaseModel):
    id: str
    recipient: str
    subject: str
    body: str
    suggested_reply: str
    tone: str
    created_at: str


@router.post("/emails")
async def create_email(req: CreateEmailRequest):
    return EmailDraftResponse(
        id=str(uuid.uuid4()),
        recipient=req.recipient,
        subject=req.subject,
        body=req.body,
        suggested_reply="Thank you for your email...",
        tone="professional",
        created_at=datetime.now(timezone.utc).isoformat(),
    )


@router.get("/emails/{id}/suggestions")
async def get_email_suggestions(id: str):
    return [
        "Re: Follow-up on our discussion",
        "Quick question regarding the proposal",
        "Checking in — next steps",
    ]
