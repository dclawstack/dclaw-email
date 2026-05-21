import pytest
from httpx import AsyncClient


async def _setup(client: AsyncClient, email: str = "thread@example.com") -> tuple[str, str]:
    acc = await client.post("/api/v1/accounts/", json={"provider": "imap", "email": email})
    account_id = acc.json()["id"]
    msg = await client.post("/api/v1/messages/", json={
        "account_id": account_id,
        "message_id": "t-001",
        "from_address": "sender@example.com",
        "subject": "Thread test",
    })
    return account_id, msg.json()["id"]


@pytest.mark.asyncio
async def test_list_threads_empty(client: AsyncClient):
    acc = await client.post("/api/v1/accounts/", json={"provider": "imap", "email": "th0@x.com"})
    resp = await client.get(f"/api/v1/threads/?account_id={acc.json()['id']}")
    assert resp.status_code == 200
    assert resp.json()["total"] == 0


@pytest.mark.asyncio
async def test_get_thread_not_found(client: AsyncClient):
    resp = await client.get("/api/v1/threads/00000000-0000-0000-0000-000000000000")
    assert resp.status_code == 404
