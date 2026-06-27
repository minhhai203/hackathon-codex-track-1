import pytest


@pytest.mark.asyncio
async def test_core_capabilities(client):
    response = await client.get("/api/v1/core/capabilities")
    assert response.status_code == 200
    assert "features" in response.json()


@pytest.mark.asyncio
async def test_core_assessment_endpoint(client):
    response = await client.post(
        "/api/v1/core/assessment",
        json={
            "role_id": "marketing",
            "department": "Marketing",
            "employee_name": "An",
            "current_work": "Planning campaign briefs and content calendars",
            "ai_tool_experience": 4,
            "prompt_confidence": 4,
            "safety_awareness": 3,
            "daily_tasks": ["Write briefs", "Summarize meetings"],
            "goals": ["faster content planning"],
            "preferred_address": "chi",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["ai_level"] >= 3
    assert data["recommended_modules"]


@pytest.mark.asyncio
async def test_core_learning_path_endpoint(client):
    response = await client.post(
        "/api/v1/core/learning-path",
        json={
            "role_id": "kinh-doanh",
            "ai_level": 2,
            "goals": ["find first customer", "write proposals"],
            "completed_modules": ["foundation-ai-safety"],
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["modules"]


@pytest.mark.asyncio
async def test_core_manager_summary_endpoint(client):
    response = await client.post(
        "/api/v1/core/manager",
        json={
            "organization_name": "Demo Org",
            "team": [],
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["team_size"] == 4


@pytest.mark.asyncio
async def test_core_knowledge_search_endpoint(client):
    response = await client.get("/api/v1/core/knowledge", params={"query": "RAG grounding"})
    assert response.status_code == 200
    data = response.json()
    assert data["matches"]
