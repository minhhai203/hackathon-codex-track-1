from fastapi import APIRouter, HTTPException

from src.agents.graph import agent
from src.api.core_routes import core_router
from src.models.schemas import ChatRequest, ChatResponse

router = APIRouter()
router.include_router(core_router)


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    """Run the hackathon planning agent."""
    try:
        result = await agent.ainvoke({"query": request.message, "context": request.context or ""})
        return ChatResponse(
            response=result.get("response", ""),
            intent=result.get("intent", "general"),
            action_items=result.get("action_items", []),
            analysis=result.get("analysis", ""),
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/status")
async def agent_status():
    """Return agent runtime status."""
    return {"status": "ready", "agent": "Codex Hackathon Agent v1.0"}
