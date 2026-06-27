# Feature Spec - F09 Engagement Game

> MVP runtime: Next.js App Router API handlers in `src/frontend`.
> Supabase scope: migration SQL in repo only, not remote-applied yet.
> FastAPI WebSocket remains a post-MVP upgrade.

## Product Frame

F09 is an internal AI quiz game for the main training app. The game runs inside the real `src/frontend` experience, uses the existing light teal/panel design system, and does not use `chiennt/game-mockup`.

The MVP has two actors:

- **Truong phong / manager**: creates a room, shares the room code, chooses the question source, and starts/advances the session.
- **Nhan vien / employee**: joins a room by code and answers questions. Employees cannot start or advance a room.

## Room And Question Flow

1. Manager opens the Game tab and creates a room.
2. Manager chooses one question source mode:
   - `random`: the session uses a random subset from the seeded AI question bank.
   - `custom`: the manager can select questions from the bank and add new questions for the room.
3. API returns `session` plus a `host_token`; only the manager client keeps this token.
4. Manager shares the `pin_code`.
5. Employees join with `pin_code`, display name, and department.
6. Manager starts the game once at least one employee has joined.
7. Employees answer; scoring is calculated server-side.
8. Manager controls reveal, scoreboard, next question, and winner screen.

## Runtime Architecture

```text
src/frontend/
├── app/page.tsx
├── components/game/GameScreen.tsx
├── lib/game/
│   ├── types.ts
│   ├── seed.ts
│   ├── scoring.ts
│   └── store.ts
└── app/api/v1/game/
    ├── questions
    ├── sessions
    ├── sessions/join-by-code
    ├── sessions/[sessionId]/join
    ├── sessions/[sessionId]/start
    ├── sessions/[sessionId]/answer
    ├── sessions/[sessionId]/next
    └── leaderboard
```

The in-memory store is acceptable for the MVP. Supabase tables are prepared by migration for the DB-backed phase.

## API Contract

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/v1/game/questions` | Read seeded question bank |
| `POST` | `/api/v1/game/sessions` | Manager creates a room and receives `host_token` |
| `GET` | `/api/v1/game/sessions/[sessionId]` | Read public room state |
| `POST` | `/api/v1/game/sessions/join-by-code` | Employee joins by room code |
| `POST` | `/api/v1/game/sessions/[sessionId]/join` | Employee joins by session id |
| `POST` | `/api/v1/game/sessions/[sessionId]/start` | Manager starts room with `host_token` |
| `POST` | `/api/v1/game/sessions/[sessionId]/answer` | Employee submits answer |
| `POST` | `/api/v1/game/sessions/[sessionId]/next` | Manager advances phase with `host_token` |
| `GET` | `/api/v1/game/leaderboard?department=` | Read aggregate leaderboard |

Start/next return `403` when `host_token` is missing or invalid, and `409` when the room is not ready or phase is invalid.

## Data Model Target

Migration `supabase/migrations/20260627000200_game_engagement.sql` defines:

- `game_questions`: seeded/global and org-scoped AI questions.
- `game_quizzes`: quiz composition and `question_mode`.
- `game_sessions`: room state, `pin_code`, host display info, and `question_mode`.
- `game_players`: employees joined to a room.
- `game_answers`: answer records with correctness and points.
- `game_scores`: final per-session score rows.
- `leaderboard_totals`: aggregate leaderboard by organization/user/department.

RLS stays organization-scoped through `public.is_org_member(organization_id)`. Global active questions remain readable.

## Scoring

Scoring is deterministic and server-side:

```text
BASE = 1000
speed_ratio  = clamp((time_limit_ms - response_ms) / time_limit_ms, 0, 1)
speed_factor = 0.5 + 0.5 * speed_ratio
points       = round(BASE * speed_factor) + streak_bonus   if correct
points       = 0                                            if wrong or missed
```

Tie-break: total points, correct count, total correct response time, display name.

## UX Requirements

- UI must match the main app: light background, teal brand, 8px panels, Georgia headings.
- Role distinction must be visible and operational.
- Manager sees room code, source mode, employee list, and host-only controls.
- Employee sees join form, answer screen, reveal, scoreboard, and winner.
- Animations are CSS-only: word reveal, answer pop, correct/wrong feedback, score float, podium rise.
- `prefers-reduced-motion` must remain supported.
- Mobile layouts must not overflow text or controls.

## Done

- Game tab is playable in the real app.
- Manager can create room, select random/custom source, share code, start, and advance.
- Employee can join by code and answer only.
- API enforces host-only start/next with `host_token`.
- Migration and docs reflect the room/actor model.
- `cd src/frontend && npm run lint` and `npm run build` pass.
