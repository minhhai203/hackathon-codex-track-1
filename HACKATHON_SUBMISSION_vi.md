# AI Trợ Lý Doanh Nghiệp — Bài nộp Hackathon

**Một câu:** Học viện AI nội bộ cho doanh nghiệp SME — mỗi nhân viên nhập công việc thật của mình, **AI tự sinh ra một lộ trình học riêng** theo phòng ban; có trợ lý AI kèm bên và một dashboard cho chủ doanh nghiệp quản lý tiến độ cả công ty.

**Sản phẩm chạy thật:** https://hackathon-codex-track-1.vercel.app/
**Cách kiểm thử nhanh:** mở link → **Bắt đầu assessment** → nhập "Công việc hiện tại" + "Mục tiêu" + chọn phòng ban → **Chấm level** → xem **lộ trình cá nhân do AI sinh** (kèm điểm "Tin cậy %") → *Vào bài học* / *Hỏi trợ lý* / *Xem dashboard DN*.
**Hình thức trình bày:** demo sản phẩm trực tiếp tại hội đồng (không dùng video).

> ⚠️ Các ô `[trong ngoặc]` cần điền đúng sự thật trước khi nộp (stack backend chính xác, link repo/video, tên thành viên).

---

## 1. Sản phẩm có chạy được không? — Thô nhưng CHẠY THẬT ✅

**Có. Đã deploy, dùng được ngay** (badge "API live" trên web = AI được nối thật, không phải giả lập).

**Tính năng chạy end-to-end (kiểm chứng trực tiếp trên link):**
- **Onboarding Assessment** — nhập mô tả công việc thật + tự đánh giá (kinh nghiệm AI, độ tự tin viết prompt, ý thức an toàn dữ liệu) + mục tiêu + phòng ban.
- **AI tự sinh lộ trình cá nhân** — từ thông tin trên, AI chấm cấp độ và dựng một lộ trình riêng, kèm **điểm "Tin cậy %"**. Ví dụ "AI cho Marketing · Tin cậy 73%" với các bài m1–m4 theo cấp độ L1→L3 và tag (prompting, tooling, content, campaign). *Đây là lõi AI: lộ trình bám đúng việc thật của từng người, không phải khoá tĩnh dùng chung.*
- **Bài học** + **Trợ lý AI** (đã mang sẵn bối cảnh phòng ban/công việc).
- **Theo dõi tiến độ** học viên.
- **Dashboard Quản lý doanh nghiệp** — đa phòng ban (Nhân sự, Kinh doanh, Marketing, Kế toán…), % hoàn thành trung bình, **giờ tiết kiệm** (ROI hiển thị ngay, vd 33.5h), tiến độ từng phòng.

**Công nghệ:** Front-end **Next.js** (deploy Vercel). AI: **LLM API (live)**. Backend/DB: `[Hải bổ sung chính xác]`. Mã nguồn trong repo này.

**Nhóm & phân vai:**
- **Hải** — code chính.
- **Tới (Lucas)** — PM, định hướng sản phẩm từng phần, thiết kế UI.
- **Chiến** — thiết kế game-hoá: trải nghiệm học vui cho cả công ty và cùng phòng cùng học.

**Những gì chúng tôi đã làm trong hackathon (nói thẳng):**
- Phân tích bài toán kinh doanh, lựa chọn mô hình và thiết kế giải pháp.
- Phân chia công việc và **xây mới toàn bộ sản phẩm theo hướng đi mới**.
- Thiết kế cơ chế **game-hoá** để cả công ty / cùng phòng học cùng nhau, vui và bám nhau.
- **Trung thực:** ý tưởng đã có từ trước, **nhưng hướng đi mới này chúng tôi chưa từng làm — hôm nay xây mới hoàn toàn từ A–Z.** (Một bản production cũ đi theo hướng khác; bản hackathon này là code mới.)

**Vì sao đây không phải trường hợp bị loại:**
- **Không phải chỉ slide:** có web app chạy thật, dùng được + mã nguồn trong repo.
- **Không đạo nhái:** ý tưởng (AI sinh lộ trình từ công việc thật, theo từng phòng, có game-hoá) và mã nguồn là nguyên bản.
- **Minh bạch thời gian:** chúng tôi nói rõ — ý tưởng có trước, nhưng bản theo hướng mới này được build mới trong hackathon; lịch sử commit trong repo thể hiện điều đó. `[điền: nêu nhánh/commit chính nếu cần]`

