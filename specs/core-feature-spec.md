# Core Feature Spec

> Source: `ai-tro-ly/.repomix/repomix-latest.xml`
> Target repo stack: Next.js, Supabase, Vercel, LangGraph, LangChain, RAGAS.
> Purpose: define the feature frame so multiple agents and teammates can build in parallel.

## 1. Product Frame

This project should become a company learning platform that helps employees learn practical AI skills for their job role, while managers can assign paths, measure progress, and understand team capability.

The repomix source has many finished and experimental surfaces. For this repo, keep only the core product spine:

1. User and organization workspace
2. Onboarding assessment and learner profile
3. Learning catalog and personalized path
4. AI tutor with retrieval and memory
5. Practice submission and grading
6. Progress, reflections, and Aha Moment
7. Manager analytics and team operations
8. RAGAS evaluation and feature governance

UI and exact flows will be redesigned later. This spec focuses on capability boundaries, data ownership, and implementation slices.

## 2. Target Architecture

```text
src/
├── frontend/                  # Next.js app, UI, route handlers, auth shell
└── backend/                   # LangGraph/LangChain service for tutor, recommender, grader

supabase/
├── migrations/                # Postgres schema, RLS, functions, seed data
└── scripts/                   # setup/seed/admin helpers

eval/
├── datasets/                  # RAGAS golden sets
├── reports/                   # evaluation outputs
└── scripts/                   # eval runners
```

### Runtime Boundaries

| Layer | Responsibility |
|---|---|
| Next.js | Auth shell, route handlers, user-facing API contract, thin orchestration, feature flags |
| Supabase | Auth, tenant-scoped Postgres, RLS, storage, audit tables, invite and membership state |
| Vercel | Next.js preview and production deployment |
| LangGraph | Stateful agent workflows: tutor, path recommender, grader, manager analytics assistant |
| LangChain | Model calls, tools, retrievers, prompt templates, structured output parsing |
| RAGAS | Offline quality checks for retrieval and answer faithfulness |

### Non-Goals For First Build

- Do not copy `ai-tro-ly` UI screens 1:1.
- Do not migrate old demo-mode/localStorage logic unless needed for hackathon demo.
- Do not implement community feed, comments, reactions, badges, billing, phone OTP, SCIM, or automatic HR decisions in the core phase.
- Do not create autonomous agents that modify records without explicit user/server confirmation.

## 3. Feature Modules

### F01 - Identity And Organization Workspace

**Outcome:** users can join or create an organization, and every core row is scoped to an organization.

**Core users:**

- `owner`: manages company settings, departments, roles, learning paths, assignments, reports.
- `manager`: manages assigned team scope, invites, assignments, and analytics.
- `employee`: learns, chats with tutor, submits practice, writes reflections.

**Data:**

- `organizations`
- `organization_members`
- `organization_invites`
- `departments`
- `job_roles`
- `profiles`

**APIs:**

- `POST /api/organizations`
- `GET /api/organizations/current`
- `POST /api/invites`
- `POST /api/invites/[token]/accept`
- `GET /api/members`
- `PATCH /api/members/[id]`

**Rules:**

- `organization_id` is required for company-owned records.
- Invite token authorizes joining; company page alone does not.
- RLS must prevent cross-organization reads.
- Server-side writes must validate role permission before touching Supabase.

**Acceptance:**

- Owner can create an organization and becomes `owner`.
- Invite token can add an employee to the right organization.
- A user in org A cannot read org B members or learning data.
- Manager cannot grant themselves owner rights.

### F02 - Onboarding Assessment And Learner Profile

**Outcome:** the app understands a learner's role, AI level, goals, daily tasks, and preferred form of address.

**Data:**

- `profiles.ai_level`
- `profiles.learning_profile`
- `onboarding_assessment_results`
- `learner_goal_tags`

**Assessment inputs:**

- job role
- department
- current AI tool usage
- prompt confidence
- workplace tasks
- safety/data awareness
- self-reported goals

**Agent usage:**

