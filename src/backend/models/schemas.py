from typing import Literal

from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=5000, description="User message or product brief")
    context: str | None = Field(default=None, max_length=10000, description="Optional extra context")


class ChatResponse(BaseModel):
    response: str = Field(..., description="Agent response")
    intent: str = Field(default="general", description="Detected request intent")
    action_items: list[str] = Field(default_factory=list, description="Suggested next steps")
    analysis: str = Field(default="", description="Concise internal analysis summary")


class CoreRouteRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=5000)
    context: str | None = Field(default=None, max_length=10000)


class CoreRouteResponse(BaseModel):
    route: str
    suggested_endpoints: list[str]


class CoreCapabilitiesResponse(BaseModel):
    features: list[str]
    data_sources: list[str]


class AssessmentRequest(BaseModel):
    role_id: str = Field(..., min_length=1, max_length=50)
    department: str | None = Field(default=None, max_length=100)
    employee_name: str = Field(..., min_length=1, max_length=100)
    current_work: str = Field(..., min_length=1, max_length=5000)
    ai_tool_experience: int = Field(default=0, ge=0, le=5)
    prompt_confidence: int = Field(default=0, ge=0, le=5)
    safety_awareness: int = Field(default=0, ge=0, le=5)
    daily_tasks: list[str] = Field(default_factory=list)
    goals: list[str] = Field(default_factory=list)
    preferred_address: Literal["anh", "chi", "neutral"] = "neutral"


class AssessmentResponse(BaseModel):
    score: int
    ai_level: int
    role_id: str
    summary: str
    strengths: list[str]
    gaps: list[str]
    recommended_modules: list[dict]


class LearningPathRequest(BaseModel):
    role_id: str = Field(..., min_length=1, max_length=50)
    ai_level: int = Field(default=0, ge=0, le=5)
    goals: list[str] = Field(default_factory=list)
    completed_modules: list[str] = Field(default_factory=list)


class LearningPathResponse(BaseModel):
    role_id: str
    ai_level: int
    modules: list[dict]
    reasons: list[str]
    starter_kit: list[str]
    confidence: int
    warnings: list[str]


class ProgressSummaryRequest(BaseModel):
    employee_name: str = Field(..., min_length=1, max_length=100)
    role_id: str = Field(..., min_length=1, max_length=50)
    completed_modules: list[str] = Field(default_factory=list)
    hours_saved: float = Field(default=0, ge=0)
    recent_activity: list[str] = Field(default_factory=list)


class ProgressSummaryResponse(BaseModel):
    employee_name: str
    role_id: str
    completion_percent: int
    completed_modules: list[str]
    next_modules: list[dict]
    hours_saved: float
    recent_activity: list[str]


class TeamMemberSnapshot(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    role_id: str = Field(..., min_length=1, max_length=50)
    department: str = Field(..., min_length=1, max_length=100)
    ai_level: int = Field(..., ge=0, le=5)
    completed_modules: list[str] = Field(default_factory=list)
    quiz_pass_rate: int = Field(..., ge=0, le=100)
    hours_saved: float = Field(default=0, ge=0)
    last_activity: str = Field(..., min_length=1, max_length=500)


class ManagerSummaryRequest(BaseModel):
    organization_name: str = Field(..., min_length=1, max_length=100)
    risk_threshold: int = Field(default=70, ge=0, le=100)
    team: list[TeamMemberSnapshot] = Field(default_factory=list)


class ManagerSummaryResponse(BaseModel):
    organization_name: str
    team_size: int
    average_completion: float
    total_hours_saved: float
    top_department: str
    at_risk_employees: list[str]
    department_counts: dict[str, int]
    last_team_activity: list[str]


class KnowledgeMatch(BaseModel):
    snippet: str
    score: int


class KnowledgeSearchResponse(BaseModel):
    query: str
    matches: list[KnowledgeMatch]
