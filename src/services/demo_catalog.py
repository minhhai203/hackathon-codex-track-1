from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class LearningModule:
    module_id: str
    title: str
    role_id: str
    tier: int
    level: int
    tags: tuple[str, ...]
    outcome: str
    starter_kit: tuple[str, ...]
    prerequisite_ids: tuple[str, ...] = ()


@dataclass(frozen=True)
class EmployeeSnapshot:
    name: str
    role_id: str
    department: str
    ai_level: int
    completed_modules: tuple[str, ...]
    quiz_pass_rate: int
    hours_saved: float
    last_activity: str


COMMON_MODULES: tuple[LearningModule, ...] = (
    LearningModule(
        module_id="foundation-ai-safety",
        title="AI Safety And Data Boundaries",
        role_id="common",
        tier=1,
        level=1,
        tags=("safety", "governance", "company-data"),
        outcome="Learner can identify what data should not be pasted into AI tools.",
        starter_kit=("Check data sensitivity before prompting.", "Redact private fields before using AI."),
    ),
    LearningModule(
        module_id="foundation-prompt-basics",
        title="Prompt Basics For Daily Work",
        role_id="common",
        tier=1,
        level=1,
        tags=("prompting", "workflow", "productivity"),
        outcome="Learner can turn a daily task into a clear AI prompt.",
        starter_kit=("Ask for output format first.", "Give role, context, and constraints."),
        prerequisite_ids=("foundation-ai-safety",),
    ),
    LearningModule(
        module_id="foundation-tool-selection",
        title="Choose The Right AI Tool",
        role_id="common",
        tier=2,
        level=2,
        tags=("tooling", "workflow", "decision"),
        outcome="Learner can decide when to use chat, search, summarization, or automation.",
        starter_kit=("Match the tool to the job.", "Prefer the simplest workflow first."),
        prerequisite_ids=("foundation-prompt-basics",),
    ),
    LearningModule(
        module_id="foundation-rag-basics",
        title="Search, Retrieve, And Ground Answers",
        role_id="common",
        tier=3,
        level=3,
        tags=("rag", "retrieval", "grounding"),
        outcome="Learner can understand why retrieval matters and how to verify an answer.",
        starter_kit=("Ask the source before trusting the answer.", "Use snippets, not memory only."),
        prerequisite_ids=("foundation-tool-selection",),
    ),
)

