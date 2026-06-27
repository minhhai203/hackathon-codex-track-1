# AI Trợ Lý — Mockup giao diện Teachable (static)

Bản mockup giao diện độc lập theo phong cách Teachable để test/demo. **Site tĩnh**, mở là chạy, không cần backend (không Next/Supabase/OpenAI).

Nội dung bài học được **trích từ dự án thật** `AI-TRO-LY` (`src/frontend/lib/roles.ts`) — không nhập tay.

## Cấu trúc

```
index.html                # giao diện (render động từ data.js)
data.js                   # TỰ SINH — window.AITROLY_DATA (6 vai trò, bài học thật)
scripts/extract-roles.mjs # script trích roles.ts -> data.js
```

## Mở thử

Vì trình duyệt chặn `file://` với một số tính năng, nên chạy qua server tĩnh:

```bash
npx http-server -p 8799 -c-1
# mở http://127.0.0.1:8799/index.html
```

Hoặc mở thẳng `index.html` (đa số chức năng vẫn chạy do `data.js` nhúng bằng `<script src>`).

## Cập nhật lại dữ liệu (re-sync)

Khi `roles.ts` ở dự án gốc thay đổi:

```bash
npx tsx scripts/extract-roles.mjs
# hoặc trỏ SRC_ROOT khác:
npx tsx scripts/extract-roles.mjs "D:/AI-TRO-LY/src/frontend/lib"
```

## Vai trò có dữ liệu

`nhan-su`, `kinh-doanh`, `ke-toan`, `marketing`, `van-hanh`, `khac` — render động, tự khớp khi dữ liệu đổi.

## Phạm vi mockup

- ✅ Landing, onboarding chọn vai trò, course player (lộ trình + bài học thật), quiz data, trợ lý AI (gợi ý từ Starter Kit).
- ⚠️ Trợ lý AI là **bản demo** — chip gợi ý + câu trả lời mẫu tĩnh, chưa nối LLM thật.
- ⚠️ Màn quản lý doanh nghiệp giữ nguyên dạng tĩnh (ngoài phạm vi demo P1).
