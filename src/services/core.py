from __future__ import annotations

from collections import Counter
from dataclasses import asdict

from src.models.schemas import (
    AssessmentRequest,
    AssessmentResponse,
    CoreCapabilitiesResponse,
    CoreRouteResponse,
    KnowledgeSearchResponse,
    LearningPathRequest,
    LearningPathResponse,
    ManagerSummaryRequest,
    ManagerSummaryResponse,
    ProgressSummaryRequest,
    ProgressSummaryResponse,
)
from src.services.demo_catalog import DEMO_TEAM, LearningModule, get_common_modules, get_modules, get_role_modules


def _normalize(text: str) -> str:
    return " ".join(text.lower().split())


def _score_keywords(text: str, keywords: tuple[str, ...]) -> int:
    normalized = _normalize(text)
    return sum(1 for keyword in keywords if keyword in normalized)


def _module_summary(module: LearningModule) -> dict:
    data = asdict(module)
    data["starter_kit"] = list(module.starter_kit)
    data["prerequisite_ids"] = list(module.prerequisite_ids)
    data["tags"] = list(module.tags)
    return data


def classify_request(text: str, context: str = "") -> str:
    normalized = f"{text}\n{context}".lower()
    if any(token in normalized for token in ("assessment", "level", "score", "onboarding")):
        return "assessment"
    if any(token in normalized for token in ("path", "module", "lộ trình", "roadmap", "tier")):
        return "learning_path"
    if any(token in normalized for token in ("progress", "completed", "hours saved", "tiến bộ")):
        return "progress"
    if any(token in normalized for token in ("manager", "team", "department", "leadership", "dashboard")):
        return "manager"
    if any(token in normalized for token in ("search", "knowledge", "docs", "source", "retrieve")):
        return "knowledge"
    return "general"


def recommend_next_route(text: str, context: str = "") -> CoreRouteResponse:
    route = classify_request(text, context)
    suggestions = {
        "assessment": ["POST /api/v1/core/assessment", "POST /api/v1/core/learning-path"],
        "learning_path": ["POST /api/v1/core/learning-path", "GET /api/v1/core/catalog"],
        "progress": ["POST /api/v1/core/progress", "GET /api/v1/core/catalog"],
        "manager": ["POST /api/v1/core/manager", "POST /api/v1/core/progress"],
        "knowledge": ["GET /api/v1/core/knowledge"],
        "general": ["POST /api/v1/chat", "GET /api/v1/core/capabilities"],
    }
    return CoreRouteResponse(route=route, suggested_endpoints=suggestions[route])


def get_capabilities() -> CoreCapabilitiesResponse:
    return CoreCapabilitiesResponse(
        features=[
            "Assessment scoring",
            "Learning path recommendation",
            "Knowledge search",
            "Progress summary",
            "Manager summary",
            "Chat planning assistant",
        ],
        data_sources=[
            "Static learning catalog",
            "Demo team snapshots",
            "Keyword knowledge base",
        ],
    )


def score_assessment(request: AssessmentRequest) -> AssessmentResponse:
    base = 20
    tool_score = min(request.ai_tool_experience, 5) * 8
    confidence_score = min(request.prompt_confidence, 5) * 6
    safety_score = min(request.safety_awareness, 5) * 6
    specificity_score = min(len(request.daily_tasks), 5) * 4 + min(len(request.goals), 5) * 3
    role_bonus = 8 if request.role_id != "khac" else 4
    total = min(base + tool_score + confidence_score + safety_score + specificity_score + role_bonus, 100)

    ai_level = 0
    thresholds = [25, 40, 55, 70, 85]
    for idx, threshold in enumerate(thresholds, start=1):
        if total >= threshold:
            ai_level = idx

    strengths = []
    if request.ai_tool_experience >= 3:
        strengths.append("Has hands-on AI tool exposure")
    if request.prompt_confidence >= 3:
        strengths.append("Can already phrase useful prompts")
    if request.safety_awareness >= 3:
        strengths.append("Understands data sensitivity")
    if not strengths:
        strengths.append("Has a clear baseline to start from")

    gaps = []
    if request.ai_tool_experience < 3:
        gaps.append("Needs practice turning work tasks into prompts")
    if request.prompt_confidence < 3:
        gaps.append("Needs stronger output framing")
    if request.safety_awareness < 3:
        gaps.append("Needs better data handling habits")
    if not gaps:
        gaps.append("Can move beyond basics into role-specific workflows")

    summary = (
        f"AI level {ai_level} for role {request.role_id}. "
        f"Focus the next step on {request.department or 'the learner role'} workflows, "
        "starting with safe prompting and one real task."
    )

    recommended_modules = _recommend_modules_for_assessment(request.role_id, ai_level, request.goals)

    return AssessmentResponse(
        score=total,
        ai_level=ai_level,
        role_id=request.role_id,
        summary=summary,
        strengths=strengths,
        gaps=gaps,
        recommended_modules=recommended_modules,
    )


