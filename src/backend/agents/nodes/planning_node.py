from src.backend.agents.state import AgentState


def _detect_intent(text: str) -> str:
    normalized = text.lower()
    if any(token in normalized for token in ("market", "customer", "business", "adoption", "go-to-market")):
        return "market_scale"
    if any(token in normalized for token in ("architecture", "api", "agent", "database", "deploy", "latency")):
        return "engineering"
    if any(token in normalized for token in ("vietnam", "việt nam", "hanoi", "hà nội", "local")):
        return "vietnam_impact"
    return "general"


async def analyze_node(state: AgentState) -> dict:
    """Extract a lightweight product-building frame from the user request."""
    query = state.get("query", "").strip()
    context = state.get("context", "").strip()

    if not query:
        return {"error": "Message is required."}

    intent = _detect_intent(f"{query}\n{context}")
    analysis = (
        f"Intent={intent}. Focus on turning the brief into a small, demoable product loop "
        "with a clear user, concrete workflow, and measurable next action."
    )
    return {"intent": intent, "analysis": analysis}


async def respond_node(state: AgentState) -> dict:
    """Create a deterministic first response that works without external API keys."""
    if state.get("error"):
        return {"response": f"Error: {state['error']}", "action_items": []}

    query = state.get("query", "").strip()
    intent = state.get("intent", "general")
    action_items = [
        "Define the first user and their urgent problem.",
        "Build one end-to-end workflow before adding more features.",
        "Collect demo evidence: API response, screenshot, or short video.",
    ]

    if intent == "market_scale":
        action_items.insert(1, "Name the first reachable customer segment and why they would adopt now.")
    elif intent == "engineering":
        action_items.insert(1, "Keep the agent boundary explicit: state, tools, API contract, and tests.")
    elif intent == "vietnam_impact":
        action_items.insert(1, "Ground the workflow in a Vietnam-specific behavior, constraint, or dataset.")

    response = (
        "I can help shape this into a working hackathon prototype. "
        f"Current brief: {query}. "
        f"Recommended focus: {intent.replace('_', ' ')}."
    )
    return {"response": response, "action_items": action_items}
