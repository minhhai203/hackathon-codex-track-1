# Codex Hackathon Agent

Starter repository for a working AI product prototype at the Codex Community Hackathon Hanoi.

The target stack for this project is a small monorepo built around `Next.js`, `Supabase`, `LangGraph`, `LangChain`, and `RAGAS`. The goal is to keep the product easy to ship: a clear UI, a reliable data layer, a structured agent backend, and evaluation tooling that proves the retrieval quality instead of guessing.

## Hackathon Focus

- Track: Track 1 - Market Scale
- Goal: turn a product idea into a functional prototype with a clear first customer and adoption path
- Current scope: target folder structure, agent backend skeleton, API contract, tests, Docker, and documentation placeholders for demo evidence

## Project Structure

```text
.
├── apps/
│   ├── web/              # Next.js app router frontend
│   │   ├── app/          # Routes, layouts, server components
│   │   ├── components/   # Shared UI components
│   │   ├── features/     # Product-specific UI slices
│   │   ├── lib/          # Client helpers, Supabase client, utils
│   │   └── styles/       # Global styling and theme tokens
│   └── agent/            # LangGraph + LangChain backend
│       ├── src/
│       │   ├── api/      # HTTP routes
│       │   ├── agent/    # Graph, nodes, state, tools, prompts
│       │   ├── rag/      # Retrieval, chunking, embeddings
│       │   ├── eval/     # RAGAS evaluation helpers
│       │   ├── services/ # LLM and external integrations
│       │   └── main.py   # Backend entry point
│       └── tests/        # Agent and API tests
├── supabase/             # Migrations, seed data, edge functions
├── packages/             # Shared utilities/types if frontend and backend need them
├── docs/                 # Architecture notes and product docs
├── eval/                 # RAGAS datasets, reports, benchmark outputs
├── presentation/         # Demo and pitch assets
├── scripts/              # Local setup utilities
├── Dockerfile
├── docker-compose.yml
└── Makefile
```

## Tech Stack

| Layer | Technology | Why it fits |
|-------|------------|-------------|
| Frontend | `Next.js` | Fast product UI, server components, and easy deployment for demos |
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

- `apps/web`: user-facing workflow, auth/session handling, and presentation layer
- `apps/agent`: retrieval, tool use, routing logic, and agent responses
- `supabase`: source of truth for users, projects, uploads, and any structured product data
- `eval`: RAGAS datasets and reports to validate retrieval quality before demo day

## Feature Planning

- Core feature spec: `specs/core-feature-spec.md`
- Delivery plan: `planning/core-feature-plan.md`
- Source inspiration: `ai-tro-ly/.repomix/repomix-latest.xml`, adapted to this repo's Next.js + Supabase + LangGraph + LangChain + RAGAS stack.

## Current Backend Service

The code already in this repo runs the backend agent skeleton. The monorepo layout above is the target structure for the Next.js + Supabase build-out.

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

## API

Health check:

```bash
curl http://localhost:8000/health
```

Agent chat:

```bash
curl -X POST http://localhost:8000/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Help me find a first customer and market adoption path"}'
```

The current agent is deterministic and works without an API key. Add `OPENAI_API_KEY` in `.env` only when LLM-backed features are added.

## Development

```bash
make lint
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
