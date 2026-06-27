import pytest


@pytest.mark.asyncio
async def test_health(client):
    response = await client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "Codex Hackathon Agent"


@pytest.mark.asyncio
async def test_chat_empty_message(client):
    response = await client.post("/api/v1/chat", json={"message": ""})
    assert response.status_code == 422  # Validation error


@pytest.mark.asyncio
async def test_agent_status(client):
    response = await client.get("/api/v1/status")
    assert response.status_code == 200
    assert response.json()["agent"] == "Codex Hackathon Agent v1.0"


@pytest.mark.asyncio
async def test_chat_detects_market_scale(client):
    response = await client.post(
        "/api/v1/chat",
        json={"message": "Help me find a first customer and market adoption path"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["intent"] == "market_scale"
    assert data["action_items"]