- Deterministic scoring should run first.
- LangGraph may enrich the profile only after structured fields exist.

**Acceptance:**

- Assessment produces an `ai_level` and readable reason summary.
- HR/general roles do not get forced into wrong role-specific scoring.
- Learning profile is available to tutor, recommender, and manager analytics.

### F03 - Learning Catalog And Path Composition

**Outcome:** managers and the system can compose a practical learning path from reusable modules.

**Data:**

- `learning_modules`
- `module_versions`
- `module_assets`
- `learning_paths`
- `learning_path_versions`
- `learning_path_modules`
- `learning_assignments`
- `user_learning_selection`
- `module_progress`

**Module ownership:**

- `global`: reusable across companies.
- `organization`: private company modules.

**Path composition:**

```text
company common foundation
+ job-role specialist track
+ assessment gap modules
+ manager-required modules
- mastered equivalent modules
```

**LangGraph recommender:**

- Inputs: learner profile, role, ai level, goals, completed modules, company required modules.
- Nodes: load context, rank modules, apply prerequisite rules, explain reasons, validate output.
- Output: ordered module IDs, reasons, confidence, skipped prerequisites, warnings.

**Acceptance:**

- System recommends a path with visible reasons.
- Employee can confirm a bounded module selection.
- Assignment is pinned to a path version.
- Published module edits create a new version instead of mutating old assignments.

### F04 - AI Tutor With RAG And Memory

**Outcome:** employee gets a tutor that answers inside the learning domain, uses curriculum/profile context, and remembers useful long-term context.

**Knowledge sources:**

1. Curriculum source: assigned path, module contents, starter prompts, progress.
2. Personal source: learner profile, assessment, goals, work context, pain points.
3. Conversation memory: summarized useful context from previous chats.

**Data:**

- `chat_conversations`
- `chat_messages`
- `chat_memories`
- `chat_usage`
- `documents`
- `document_chunks`
- `document_embeddings`

**LangGraph tutor flow:**

```text
receive message
-> classify intent and safety risk
-> retrieve curriculum/company/personal context
-> decide answer mode
-> generate response with citations/links
-> persist message and memory summary
-> emit usage event
```

**Skill gating:**

- If the learner already completed the relevant lesson: answer directly and link back.
- If the learner has not completed the relevant lesson: guide them to the lesson instead of giving the full answer.
- If no lesson exists: answer carefully, capture a skill gap, and mark as candidate content.

**Acceptance:**

- Tutor does not invent modules outside retrieved/assigned knowledge.
- Tutor refuses or warns on sensitive company data sharing.
- Chat history survives reload in real Supabase mode.
- Rate limit and organization AI budget are enforced.

### F05 - Practice Submission And AI Grading

**Outcome:** learners submit practical work and receive actionable feedback tied to rubrics.

**Data:**

- `practice_assignments`
- `practice_submissions`
- `grading_rubrics`
- `grading_results`
- `grading_reviews`

**LangGraph grader flow:**

```text
load assignment and rubric
-> normalize submission
-> score deterministic checks
-> grade with LLM against rubric
-> validate structured output
-> store score, feedback, confidence
-> queue manager review when confidence is low
```

**Acceptance:**

- Grader returns score, strengths, improvements, rubric evidence, and confidence.
- Rubric version is stored with each grading result.
- Low-confidence grading is reviewable by manager.
- Grading does not auto-change employee status without stored result.

### F06 - Progress, Reflection, And Aha Moment

**Outcome:** learner progress is measurable beyond "watched a lesson".

**Data:**

- `module_progress`
- `quiz_results`
- `time_logs`
- `reflections`
- `aha_moments`

**Core events:**

- module started
- module completed
- gate quiz passed
- practice submitted
- Aha Moment written
- work application logged

**Rules:**

- Reflections are private by default.
- Sharing must be explicit per reflection.
- Progress is deterministic and queryable by manager analytics.

**Acceptance:**

