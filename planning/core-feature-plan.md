# Core Feature Delivery Plan

> Companion plan for `specs/core-feature-spec.md`.
> Goal: give agents and teammates a build order, ownership map, and handoff protocol.

## 1. Delivery Strategy

Build the product as vertical slices, but keep UI minimal until the feature frame is stable. Each slice should produce database shape, API/agent contract, tests, and a small verification artifact before any polished UI work.

Priority order:

1. Data foundation and tenant isolation
2. Learner profile and assessment
3. Learning path generation and assignment
4. Tutor RAG and memory
5. Practice grading
6. Manager analytics
7. RAGAS quality reports

## 2. Workstreams

| Workstream | Owns | Main paths |
|---|---|---|
| `WS-A Platform` | repo structure, env, CI, shared types, feature flags | `apps/web`, `apps/agent`, `packages`, `.github` |
| `WS-B Supabase` | schema, RLS, migrations, seed data | `supabase/migrations`, `supabase/scripts` |
| `WS-C Agent` | LangGraph flows, LangChain tools/retrievers, structured outputs | `apps/agent/src` |
| `WS-D Product API` | Next.js route handlers, server authorization, contracts | `apps/web/app/api`, `packages/shared` |
| `WS-E Evaluation` | RAGAS datasets, eval scripts, reports | `eval/datasets`, `eval/reports`, `eval/scripts` |
| `WS-F Docs/PM` | feature registry, acceptance criteria, handoff notes | `specs`, `planning`, `docs` |

## 3. Milestones

### M0 - Repo Restructure And Contracts

**Goal:** create the target monorepo frame without changing product behavior.

Tasks:

- Move current Python backend skeleton into `apps/agent`.
- Scaffold `apps/web` with Next.js App Router and TypeScript.
- Add `packages/shared` for shared feature IDs, API schemas, and role constants.
- Add `.env.example` sections for Next.js, Supabase, OpenAI, agent service, and eval.
- Keep `make check` or equivalent commands working.

Acceptance:

- `apps/web` and `apps/agent` can run independently.
- README matches actual commands.
- No feature code depends on UI mockups.

### M1 - F01 Identity And Organization Workspace

**Goal:** all future data can be safely tenant-scoped.

Tasks:

- Add Supabase migrations for organizations, members, invites, departments, job roles.
- Add RLS policies for organization isolation.
- Add seed data for one demo organization, one owner, one employee.
- Add API contracts for current organization, invite creation, invite acceptance, and member listing.
- Add server-side permission helper.

Acceptance:

- Owner can create organization.
- Invite acceptance creates membership.
- Cross-org reads fail in tests.
- Managers cannot mutate owner-only fields.

Parallelization:

- `WS-B` owns migrations/RLS.
- `WS-D` owns API contracts.
- `WS-F` updates feature notes and test checklist.

### M2 - F02 Assessment And Learner Profile

**Goal:** produce a reliable learner profile that agents can consume.

Tasks:

- Define assessment answer schema.
- Add `onboarding_assessment_results` and profile fields.
- Implement deterministic scorer for AI level and role signals.
- Add profile summary builder for agent context.
- Add tests for role-specific scoring, especially HR/general-role cases.

Acceptance:

- Assessment produces `ai_level`, `role_id`, goals, and explanation.
- Scorer is deterministic and tested.
- Profile summary is safe to inject into prompts.

Parallelization:

- `WS-B` handles persistence.
- `WS-D` handles submit/read API.
- `WS-C` prepares context adapter for agents.

### M3 - F03 Learning Catalog And Path Composition

**Goal:** assign a learner a versioned path built from modules and profile gaps.

Tasks:

- Add module, module version, learning path, path version, path module, assignment tables.
- Seed a small global catalog.
- Implement deterministic module filtering by role, level, prerequisites, required modules.
- Implement LangGraph recommender with validation node.
- Add output schema: `ordered_module_ids`, `reasons`, `confidence`, `warnings`.
- Add API to preview and confirm a path.

Acceptance:

- Path preview returns reasoned module list.
- Confirmed assignment is pinned to path version.
- Recommender never returns module IDs outside catalog.
- Tests cover fallback when LLM output is malformed.

Parallelization:

- `WS-B` owns catalog/path schema.
- `WS-C` owns recommender graph.
- `WS-D` owns preview/confirm API.
- `WS-E` starts path recommendation eval samples.

### M4 - F04 Tutor RAG And Memory

**Goal:** tutor can answer from assigned curriculum, learner profile, and memory.

Tasks:

- Add chat conversation, message, memory, usage, document, chunk, embedding tables.
- Implement retrieval pipeline for curriculum and organization documents.
- Implement LangGraph tutor flow: classify, retrieve, gate, generate, persist.
- Add skill-gap capture for no-lesson questions.
- Add rate limit and org AI budget ledger.
- Add streaming or non-streaming API contract; choose one and document it.

Acceptance:

- Tutor answer is grounded in retrieved context.
- Missing lesson creates a skill-gap candidate.
- Sensitive-data prompt triggers warning/refusal path.
- Chat history and memory survive reload.
- RAGAS dataset exists for basic tutor retrieval.

Parallelization:

- `WS-C` owns tutor graph and retrievers.
- `WS-B` owns chat/RAG schema.
- `WS-D` owns chat API and auth.
- `WS-E` owns tutor RAGAS dataset/report.

