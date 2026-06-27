# Feature Spec — F09 Engagement Game (AI Quiz Battle)

> MVP runtime hiện tại: **Next.js App Router + Next API route handlers** trong `src/frontend`.
> Supabase scope hiện tại: **migration SQL trong repo**, chưa apply remote. FastAPI WebSocket là phase nâng cấp sau MVP.

## 1. Product Frame

F09 là module quiz AI gắn kết nội bộ cho nền tảng đào tạo AI doanh nghiệp. Game chạy như hoạt động khởi động sáng thứ 2: ngắn, vui, vừa học vừa thi đua lành mạnh giữa phòng ban.

Yêu cầu chính:

- Mỗi phiên dùng 10-15 câu hỏi chủ đề AI.
- Chấm điểm server-side tất định: đúng/sai, tốc độ trả lời, streak.
- UI nằm trong app chính, dùng cùng visual language sáng/teal/panel 8px/Georgia heading của `src/frontend`, không dùng giao diện neon/mockup.
- Kết thúc có winner ceremony và leaderboard tổng lọc theo phòng ban.
- Câu hỏi AI được soạn/seed trước; không sinh LLM realtime trong lúc chơi.

## 2. MVP Architecture

```text
src/frontend/
├── app/page.tsx                         # thêm tab Game vào workspace hiện có
├── components/game/                     # lobby, question, reveal, scoreboard, winner
├── lib/game/                            # types, seed data, scoring, in-memory session store
└── app/api/v1/game/                     # Next API route handlers cho game MVP

supabase/migrations/
└── 20260627000200_game_engagement.sql   # game_* tables + RLS + seed 12 câu AI
```

### Runtime Boundaries

| Lớp | MVP hiện tại |
|---|---|
| View | React components trong `src/frontend/components/game` |
| Controller | Next API routes `/api/v1/game/*` |
| Model | TypeScript game engine trong `src/frontend/lib/game` |
| Live state | In-memory session store theo process Next.js |
| Persistence target | Supabase migration trong repo, dùng cho phase DB-backed |

### Post-MVP

FastAPI WebSocket sẽ được thêm sau khi cần realtime production: `join`, `start`, `submit_answer`, `next_question`, `end_session`; client UI giữ controller seam để đổi transport ít nhất có thể.

## 3. API Contract

MVP dùng same-origin Next API:

| Method | Path | Mục đích |
|---|---|---|
| `POST` | `/api/v1/game/sessions` | tạo phiên demo, trả `session` + `player_id` |
| `GET` | `/api/v1/game/sessions/[sessionId]` | đọc state phiên |
| `POST` | `/api/v1/game/sessions/[sessionId]/join` | cập nhật tên/phòng ban người chơi |
| `POST` | `/api/v1/game/sessions/[sessionId]/start` | chuyển lobby sang câu đầu |
| `POST` | `/api/v1/game/sessions/[sessionId]/answer` | submit answer và chấm server-side |
| `POST` | `/api/v1/game/sessions/[sessionId]/next` | question→reveal→scoreboard→next/gameover |
| `GET` | `/api/v1/game/leaderboard?department=` | đọc leaderboard tổng, lọc phòng ban |

Mọi response trả `session` ở shape public. `answer` trả `accepted=false` với `reason` khi trùng, sai phase, quá hạn hoặc không tìm thấy player/session.

## 4. Data Model (Supabase)

Migration tạo các bảng:

| Bảng | Vai trò |
|---|---|
| `game_questions` | câu hỏi AI, type, options, correct index, time limit, fun fact |
| `game_quizzes` | bộ câu hỏi 10-15 câu theo tổ chức |
| `game_sessions` | phiên chơi, host, PIN, status |
| `game_players` | người chơi trong phiên |
| `game_answers` | từng câu trả lời, response time, correct/points |
| `game_scores` | điểm tổng kết phiên |
| `leaderboard_totals` | điểm tích lũy theo tổ chức/phòng ban |

RLS:

- Bảng org-scoped dùng `public.is_org_member(organization_id)`.
- `game_questions` global (`organization_id is null`) đọc được khi `active=true`.
- Player/answer/score đọc/ghi qua session thuộc tổ chức của user.

## 5. Scoring

```text
BASE = 1000
speed_ratio  = clamp((time_limit_ms - response_ms) / time_limit_ms, 0, 1)
speed_factor = 0.5 + 0.5 * speed_ratio
points       = round(BASE * speed_factor) + streak_bonus   nếu đúng
points       = 0                                            nếu sai / không trả lời
```

Streak bonus:

| Streak | Bonus |
|---|---:|
| 2 | 100 |
| 3 | 200 |
| 4 | 300 |
| >=5 | 500 |

Tie-break: tổng điểm cao hơn → số câu đúng nhiều hơn → tổng thời gian trả lời đúng thấp hơn → tên hiển thị.

## 6. UX / Game Feel

- Bám UI gốc của dự án: sáng, B2B education, teal brand, panel 8px, không dùng mockup neon.
- Hiệu ứng phải phục vụ cảm giác chơi: chữ câu hỏi xuất hiện theo nhịp, answer tile pop, đúng/sai có feedback, điểm +points float, podium rise.
- Motion dùng transform/opacity và có `prefers-reduced-motion`.
- Không bêu xấu người cuối; highlight người chơi hiện tại và top/winner.
- Mobile không tràn text; answer tile đủ lớn để thao tác.

## 7. Definition of Done

- App chính có tab `Game`, chơi được trọn luồng lobby → question → reveal → scoreboard → winner.
- Next API routes hoạt động theo contract MVP.
- Scoring/ranking tất định và chấm trên route handler, không tính điểm trong UI.
- Migration game Supabase có schema, index, RLS và seed 12 câu hỏi AI.
- `cd src/frontend && npm run lint` và `npm run build` pass.