- Employee can complete modules and log real work application.
- Manager sees aggregate progress without private reflection contents unless shared.
- Aha Moment can be used as context for tutor and analytics.

### F07 - Manager Analytics And Team Operations

**Outcome:** managers understand team learning progress and can act.

**Data:**

- organization members
- assignments
- progress
- quiz results
- grading results
- time logs
- shared reflections/Aha Moments
- AI usage ledger

**LangGraph manager assistant flow:**

```text
receive manager question
-> authorize manager scope
-> query aggregate team data
-> compute deterministic summary
-> answer with evidence and suggested actions
```

**Operations:**

- invite employees
- assign/reassign paths
- view progress by department/job role
- inspect low-confidence grading queue
- export skill gaps
- review AI usage/budget

**Acceptance:**

- Manager cannot inspect another organization.
- Manager assistant answers from real tenant-scoped data.
- Analytics expose evidence, not vague AI claims.
- Private employee reflections are excluded unless explicitly shared.

### F08 - RAGAS Evaluation And Quality Governance

**Outcome:** retrieval and tutor quality are measurable before demo and before release.

**Data/artifacts:**

- `eval/datasets/*.jsonl`
- `eval/reports/*.md`
- `eval/reports/*.json`

**Metrics:**

- faithfulness
- answer relevancy
- context precision
- context recall

**Evaluation scope:**

- curriculum retrieval
- company document retrieval
- tutor answer grounding
- no-lesson/skill-gap handling
- manager analytics evidence quality

**Acceptance:**

- RAGAS can run outside the default fast test suite.
- Each core agent feature has at least one golden dataset.
- Reports include metric values, regression notes, and sample failures.

## 4. Feature Management Model

### Feature IDs

Use stable IDs in docs, branch names, issues, migrations, and tests:

| ID | Feature |
|---|---|
| `F01` | Identity and organization workspace |
| `F02` | Onboarding assessment and learner profile |
| `F03` | Learning catalog and path composition |
| `F04` | AI tutor with RAG and memory |
| `F05` | Practice submission and AI grading |
| `F06` | Progress, reflection, and Aha Moment |
| `F07` | Manager analytics and team operations |
| `F08` | RAGAS evaluation and quality governance |

### Feature Folder Ownership

```text
src/frontend/features/<feature-slug>/
src/backend/<feature-slug>/
supabase/migrations/<timestamp>_<feature_slug>.sql
eval/datasets/<feature-slug>/
eval/reports/<feature-slug>/
specs/<feature-id>-<feature-slug>.md
```

### Feature Flags

Start with server-side environment flags or a Supabase `feature_flags` table:

| Flag | Default | Purpose |
|---|---:|---|
| `ENABLE_ORG_SELF_SERVE` | on | organization creation |
| `ENABLE_TUTOR_RAG` | on | retrieval-backed tutor |
| `ENABLE_PATH_RECOMMENDER_AGENT` | on | LangGraph path recommendation |
| `ENABLE_AI_GRADER` | off | LLM grading until rubric and budget are ready |
| `ENABLE_MANAGER_ASSISTANT` | off | manager analytics assistant |
| `ENABLE_COMMUNITY_FEED` | off | optional social/community layer |

### Definition Of Ready

- Feature has a spec entry with owner and dependencies.
- Supabase schema/RLS impact is known.
- API contract is named.
- Agent boundary is named if the feature uses LangGraph.
- Acceptance criteria are testable without UI design.

### Definition Of Done

- Migration is idempotent and RLS-reviewed.
- API route or agent service has tests.
- Feature has seed/demo data if needed.
- RAG feature has at least one eval dataset.
- README or feature spec is updated.

## 5. Cross-Cutting Rules

- Deterministic first, LLM second.
- One request should invoke one AI capability, not a hidden multi-agent loop.
- Every company-owned row must include `organization_id`.
- Every AI output that drives learning or grading must include visible reasons.
- Private reflections stay private unless shared explicitly.
- RAG answers must cite retrieved context or admit missing context.
- Feature work must update its spec/notes before handoff.