def _recommend_modules_for_assessment(role_id: str, ai_level: int, goals: list[str]) -> list[dict]:
    request = LearningPathRequest(role_id=role_id, ai_level=ai_level, goals=goals)
    path = recommend_learning_path(request)
    role_specific = [module for module in path.modules if module["role_id"] == role_id]
    common = [module for module in path.modules if module["role_id"] == "common"]
    ordered = role_specific[:2] + common[:2]
    for module in path.modules:
        if module not in ordered:
            ordered.append(module)
        if len(ordered) >= 4:
            break
    return ordered[:4]


def recommend_learning_path(request: LearningPathRequest) -> LearningPathResponse:
    completed = set(request.completed_modules)
    common_modules = [module for module in get_common_modules() if module.module_id not in completed]
    role_modules = [module for module in get_role_modules(request.role_id) if module.module_id not in completed]

    goals_text = " ".join(request.goals).lower()
    goal_keywords = {
        "sales": ("sale", "customer", "deal", "proposal"),
        "kinh-doanh": ("sale", "customer", "deal", "proposal"),
        "marketing": ("marketing", "content", "campaign", "brand"),
        "ke-toan": ("account", "report", "finance", "invoice"),
        "van-hanh": ("ops", "workflow", "sop", "process"),
    }
    role_hits = _score_keywords(goals_text, goal_keywords.get(request.role_id, ()))

    ordered_modules = []
    reasons = []
    confidence = 55 + min(request.ai_level * 5, 20) + min(role_hits * 4, 12)

    for module in common_modules:
        if module.level <= max(1, request.ai_level or 1):
            ordered_modules.append(module)
            reasons.append(f"Common foundation: {module.outcome}")

    for module in role_modules:
        if module.level <= max(2, request.ai_level + 1):
            ordered_modules.append(module)
            if role_hits:
                reasons.append(f"Matches goal wording: {module.title}")
            else:
                reasons.append(f"Role-specific practice for {request.role_id}")

    if not ordered_modules:
        ordered_modules = list(common_modules[:2] or get_modules()[:2])
        reasons.append("Fallback to baseline foundation modules")

    selected = ordered_modules[:6]
    starter_kit = []
    for module in selected:
        starter_kit.extend(module.starter_kit[:1])

    warnings = []
    if request.ai_level < 2:
        warnings.append("Start with foundation modules before advanced ones.")
    if len(selected) >= 6:
        warnings.append("Keep the first sprint to a small, demoable subset.")

    return LearningPathResponse(
        role_id=request.role_id,
        ai_level=request.ai_level,
        modules=[_module_summary(module) for module in selected],
        reasons=reasons[: len(selected)],
        starter_kit=starter_kit[:6],
        confidence=min(confidence, 95),
        warnings=warnings,
    )


KNOWLEDGE_BASE = (
    "Use safe prompting, then ground answers in curriculum or company data.",
    "A learner should get a path that starts with foundation modules and then role-specific modules.",
    "A manager needs evidence, not just a summary paragraph.",
    "A strong RAG system must show retrieved context and admit missing evidence.",
    "Practice grading should store rubric version and confidence.",
)


def search_knowledge(query: str) -> KnowledgeSearchResponse:
    normalized = _normalize(query)
    matches = []
    for snippet in KNOWLEDGE_BASE:
        score = sum(1 for word in normalized.split() if word and word in snippet.lower())
        if score:
            matches.append({"snippet": snippet, "score": score})
    if not matches:
        matches = [{"snippet": KNOWLEDGE_BASE[0], "score": 0}]
    return KnowledgeSearchResponse(query=query, matches=matches[:3])


def summarize_progress(request: ProgressSummaryRequest) -> ProgressSummaryResponse:
    completed = set(request.completed_modules)
    all_modules = [module for module in get_modules() if module.role_id in ("common", request.role_id)]
    total = max(len(all_modules), 1)
    completion_percent = round((len(completed) / total) * 100)
    next_modules = [
        _module_summary(module)
        for module in all_modules
        if module.module_id not in completed
    ][:4]
    return ProgressSummaryResponse(
        role_id=request.role_id,
        employee_name=request.employee_name,
        completion_percent=completion_percent,
        completed_modules=list(completed),
        next_modules=next_modules,
        hours_saved=request.hours_saved,
        recent_activity=request.recent_activity[-5:],
    )


def summarize_manager(request: ManagerSummaryRequest) -> ManagerSummaryResponse:
    team = request.team or DEMO_TEAM
    department_counts = Counter(member.department for member in team)
    avg_completion = round(sum(member.quiz_pass_rate for member in team) / len(team), 1)
    hours_saved = round(sum(member.hours_saved for member in team), 1)
    at_risk = [
        member.name
        for member in team
        if member.quiz_pass_rate < request.risk_threshold or member.ai_level < 2
    ]
    top_department = department_counts.most_common(1)[0][0] if department_counts else request.organization_name

    return ManagerSummaryResponse(
        organization_name=request.organization_name,
        team_size=len(team),
        average_completion=avg_completion,
        total_hours_saved=hours_saved,
        top_department=top_department,
        at_risk_employees=at_risk,
        department_counts=dict(department_counts),
        last_team_activity=[member.last_activity for member in team[:5]],
    )
