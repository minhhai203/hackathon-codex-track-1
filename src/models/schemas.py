from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=5000, description="User message or product brief")
    context: str | None = Field(default=None, max_length=10000, description="Optional extra context")


class ChatResponse(BaseModel):
    response: str = Field(..., description="Agent response")
    intent: str = Field(default="general", description="Detected request intent")
    action_items: list[str] = Field(default_factory=list, description="Suggested next steps")
    analysis: str = Field(default="", description="Concise internal analysis summary")
