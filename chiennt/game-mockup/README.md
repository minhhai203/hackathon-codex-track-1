# AI Quiz Battle — Mock-up (Next.js)

Mock-up **đầy đủ stack frontend thật** (Next.js + TypeScript + Tailwind) cho module game gắn kết. Chạy được ngay với **bot + dữ liệu mẫu**, kiến trúc tách lớp để **tái dùng nguyên khi có backend + DB**.

> Đặt riêng trong `chiennt/game-mockup/` để không đè đường dẫn chung (`apps/web`) khi merge.

## Chạy thử

```bash
cd chiennt/game-mockup
npm install
npm run dev
# mở http://localhost:3000  → bấm "Vào phòng chơi"
```

Lệnh khác: `npm run typecheck`, `npm run build`.

## Luồng màn hình (khớp design-note)

| Phase | Component | Design-note |
|---|---|---|
| Phòng chờ | `Lobby` | 00-overview §4 |
| Thi đấu (MCQ / Đúng-Sai / Đoán output) | `QuestionView` + `Countdown` | 02 §1–2, 03 §2.1 |
| Lộ đáp án + Fun fact AI | `Reveal` | 02 §2, 03 §2.2 |
| Bảng xếp hạng (bot đổi hạng) | `Scoreboard` | 02 §4, 03 §2.3 |
| Popup vô địch + lọc phòng ban | `WinnerPodium` | 02 §5–6, 03 §2.4 |

## Kiến trúc — seam để cắm backend

```text
UI (components/game/*)  ──►  useGame()  ──►  GameController (interface)
                                               ├── MockGameController   ← hiện tại (bot + timer local)
                                               └── WebSocketGameController ← thêm sau, UI KHÔNG đổi
                                                        │
                              lib/game/engine.ts (state machine thuần)
                              lib/game/scoring.ts (tính điểm tất định)
```

**Phần lõi tái dùng được ngay** (không phụ thuộc UI, đã verify bằng test mô phỏng):

- `lib/game/types.ts` — domain types (Question, Player, GameState...).
- `lib/game/scoring.ts` — công thức điểm (cơ bản × tốc độ + streak) bám design-note 02.
- `lib/game/engine.ts` — state machine: lobby → question → reveal → scoreboard → gameover.
- `lib/game/transport.ts` — interface `GameController` + `MockGameController`.

## Khi có backend + DB

1. Viết `WebSocketGameController implements GameController` (gọi `WS /api/v1/game/ws/{session_id}`), giữ nguyên `engine.ts`/`scoring.ts` ở server (hoặc port sang Python).
2. Trong `useGame.ts` đổi 1 dòng khởi tạo từ `MockGameController` sang `WebSocketGameController`.
3. Thay `lib/game/mockData.ts` bằng dữ liệu từ Supabase (`game_questions`, `game_players`).
4. UI components (`components/game/*`) **không cần sửa**.

## Cải tiến đã đưa vào mock

- Trộn nhiều dạng câu hỏi: trắc nghiệm, Đúng/Sai, đoán output AI.
- Fun fact AI sau mỗi câu (vui + học).
- Bot giả lập (độ chính xác khác nhau) tạo kịch tính đổi hạng trên leaderboard.

## Kiểm thử lõi

Logic `scoring` + `engine` đã được typecheck (tsc strict) và chạy mô phỏng 1 ván 2 người: điểm tốc độ, streak, phá hòa, chuyển phase, người thắng — tất cả khớp design-note. (Components React chưa chạy `next build` trong môi trường này; cần `npm install` để build/preview.)
