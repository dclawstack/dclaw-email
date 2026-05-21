import pytest
from httpx import AsyncClient


async def _create_account(client: AsyncClient, email: str = "test@example.com") -> str:
    resp = await client.post("/api/v1/accounts/", json={"provider": "imap", "email": email})
    return resp.json()["id"]


@pytest.mark.asyncio
async def test_list_messages_empty(client: AsyncClient):
    account_id = await _create_account(client)
    resp = await client.get(f"/api/v1/messages/?account_id={account_id}")
    assert resp.status_code == 200
    assert resp.json()["total"] == 0


@pytest.mark.asyncio
async def test_create_and_read_message(client: AsyncClient):
    account_id = await _create_account(client, "msg@example.com")
    create = await client.post("/api/v1/messages/", json={
        "account_id": account_id,
        "message_id": "unique-msg-001",
        "from_address": "sender@example.com",
        "to_addresses": "msg@example.com",
        "subject": "Hello world",
        "snippet": "Hello there...",
    })
    assert create.status_code == 201
    data = create.json()
    assert data["subject"] == "Hello world"
    assert data["is_read"] is False

    get = await client.get(f"/api/v1/messages/{data['id']}")
    assert get.status_code == 200
    assert get.json()["message_id"] == "unique-msg-001"


@pytest.mark.asyncio
async def test_update_message_read_status(client: AsyncClient):
    account_id = await _create_account(client, "upd@example.com")
    create = await client.post("/api/v1/messages/", json={
        "account_id": account_id,
        "message_id": "upd-001",
        "from_address": "sender@example.com",
    })
    msg_id = create.json()["id"]
    patch = await client.patch(f"/api/v1/messages/{msg_id}", json={"is_read": True})
    assert patch.status_code == 200
    assert patch.json()["is_read"] is True


@pytest.mark.asyncio
async def test_delete_message(client: AsyncClient):
    account_id = await _create_account(client, "del@example.com")
    create = await client.post("/api/v1/messages/", json={
        "account_id": account_id,
        "message_id": "del-001",
        "from_address": "sender@example.com",
    })
    msg_id = create.json()["id"]
    resp = await client.delete(f"/api/v1/messages/{msg_id}")
    assert resp.status_code == 204
    assert (await client.get(f"/api/v1/messages/{msg_id}")).status_code == 404
