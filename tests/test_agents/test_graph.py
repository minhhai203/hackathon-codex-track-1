import pytest

from src.backend.agents.graph import agent


@pytest.mark.asyncio
async def test_agent_basic_flow():
    result = await agent.ainvoke({"query": "Build a product for Vietnam users"})
    assert "response" in result
    assert result["intent"] == "vietnam_impact"
    assert result["action_items"]


@pytest.mark.asyncio
async def test_agent_state_structure():
    result = await agent.ainvoke({"query": "Test query"})
    assert isinstance(result, dict)
    assert "query" in result
    assert "analysis" in result
