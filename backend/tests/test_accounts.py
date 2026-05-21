import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_list_accounts_empty(client: AsyncClient):
    resp = await client.get("/api/v1/accounts/")
    assert resp.status_code == 200
    assert resp.json() == []


@pytest.mark.asyncio
async def test_create_account(client: AsyncClient):
    resp = await client.post("/api/v1/accounts/", json={
        "provider": "gmail",
        "email": "alice@example.com",
        "display_name": "Alice",
    })
    assert resp.status_code == 201
    data = resp.json()
    assert data["email"] == "alice@example.com"
    assert data["provider"] == "gmail"
    assert data["is_active"] is True


@pytest.mark.asyncio
async def test_create_duplicate_account_returns_409(client: AsyncClient):
    payload = {"provider": "gmail", "email": "bob@example.com"}
    await client.post("/api/v1/accounts/", json=payload)
    resp = await client.post("/api/v1/accounts/", json=payload)
    assert resp.status_code == 409


@pytest.mark.asyncio
async def test_get_account(client: AsyncClient):
    create = await client.post("/api/v1/accounts/", json={
        "provider": "imap", "email": "carol@example.com"
    })
    account_id = create.json()["id"]
    resp = await client.get(f"/api/v1/accounts/{account_id}")
    assert resp.status_code == 200
    assert resp.json()["id"] == account_id


@pytest.mark.asyncio
async def test_get_account_not_found(client: AsyncClient):
    resp = await client.get("/api/v1/accounts/00000000-0000-0000-0000-000000000000")
    assert resp.status_code == 404


@pytest.mark.asyncio
async def test_delete_account(client: AsyncClient):
    create = await client.post("/api/v1/accounts/", json={
        "provider": "outlook", "email": "dave@example.com"
    })
    account_id = create.json()["id"]
    resp = await client.delete(f"/api/v1/accounts/{account_id}")
    assert resp.status_code == 204
    get = await client.get(f"/api/v1/accounts/{account_id}")
    assert get.status_code == 404
