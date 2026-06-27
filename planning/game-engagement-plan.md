# Delivery Plan — F09 Engagement Game MVP

> Plan hiện tại đã đổi sang **Next API MVP now, WebSocket later**. Game được triển khai trong app chính `src/frontend`, không dùng `chiennt/game-mockup`.

## 1. Delivery Strategy

Build một vertical slice demoable trước:

1. TypeScript engine tất định trong `src/frontend/lib/game`.
2. Supabase migration trong repo cho data foundation.
3. Next API route handlers cho session/game flow.
4. UI tích hợp trong app chính, đồng bộ design system hiện có.
5. Verify bằng typecheck/build và manual playthrough.

FastAPI WebSocket/reconnect/Redis chỉ là post-MVP upgrade khi cần realtime production.

## 2. Milestones

### MG0 — Engine Core

- Thêm types, seed questions, scoring, ranking, in-memory session store.
- Acceptance: answer đúng/sai, duplicate, deadline, streak và ranking xử lý trên server route/store.

### MG1 — Supabase Migration

- Thêm `20260627000200_game_engagement.sql`.
- Tạo `game_questions`, `game_quizzes`, `game_sessions`, `game_players`, `game_answers`, `game_scores`, `leaderboard_totals`.
- Bật RLS theo `organization_id`, seed 12 câu hỏi AI.
- Acceptance: migration review được trong repo; không yêu cầu apply remote.

### MG2 — Next API MVP

- Thêm route handlers:
  - `POST /api/v1/game/sessions`
  - `GET /api/v1/game/sessions/[sessionId]`
  - `POST /api/v1/game/sessions/[sessionId]/join`
  - `POST /api/v1/game/sessions/[sessionId]/start`
  - `POST /api/v1/game/sessions/[sessionId]/answer`
  - `POST /api/v1/game/sessions/[sessionId]/next`
  - `GET /api/v1/game/leaderboard?department=`
- Acceptance: API smoke chạy được luồng create → join → start → answer → next → gameover.

### MG3 — Integrated UI

- Thêm tab `Game` vào `src/frontend/app/page.tsx`.
- Thêm `src/frontend/components/game/GameScreen.tsx`.
- Dùng CSS token hiện có trong `globals.css`: brand teal, panel, heading, responsive behavior.
- Thêm hiệu ứng chữ, đúng/sai, score float, shake nhẹ, podium rise.
- Acceptance: chơi được trong app chính, mobile không tràn, reduced-motion được tôn trọng.

### MG4 — Verification & Docs

- Cập nhật `specs/game-engagement-spec.md`, `planning/game-engagement-plan.md`, README/ARCHITECTURE.
- Chạy `cd src/frontend && npm run lint`.
- Chạy `cd src/frontend && npm run build`.
- Acceptance: build pass và docs phản ánh đúng runtime MVP.

## 3. Risk Register

| Rủi ro | Giảm thiểu |
|---|---|
| In-memory store mất state khi server restart | Chấp nhận cho MVP; migration đã chuẩn bị DB-backed phase |
| Next API chưa phải realtime WebSocket | Ghi rõ trong spec; WebSocket là post-MVP |
| UI game lạc khỏi sản phẩm chính | Dùng token/spacing/component style hiện có, không dùng mockup neon |
| RLS sai khi DB-backed | Policy dùng `public.is_org_member`, review migration trước khi apply |
| Animation gây khó chịu | Dùng transform/opacity, hỗ trợ `prefers-reduced-motion` |

## 4. Done When

- Game MVP chạy trong app chính.
- Route handlers và UI dùng cùng session engine.
- Supabase migration có schema/RLS/seed.
- Spec/plan đã cập nhật khỏi hướng FastAPI WS-first.
- Typecheck/build frontend pass.