ROLE_MODULES: tuple[LearningModule, ...] = (
    LearningModule(
        module_id="sales-discovery-ai",
        title="AI For Sales Discovery",
        role_id="kinh-doanh",
        tier=2,
        level=2,
        tags=("sales", "customer", "discovery"),
        outcome="Learner can use AI to prepare discovery questions and account notes.",
        starter_kit=("Draft discovery questions.", "Summarize call notes into next steps."),
        prerequisite_ids=("foundation-prompt-basics",),
    ),
    LearningModule(
        module_id="sales-proposal-ai",
        title="AI For Proposals And Follow-ups",
        role_id="kinh-doanh",
        tier=3,
        level=3,
        tags=("sales", "proposal", "follow-up"),
        outcome="Learner can generate a polished proposal draft and follow-up plan.",
        starter_kit=("Turn call notes into a proposal outline.", "Ask for objection handling ideas."),
        prerequisite_ids=("sales-discovery-ai",),
    ),
    LearningModule(
        module_id="accounting-report-automation",
        title="Accounting Reporting Automation",
        role_id="ke-toan",
        tier=2,
        level=2,
        tags=("accounting", "reporting", "automation"),
        outcome="Learner can reduce manual reporting work with structured prompts.",
        starter_kit=("Ask for report templates.", "Summarize monthly variance explanations."),
        prerequisite_ids=("foundation-prompt-basics",),
    ),
    LearningModule(
        module_id="accounting-reconciliation-ai",
        title="AI For Reconciliation And Exceptions",
        role_id="ke-toan",
        tier=3,
        level=3,
        tags=("accounting", "reconciliation", "exceptions"),
        outcome="Learner can use AI to inspect mismatches and draft exception notes.",
        starter_kit=("Ask for exception grouping.", "Draft internal reconciliation notes."),
        prerequisite_ids=("accounting-report-automation",),
    ),
    LearningModule(
        module_id="marketing-content-planning",
        title="AI For Content Planning",
        role_id="marketing",
        tier=2,
        level=2,
        tags=("marketing", "content", "planning"),
        outcome="Learner can plan content themes and production briefs with AI.",
        starter_kit=("Turn campaign goals into weekly themes.", "Ask for content angles."),
        prerequisite_ids=("foundation-prompt-basics",),
    ),
    LearningModule(
        module_id="marketing-campaign-briefs",
        title="AI For Campaign Briefs",
        role_id="marketing",
        tier=3,
        level=3,
        tags=("marketing", "campaign", "brief"),
        outcome="Learner can draft campaign briefs and iterate them quickly.",
        starter_kit=("Draft a campaign brief.", "Ask for audience and CTA variants."),
        prerequisite_ids=("marketing-content-planning",),
    ),
    LearningModule(
        module_id="operations-workflow-automation",
        title="AI For Operations Workflow Automation",
        role_id="van-hanh",
        tier=2,
        level=2,
        tags=("operations", "workflow", "automation"),
        outcome="Learner can speed up recurring ops work with AI templates.",
        starter_kit=("List repetitive tasks.", "Draft a workflow SOP."),
        prerequisite_ids=("foundation-prompt-basics",),
    ),
    LearningModule(
        module_id="operations-policy-qa",
        title="AI For Policy And SOP QA",
        role_id="van-hanh",
        tier=3,
        level=3,
        tags=("operations", "policy", "sop"),
        outcome="Learner can inspect policy drafts and improve clarity.",
        starter_kit=("Check a SOP against common edge cases.", "Draft policy FAQs."),
        prerequisite_ids=("operations-workflow-automation",),
    ),
    LearningModule(
        module_id="general-productivity-notes",
        title="AI For Notes And Meetings",
        role_id="khac",
        tier=2,
        level=2,
        tags=("general", "notes", "meetings"),
        outcome="Learner can turn meetings into structured next actions.",
        starter_kit=("Summarize meeting notes.", "Extract action items and owners."),
        prerequisite_ids=("foundation-prompt-basics",),
    ),
    LearningModule(
        module_id="general-research-synthesis",
        title="AI For Research Synthesis",
        role_id="khac",
        tier=3,
        level=3,
        tags=("general", "research", "synthesis"),
        outcome="Learner can compare sources and synthesize a practical answer.",
        starter_kit=("Compare options side by side.", "Ask for a concise recommendation."),
        prerequisite_ids=("general-productivity-notes",),
    ),
)

DEMO_TEAM: tuple[EmployeeSnapshot, ...] = (
    EmployeeSnapshot(
        name="An",
        role_id="marketing",
        department="Marketing",
        ai_level=3,
        completed_modules=("foundation-ai-safety", "foundation-prompt-basics", "marketing-content-planning"),
        quiz_pass_rate=82,
        hours_saved=11.5,
        last_activity="Completed a campaign brief draft",
    ),
    EmployeeSnapshot(
        name="Binh",
        role_id="kinh-doanh",
        department="Sales",
        ai_level=2,
        completed_modules=("foundation-ai-safety", "foundation-prompt-basics", "sales-discovery-ai"),
        quiz_pass_rate=76,
        hours_saved=8.0,
        last_activity="Used AI to summarize discovery calls",
    ),
    EmployeeSnapshot(
        name="Chi",
        role_id="ke-toan",
        department="Finance",
        ai_level=2,
        completed_modules=("foundation-ai-safety", "foundation-prompt-basics", "accounting-report-automation"),
        quiz_pass_rate=88,
        hours_saved=14.0,
        last_activity="Automated monthly variance notes",
    ),
    EmployeeSnapshot(
        name="Dung",
        role_id="van-hanh",
        department="Operations",
        ai_level=1,
        completed_modules=("foundation-ai-safety", "foundation-prompt-basics"),
        quiz_pass_rate=64,
        hours_saved=4.5,
        last_activity="Drafted an SOP outline",
    ),
)


def get_modules() -> tuple[LearningModule, ...]:
    return COMMON_MODULES + ROLE_MODULES


def get_role_modules(role_id: str) -> tuple[LearningModule, ...]:
    return tuple(module for module in ROLE_MODULES if module.role_id == role_id)


def get_common_modules() -> tuple[LearningModule, ...]:
    return COMMON_MODULES

