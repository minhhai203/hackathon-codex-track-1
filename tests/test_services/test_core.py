from src.backend.models.schemas import (
    AssessmentRequest,
    LearningPathRequest,
    ManagerSummaryRequest,
    ProgressSummaryRequest,
)
from src.backend.services.core import (
    recommend_learning_path,
    score_assessment,
    summarize_manager,
    summarize_progress,
)


def test_score_assessment_returns_ai_level():
    result = score_assessment(
        AssessmentRequest(
            role_id="marketing",
            department="Marketing",
            employee_name="An",
            current_work="Planning campaign briefs and content calendars",
            ai_tool_experience=4,
            prompt_confidence=4,
            safety_awareness=3,
            daily_tasks=["Write briefs", "Summarize meetings"],
            goals=["faster content planning"],
        )
    )

    assert result.ai_level >= 3
    assert result.recommended_modules
    assert any(module["module_id"].startswith("marketing") for module in result.recommended_modules)


def test_recommend_learning_path_contains_foundation():
    result = recommend_learning_path(
        LearningPathRequest(
            role_id="kinh-doanh",
            ai_level=2,
            goals=["find first customer", "write proposals"],
            completed_modules=["foundation-ai-safety"],
        )
    )

    module_ids = [module["module_id"] for module in result.modules]
    assert "foundation-prompt-basics" in module_ids
    assert any(module_id.startswith("sales-") for module_id in module_ids)


def test_progress_summary_calculates_completion():
    result = summarize_progress(
        ProgressSummaryRequest(
            employee_name="Binh",
            role_id="kinh-doanh",
            completed_modules=["foundation-ai-safety", "foundation-prompt-basics"],
            hours_saved=8,
            recent_activity=["Completed notes", "Shared prompt"],
        )
    )

    assert result.completion_percent > 0
    assert result.next_modules
    assert result.hours_saved == 8


def test_manager_summary_uses_team_snapshot():
    result = summarize_manager(
        ManagerSummaryRequest(
            organization_name="Demo Org",
            team=[],
        )
    )

    assert result.team_size == 4
    assert result.at_risk_employees
    assert result.department_counts
