# Codex Hackathon Agent

Starter repository for a working AI product prototype at the Codex Community Hackathon Hanoi.

The target stack for this project is a small monorepo built around `Next.js`, `Supabase`, `Vercel`, `LangGraph`, `LangChain`, and `RAGAS`. The goal is to keep the product easy to ship: a clear UI, a reliable data layer, a structured agent backend, and evaluation tooling that proves the retrieval quality instead of guessing.

## Hackathon Focus

- Track: Track 1 - Market Scale
- Goal: turn a product idea into a functional prototype with a clear first customer and adoption path
- Current scope: target folder structure, agent backend skeleton, API contract, tests, Docker, and documentation placeholders for demo evidence

## Project Structure

```text
.
├── src/
│   ├── frontend/         # Next.js app router frontend and Next API routes
│   │   ├── app/          # Routes, layouts, server components, route handlers
│   │   └── lib/          # Demo domain logic, Supabase client, utilities
│   └── backend/          # LangGraph + LangChain backend skeleton
│       ├── api/          # Optional HTTP routes for agent services
│       ├── agents/       # Graph, nodes, state, tools, prompts
│       ├── models/       # Pydantic schemas
│       └── services/     # LLM and external integrations
├── supabase/             # Migrations, seed data, edge functions
├── packages/             # Shared utilities/types if frontend and backend need them
├── docs/                 # Architecture notes and product docs
├── eval/                 # RAGAS datasets, reports, benchmark outputs
├── presentation/         # Demo and pitch assets
├── supabase/             # Core Postgres schema and RLS scaffolding
├── scripts/              # Local setup utilities
├── Dockerfile
├── docker-compose.yml
└── Makefile
```

## Tech Stack

| Layer | Technology | Why it fits |
|-------|------------|-------------|
| Frontend | `Next.js` | Fast product UI, server components, and easy deployment for demos |
| Deployment | `Vercel` | Native Next.js hosting, previews, and production deployment |
| Backend agent | `LangGraph` + `LangChain` | Clear orchestration, tools, retrieval, and stateful workflows |
| Database/Auth/Storage | `Supabase` | Managed Postgres, auth, storage, and simple local-to-prod path |
| Evaluation | `RAGAS` | Measures retrieval quality and keeps RAG work honest |
| Language | `TypeScript` / `Python` | TypeScript for the web app, Python for the agent and eval pipeline |
| API testing | `pytest` / `httpx` | Lightweight backend verification |
| Code quality | `ruff` | Fast linting and formatting for the Python side |
| Local dev | `Docker` / `docker compose` | Reproducible startup for the hackathon team |

## Codex Skills

Teammates can install the same Codex skill pack from `vudovn/ag-kit` with:

```bash
tmpdir=$(mktemp -d)
git clone --depth 1 https://github.com/vudovn/ag-kit "$tmpdir"
TMPDIR="$tmpdir" python3 - <<'PY'
import os
import subprocess
from pathlib import Path

repo = Path(os.environ["TMPDIR"])
paths = [str(p.parent.relative_to(repo)) for p in sorted(repo.glob(".agents/skills/**/SKILL.md"))]
subprocess.run(
    [
        "python3",
        f"{os.environ.get('CODEX_HOME', os.path.expanduser('~/.codex'))}/skills/.system/skill-installer/scripts/install-skill-from-github.py",
        "--repo",
        "vudovn/ag-kit",
        "--path",
        *paths,
    ],
    check=True,
)
PY
```

Restart Codex after the install so the new skills are loaded.

## Responsibility Split

- `src/frontend`: user-facing workflow, auth/session handling, and presentation layer
- `src/backend`: retrieval, tool use, routing logic, and agent responses
- `supabase`: source of truth for users, projects, uploads, and any structured product data
- `eval`: RAGAS datasets and reports to validate retrieval quality before demo day

## Feature Planning

- Core feature spec: `specs/core-feature-spec.md`
- Delivery plan: `planning/core-feature-plan.md`
- Source inspiration: `ai-tro-ly/.repomix/repomix-latest.xml`, adapted to this repo's Next.js + Supabase + Vercel + LangGraph + LangChain + RAGAS stack.

## Current Backend Service

The Python code under `src/backend` is the LangGraph/LangChain backend skeleton. The current frontend demo does not call it directly; product-facing demo logic runs through Next.js API route handlers in `src/frontend/app/api`.

## Current Frontend Prototype

`src/frontend` now contains a Next.js App Router prototype for the SME AI learning platform UI. It is based on the provided Teachable-style mockup and maps the core product spine from `specs/core-feature-spec.md` into demoable screens:

- onboarding assessment and learning-path recommendation
- learner course dashboard and lesson player
- AI tutor chat backed by the Next.js route handler `/api/v1/chat`
- progress summary backed by `/api/v1/core/progress`
- manager dashboard backed by `/api/v1/core/manager`

The frontend uses same-origin Next.js API routes first. Those route handlers currently use deterministic demo logic in `src/frontend/lib/demo-core.ts`; Supabase becomes the source of truth when the F01/F02 data slices are implemented.

## Quick Start

```bash
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
make run
```

Open the API docs at:

```text
http://localhost:8000/docs
```

Run the web UI in another terminal:

```bash
cd src/frontend
npm install
npm run dev
```

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` when wiring the UI to Supabase.

## Next.js API

The UI calls same-origin API routes served by Next.js:

```bash
curl -X POST http://localhost:3000/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Help me create a learning path for Marketing"}'

curl http://localhost:3000/api/v1/core/capabilities

curl -X POST http://localhost:3000/api/v1/core/assessment \
  -H "Content-Type: application/json" \
  -d '{"role_id":"marketing","department":"Marketing","employee_name":"An","current_work":"Planning campaign briefs","ai_tool_experience":4,"prompt_confidence":4,"safety_awareness":3,"daily_tasks":["Write briefs"],"goals":["faster content planning"],"preferred_address":"chi"}'

curl -X POST http://localhost:3000/api/v1/core/learning-path \
  -H "Content-Type: application/json" \
  -d '{"role_id":"kinh-doanh","ai_level":2,"goals":["find first customer"],"completed_modules":["foundation-ai-safety"]}'

curl -X POST http://localhost:3000/api/v1/core/progress \
  -H "Content-Type: application/json" \
  -d '{"employee_name":"Binh","role_id":"kinh-doanh","completed_modules":["foundation-ai-safety","foundation-prompt-basics"],"hours_saved":8,"recent_activity":["Completed notes"]}'

curl -X POST http://localhost:3000/api/v1/core/manager \
  -H "Content-Type: application/json" \
  -d '{"organization_name":"Demo Org","team":[]}'

curl "http://localhost:3000/api/v1/core/knowledge?query=RAG%20grounding"
```

## Optional Python Agent API

The Python agent skeleton can still run separately for future LangGraph work once its package path is settled:

```bash
make run
```

## Development

```bash
make lint
make web-lint
make web-build
make test
make check
```

## Docker

```bash
docker compose up --build
```

## Demo Checklist

- [ ] One clear target user and problem
- [ ] One end-to-end workflow through `/api/v1/chat`
- [ ] Screenshot or video evidence of the working prototype
- [ ] Architecture diagram updated in `docs/architecture_diagram.md`
- [ ] Evaluation notes updated in `eval/results/report.md`
- [ ] Pitch/demo notes added under `presentation/`