### M5 - F05 Practice Submission And AI Grading

**Goal:** grade practical employee work with a rubric and confidence.

Tasks:

- Add assignments, submissions, rubrics, grading results, manager reviews.
- Define rubric JSON schema and versioning.
- Implement LangGraph grader: load rubric, deterministic checks, LLM grade, validate, persist.
- Add low-confidence review queue.
- Add usage accounting for grading calls.

Acceptance:

- Grading result stores score, feedback, evidence, rubric version, and confidence.
- Low-confidence results are flagged.
- Invalid LLM structured output fails safely.
- Manager review can override or approve.

Parallelization:

- `WS-B` owns grading schema.
- `WS-C` owns grader graph.
- `WS-D` owns submission/review APIs.
- `WS-E` creates grading quality sample set.

### M6 - F06 Progress, Reflection, Aha Moment

**Goal:** measure applied learning, not only lesson completion.

Tasks:

- Add reflection and Aha Moment tables.
- Define event model for module completion, quiz pass, submission, reflection.
- Add privacy fields for reflection visibility.
- Add aggregation helpers for progress.
- Feed shared-only signals into manager analytics.

Acceptance:

- Private reflections are not visible to manager raw views.
- Shared Aha Moments can be used as analytics signals.
- Progress aggregation is deterministic and tested.

Parallelization:

- `WS-B` owns schema/RLS.
- `WS-D` owns event APIs.
- `WS-C` updates tutor and manager context adapters.

### M7 - F07 Manager Analytics And Team Operations

**Goal:** manager can inspect team state and ask evidence-backed questions.

Tasks:

- Implement aggregate queries by department, job role, assignment, AI level, completion, grading.
- Implement manager assistant LangGraph flow with authorization and evidence.
- Add APIs for assignments, progress summary, grading queue, skill gaps, and AI usage.
- Add export for skill gap backlog.

Acceptance:

- Manager assistant only sees authorized organization scope.
- Answers include evidence rows or aggregate references.
- Private reflections are excluded unless shared.
- Skill gaps can be exported for content planning.

Parallelization:

- `WS-D` owns management APIs.
- `WS-C` owns manager assistant graph.
- `WS-B` owns query/index tuning.
- `WS-E` owns manager evidence eval samples.

### M8 - F08 Evaluation And Governance

**Goal:** every AI/RAG capability has repeatable quality checks.

Tasks:

- Add RAGAS runner.
- Create datasets for tutor, path recommendation, grader feedback, manager analytics.
- Store reports under `eval/reports`.
- Add a non-default `eval:ragas` command.
- Define minimum quality gates for hackathon demo.

Acceptance:

- Fast tests do not call paid LLMs.
- RAGAS command is explicit and documented.
- Report includes metrics and sample failure notes.
- Demo readiness checklist references latest eval report.

Parallelization:

- `WS-E` owns all eval harness work.
- Other streams provide sample data and expected behavior.

## 4. Agent Assignment Board

Use this table when spawning or assigning agents:

| Agent | First task | Done when |
|---|---|---|
| Platform Agent | Create `apps/web`, `apps/agent`, `packages/shared` skeleton | commands and README match actual repo |
| Supabase Agent | Implement F01 schema/RLS/seed | cross-org tests pass |
| Assessment Agent | Implement F02 scoring/profile contracts | deterministic tests pass |
| Path Agent | Implement F03 recommender graph and API contract | invalid output fallback tested |
| Tutor Agent | Implement F04 RAG tutor graph | grounded answer eval passes sample set |
| Grader Agent | Implement F05 grading graph | rubric output validates and persists |
| Manager Agent | Implement F07 analytics assistant | tenant-scope evidence tests pass |
| Eval Agent | Implement F08 RAGAS harness | report generated from sample dataset |

## 5. Handoff Protocol

Each feature PR or agent handoff must include:

- Feature ID and workstream.
- Files changed.
- Supabase migrations added and whether they are reversible/idempotent.
- API contracts added or changed.
- Agent graph nodes/tools added.
- Tests run.
- Known gaps and next owner.

Suggested handoff note path:

```text
planning/handoffs/<date>-<feature-id>-<short-slug>.md
```

## 6. Risk Register

| Risk | Impact | Mitigation |
|---|---|---|
| Copying old `ai-tro-ly` UI too early | slows product redesign | keep first phase API/agent/data only |
| RLS mistakes | data leak across companies | write cross-org tests per migration |
| LLM doing deterministic work | cost and instability | deterministic first, LLM second |
| Agent output malformed | broken paths/grading | structured schema + validation node + fallback |
| RAG quality unknown | unreliable tutor | RAGAS datasets before demo |
| Feature sprawl | team loses focus | only F01-F08 are core; community/badges/feed behind flags |

## 7. First 48 Hours Checklist

- [ ] Move existing backend skeleton to `apps/agent`.
- [ ] Scaffold minimal `apps/web`.
- [ ] Add shared feature ID constants.
- [ ] Draft F01 migration and RLS tests.
- [ ] Draft F02 assessment schema and scorer tests.
- [ ] Create `eval/datasets/tutor-smoke.jsonl`.
- [ ] Open handoff notes for each active agent.
