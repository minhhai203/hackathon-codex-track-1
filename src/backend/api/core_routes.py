from fastapi import APIRouter, Query

from src.backend.models.schemas import (
    AssessmentRequest,
    AssessmentResponse,
    CoreCapabilitiesResponse,
    CoreRouteRequest,
    CoreRouteResponse,
    KnowledgeSearchResponse,
    LearningPathRequest,
    LearningPathResponse,
    ManagerSummaryRequest,
    ManagerSummaryResponse,
    ProgressSummaryRequest,
    ProgressSummaryResponse,
)
from src.backend.services.core import (
    get_capabilities,
    recommend_learning_path,
    recommend_next_route,
    score_assessment,
    search_knowledge,
    summarize_manager,
    summarize_progress,
)

core_router = APIRouter(prefix="/core", tags=["core"])


@core_router.get("/capabilities", response_model=CoreCapabilitiesResponse)
async def capabilities() -> CoreCapabilitiesResponse:
    return get_capabilities()


@core_router.post("/route", response_model=CoreRouteResponse)
async def route(request: CoreRouteRequest) -> CoreRouteResponse:
    return recommend_next_route(request.message, request.context or "")


@core_router.post("/assessment", response_model=AssessmentResponse)
async def assessment(request: AssessmentRequest) -> AssessmentResponse:
    return score_assessment(request)


@core_router.post("/learning-path", response_model=LearningPathResponse)
async def learning_path(request: LearningPathRequest) -> LearningPathResponse:
    return recommend_learning_path(request)


@core_router.get("/knowledge", response_model=KnowledgeSearchResponse)
async def knowledge(query: str = Query(..., min_length=1, max_length=5000)) -> KnowledgeSearchResponse:
    return search_knowledge(query)


@core_router.post("/progress", response_model=ProgressSummaryResponse)
async def progress(request: ProgressSummaryRequest) -> ProgressSummaryResponse:
    return summarize_progress(request)


@core_router.post("/manager", response_model=ManagerSummaryResponse)
async def manager(request: ManagerSummaryRequest) -> ManagerSummaryResponse:
    return summarize_manager(request)