---

## 2. Quy mô thị trường — và vì sao KHÔNG phải "tarpit"

**Thị trường:** đào tạo ứng dụng AI cho doanh nghiệp SME — bắt đầu ở Việt Nam, **hàng trăm nghìn SME**, mỗi công ty nhiều phòng ban. Wedge rất cụ thể: doanh nghiệp *đã đang trả* 5–10 triệu/người cho khoá AI mà nhân viên **học xong không áp dụng được**. Chúng tôi bán đúng cái kết quả đó.

**Điểm khác biệt sắc (vì sao KHÔNG phải AI wrapper chung chung):**
1. **AI sinh lộ trình từ chính công việc thật của từng người, theo phòng** — khoá "học AI" chung chung không làm được.
2. **Có assessment + AI chấm → bắt buộc làm được mới qua.** Giết trực tiếp vấn đề "học mà không áp dụng" của cả ngành.
3. **Game-hoá học theo phòng / cả công ty** — giải bài toán "mua khoá xong không ai học hết" bằng động lực nhóm, đây là rào cản adoption lớn nhất của e-learning doanh nghiệp.
4. **Đo ROI ngay trên dashboard** ("giờ tiết kiệm") — chủ DN thấy giá trị bằng con số, không phải cảm tính.

**Vì sao tránh các bẫy "tarpit" ban giám khảo cảnh báo:**
- **Không phải "thay người bằng AI trong thị trường low-trust."** Ngược lại — chúng tôi **nâng cấp chính nhân viên hiện có**. Người mua (chủ DN) và người dùng (nhân viên của họ) đều high-trust. Tiếp sức cho con người, không thay thế.
- **Không phải ngành đông đúc/ngây thơ:** chỗ đông là "khoá học AI"; chúng tôi cạnh tranh bằng *cá nhân hoá + ép áp dụng + game-hoá*, thứ các khoá hiện có về cấu trúc không làm.

**First customer rõ ràng:** phòng đầu tiên trong một SME (assessment + lộ trình đã chạy). Một chủ DN, một phòng, một nỗi đau hiển nhiên.

**Đường mở rộng đáng tin (land & expand, có sẵn trong thiết kế):**
- **Vào** bằng một phòng trong một SME.
- **Mở rộng trong chính công ty** — sản phẩm đa phòng ban từ thiết kế; gán khoá cho phòng tiếp theo, giá trị tài khoản tăng mà không cần bán mới.
- **Mở rộng sang công ty khác** — quy trình B2B lặp lại; thêm module mới là *nội dung*, không phải xây lại.

---

## 3. Vibe Check — vì sao chúng tôi tin vào dự án này

Chúng tôi làm việc với các chủ doanh nghiệp SME mỗi tuần, và cứ thấy lặp lại một cảnh: họ *biết* AI quan trọng, bỏ tiền thật cho nhân viên đi học — rồi một tháng sau chẳng có gì thay đổi. Không phải nhân viên lười. Mà vì không ai dạy họ AI **trên đúng việc của họ**, và không ai bắt buộc họ phải làm được.

Dự án này là lời giải đó. Nó không phải công cụ chúng tôi bán — nó là **sự tự tin**. Khoảnh khắc một người từng "sợ AI" nhập công việc của mình vào, thấy AI dựng ra đúng lộ trình cho họ, làm bài và được mở cấp độ tiếp theo — có gì đó thay đổi trong cách họ nhìn chính mình. Nhân điều đó với mọi phòng ban, ở mọi doanh nghiệp nhỏ đang cảm thấy bị bỏ lại — đó là tương lai chúng tôi muốn xây.

Và hôm nay, chúng tôi không mang đến một bản thử trên giấy — **nó đang chạy thật.** Chúng tôi mới chỉ bắt đầu.

— Nhóm: Hải · Tới (Lucas) · Chiến — lucasnguyen.vn

---

## Liên kết
- **Sản phẩm chạy thật:** https://hackathon-codex-track-1.vercel.app/
- **Repo:** https://github.com/minhhai203/hackathon-codex-track-1
- **Trình bày:** demo trực tiếp tại hội đồng
