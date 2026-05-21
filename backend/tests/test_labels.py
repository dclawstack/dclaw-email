import pytest
from httpx import AsyncClient


async def _create_account(client: AsyncClient, email: str = "label@example.com") -> str:
    resp = await client.post("/api/v1/accounts/", json={"provider": "gmail", "email": email})
    return resp.json()["id"]


@pytest.mark.asyncio
async def test_list_labels_empty(client: AsyncClient):
    account_id = await _create_account(client)
    resp = await client.get(f"/api/v1/labels/?account_id={account_id}")
    assert resp.status_code == 200
    assert resp.json()["total"] == 0


@pytest.mark.asyncio
async def test_create_and_list_labels(client: AsyncClient):
    account_id = await _create_account(client, "lb2@example.com")
    create = await client.post("/api/v1/labels/", json={
        "account_id": account_id,
        "name": "Finance",
        "color": "#7660A8",
    })
    assert create.status_code == 201
    assert create.json()["name"] == "Finance"

    list_resp = await client.get(f"/api/v1/labels/?account_id={account_id}")
    assert list_resp.json()["total"] == 1


@pytest.mark.asyncio
async def test_delete_label(client: AsyncClient):
    account_id = await _create_account(client, "lb3@example.com")
    create = await client.post("/api/v1/labels/", json={
        "account_id": account_id, "name": "ToDelete"
    })
    label_id = create.json()["id"]
    resp = await client.delete(f"/api/v1/labels/{label_id}")
    assert resp.status_code == 204
