# Delivery Plan - F09 Engagement Game MVP

> Current direction: implement the real game in `src/frontend` with Next API route handlers. Do not use `chiennt/game-mockup`. FastAPI WebSocket is a later production upgrade.

## Strategy

Ship a complete room-based MVP:

1. Manager creates a game room and owns host-only controls.
2. Employees join by room code.
3. Question source supports random bank selection or manager-custom selection/creation.
4. Scoring and phase transitions run on the server route/store.
5. UI stays inside the main app design system.

## Milestones

### MG0 - Engine And State

- Extend `src/frontend/lib/game` with room actor types, question mode, host display info, and unique employee player ids.
- Keep scoring deterministic on the server.
- Acceptance:
  - duplicate answers are rejected;
  - wrong/missed answers reset streak;
  - employees cannot join after the room starts;
  - start/next require manager `host_token`.

### MG1 - Question Source

- Expose seeded bank through `GET /api/v1/game/questions`.
- Support create-room payload:
  - `question_mode=random`;
  - `question_mode=custom` with `selected_question_ids` and `custom_questions`.
- Acceptance: manager can create a room from either source mode.

### MG2 - Room API

- Implement/maintain:
  - `POST /api/v1/game/sessions`
  - `GET /api/v1/game/sessions/[sessionId]`
  - `POST /api/v1/game/sessions/join-by-code`
  - `POST /api/v1/game/sessions/[sessionId]/join`
  - `POST /api/v1/game/sessions/[sessionId]/start`
  - `POST /api/v1/game/sessions/[sessionId]/answer`
  - `POST /api/v1/game/sessions/[sessionId]/next`
  - `GET /api/v1/game/leaderboard?department=`
- Acceptance: smoke flow create -> join-by-code -> start -> answer -> reveal -> scoreboard -> gameover works.

### MG3 - Integrated UI

- Use `src/frontend/components/game/GameScreen.tsx`.
- Add visible role switch: `Trưởng phòng` and `Nhân viên`.
- Manager UI:
  - host info form;
  - random/custom question source;
  - selectable bank questions;
  - custom question builder;
  - room code and employee list;
  - start/next controls.
- Employee UI:
  - room code join form;
  - answer-only question screen;
  - reveal, scoreboard, winner views.
- Acceptance: UI is playable from the main Game tab and matches the real app style.

### MG4 - Supabase Migration

- Keep migration in `supabase/migrations/20260627000200_game_engagement.sql`.
- Include `question_mode`, host display fields, room status, players, answers, scores, leaderboard.
- Do not apply remote without a configured Supabase CLI/DB connection.
- Acceptance: migration is reviewable in repo and aligns with the MVP API model.

### MG5 - Verification

- Run `cd src/frontend && npm run lint`.
- Run `cd src/frontend && npm run build`.
- Manual browser check:
  - open real app at `http://localhost:3000/#game`;
  - manager creates room;
  - employee joins by code;
  - manager starts;
  - employee answers;
  - manager advances through reveal, scoreboard, winner;
  - mobile width does not overflow.

## Risks

| Risk | Mitigation |
|---|---|
| In-memory session state resets on dev-server restart | Accept for MVP; migration prepares DB-backed phase |
| No realtime push yet | Add refresh button and keep WebSocket for post-MVP |
| Host token is an MVP control, not full auth | Replace with real auth/session checks in DB-backed phase |
| Custom question validation is light | Validate prompt/options/correct index on API/store and harden later |
| UI drifts toward mockup style | Use existing app tokens, panels, spacing, and typography |

## Done When

- Main app Game tab supports manager room creation and employee join by code.
- Manager and employee permissions are clearly separated in UI and API.
- Random/custom question source works.
- Scoring, answer rejection, phase transitions, and leaderboard still work server-side.
- Docs and migration match the implemented MVP.
- Lint/build pass.
