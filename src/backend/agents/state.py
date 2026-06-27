from __future__ import annotations

from typing import TypedDict


class AgentState(TypedDict, total=False):
    """Shared state passed between LangGraph nodes."""

    query: str
    context: str
    intent: str
    analysis: str
    response: str
    action_items: list[str]
    error: str
    metadata: dict
