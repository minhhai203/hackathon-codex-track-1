// TỰ SINH bởi scripts/extract-roles.mjs — KHÔNG sửa tay.
// Nguồn: D:/AI-TRO-LY/src/frontend/lib/roles.ts
window.AITROLY_DATA = {
  "roles": {
    "nhan-su": {
      "id": "nhan-su",
      "label": "Nhân viên Nhân sự (HR)",
      "shortLabel": "Nhân sự / HR",
      "icon": "👥",
      "color": "#6C5CE7",
      "modules": [
        {
          "id": "nhan-su-m1",
          "title": "Claude là gì & vì sao HR nên dùng Claude",
          "durationMin": 12,
          "level": 1,
          "isFoundation": true,
          "skills": [
            "hr-nen-tang"
          ],
          "content": "Claude là trợ lý AI viết & đọc tài liệu rất mạnh — hợp với HR vì 80% việc HR là chữ nghĩa: JD, email, chính sách, đánh giá, báo cáo. So với ChatGPT, Claude giỏi đọc tài liệu dài (hợp đồng, sổ tay, file CV), giữ giọng văn nhất quán và bám đúng yêu cầu. Hãy coi Claude như một trợ lý HR ngồi cạnh: bạn ra đề, nó làm nháp, bạn duyệt và chịu trách nhiệm cuối cùng.",
          "learnings": [
            "Hiểu Claude bằng ngôn ngữ HR đời thường",
            "Khi nào dùng Claude, khi nào dùng công cụ khác",
            "Điều Claude KHÔNG thay được người làm HR"
          ],
          "practicePrompt": "Bạn là trợ lý AI cho nhân sự (HR) tại doanh nghiệp Việt Nam. Bối cảnh: tôi làm [VỊ TRÍ HR] ở công ty [NGÀNH, QUY MÔ] người. Yêu cầu: liệt kê 10 việc HR tôi làm hằng tuần mà AI có thể giúp làm nhanh hơn, kèm mức tiết kiệm thời gian ước tính. Định dạng: bảng 3 cột (Việc | AI giúp gì | Mức tiết kiệm), xếp từ tiết kiệm nhiều đến ít. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m2",
          "title": "Claude Pro có gì: Projects, Artifacts, upload file, web search",
          "durationMin": 18,
          "level": 1,
          "isFoundation": true,
          "skills": [
            "hr-nen-tang"
          ],
          "content": "Bản Pro mở 5 'siêu năng lực' cho HR: (1) Projects — không gian lưu sẵn tài liệu công ty để Claude luôn hiểu bối cảnh; (2) Artifacts — tạo & sửa tài liệu (JD, email, checklist) ngay trong khung chat, copy ra dùng liền; (3) Upload file — kéo CV, bảng lương, file khảo sát vào để Claude đọc; (4) Web search — tra cứu luật, mức lương thị trường; (5) Long-context — đọc tài liệu cả trăm trang. Bài này cho bạn bản đồ tổng thể trước khi đi sâu.",
          "learnings": [
            "5 năng lực Pro quan trọng nhất cho HR",
            "Khác biệt giữa chat thường và Project",
            "Artifacts: tạo tài liệu dùng được ngay"
          ],
          "practicePrompt": "Bạn là trợ lý AI cho HR, giải thích cho người không rành công nghệ. Bối cảnh: tôi mới dùng Claude Pro. Yêu cầu: giải thích khác nhau giữa hỏi trong chat thường và tạo một Project, và khi nào dùng cái nào trong công việc HR. Định dạng: ngôn ngữ đời thường, kèm 1 ví dụ cụ thể trong tuyển dụng, tối đa 200 từ. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m3",
          "title": "Viết prompt cho HR: Vai trò + Bối cảnh + Yêu cầu + Định dạng",
          "durationMin": 20,
          "level": 1,
          "isFoundation": true,
          "skills": [
            "hr-nen-tang"
          ],
          "content": "Công thức 4 phần cho mọi prompt HR: (1) Vai trò — 'Bạn là chuyên viên tuyển dụng…'; (2) Bối cảnh — ngành, quy mô, văn hóa công ty; (3) Yêu cầu cụ thể — làm gì, cho ai; (4) Định dạng đầu ra — bảng, email ≤150 từ, checklist. Prompt mơ hồ cho kết quả chung chung; prompt 4 phần cho kết quả dùng được ngay. Mẹo: nhờ Claude tự hỏi lại bạn 2–3 câu trước khi làm.",
          "learnings": [
            "Công thức prompt 4 phần",
            "Yêu cầu định dạng đầu ra để khỏi sửa nhiều",
            "Mẹo 'hỏi lại tôi nếu thiếu thông tin'"
          ],
          "practicePrompt": "Bạn là chuyên gia viết prompt cho người làm HR. Bối cảnh: tôi muốn nhờ Claude soạn email mời phỏng vấn. Yêu cầu: HÃY HỎI LẠI tôi 3 câu cần thiết trước, sau đó viết một prompt mẫu hoàn chỉnh theo cấu trúc Vai trò + Bối cảnh + Yêu cầu + Định dạng. Định dạng: in prompt mẫu trong khối riêng để tôi copy dùng lại."
        },
        {
          "id": "nhan-su-m4",
          "title": "An toàn dữ liệu nhân sự: PII, lương, hợp đồng & luật khi dùng AI",
          "durationMin": 18,
          "level": 1,
          "isFoundation": true,
          "skills": [
            "hr-nen-tang",
            "hr-quan-he-chinh-sach"
          ],
          "content": "HR giữ dữ liệu nhạy cảm nhất công ty: CMND/CCCD, số tài khoản, lương, hồ sơ kỷ luật, sức khỏe. Nguyên tắc: ẩn danh trước khi đưa lên AI (thay tên bằng 'Ứng viên A', bỏ số CCCD/tài khoản), mô tả tình huống chung thay vì dán nguyên hồ sơ. Bật tùy chọn không dùng dữ liệu để huấn luyện. Mọi nội dung pháp lý (hợp đồng, quyết định kỷ luật) phải được người có thẩm quyền rà lại — Claude làm nháp, không thay luật sư.",
          "learnings": [
            "Dữ liệu HR nào tuyệt đối không dán nguyên văn",
            "Cách ẩn danh nhanh trước khi nhờ AI",
            "Ranh giới: AI làm nháp, người chịu trách nhiệm"
          ],
          "practicePrompt": "Bạn là chuyên gia an toàn dữ liệu nhân sự. Bối cảnh: đây là đoạn hồ sơ nhân viên ĐÃ LÀM GIẢ (có tên, CCCD, số tài khoản, lương). Yêu cầu: chỉ ra các trường nhạy cảm không nên đưa lên AI công cộng, viết lại bản ẩn danh an toàn, và gợi ý quy tắc ẩn danh dùng lại. Định dạng: (1) danh sách trường nhạy cảm, (2) bản ẩn danh, (3) 5 quy tắc. Dữ liệu: [DÁN/UPLOAD ĐOẠN ĐÃ LÀM GIẢ]. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu.",
          "attachedFile": {
            "name": "ho-so-nhan-vien-lam-gia.txt",
            "path": "/files/hr/ho-so-nhan-vien-lam-gia.txt",
            "desc": "Hồ sơ nhân viên đã làm giả (có PII). Thử ẩn danh trước khi upload lên Claude."
          }
        },
        {
          "id": "nhan-su-m5",
          "title": "Dựng 'Project Trợ lý HR': nạp chính sách, JD mẫu, giọng văn công ty",
          "durationMin": 22,
          "level": 2,
          "isFoundation": true,
          "skills": [
            "hr-nen-tang",
            "hr-tu-dong-hoa"
          ],
          "content": "Đây là bước tạo khác biệt lớn nhất. Tạo một Project tên 'Trợ lý HR [Công ty]', nạp vào phần Knowledge: sổ tay nhân viên, khung lương, JD mẫu, quy trình, ví dụ email chuẩn giọng công ty. Viết Custom Instructions: 'Luôn dùng giọng [trang trọng/thân thiện], xưng hô [anh/chị], theo đúng chính sách trong tài liệu.' Từ đó MỌI câu trả lời đều bám bối cảnh công ty bạn — không phải gõ lại context mỗi lần.",
          "learnings": [
            "Tài liệu nền nên nạp vào Project",
            "Viết Custom Instructions cho trợ lý HR",
            "Lợi ích: không lặp lại bối cảnh, kết quả nhất quán"
          ],
          "practicePrompt": "Bạn là chuyên gia triển khai Claude cho phòng HR. Bối cảnh: tôi sắp tạo một Project Trợ lý HR cho công ty [NGÀNH, QUY MÔ] người. Yêu cầu: gợi ý 8 tài liệu nên nạp vào Knowledge và viết phần Custom Instructions chuẩn (vai trò, giọng xưng hô, ràng buộc an toàn dữ liệu). Định dạng: (1) danh sách tài liệu có giải thích ngắn, (2) đoạn Custom Instructions sẵn dán. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m6",
          "title": "Artifacts: tạo & chỉnh tài liệu HR ngay trong Claude",
          "durationMin": 18,
          "level": 2,
          "isFoundation": true,
          "skills": [
            "hr-nen-tang",
            "hr-hanh-chinh-ops"
          ],
          "content": "Khi bạn nhờ Claude tạo JD, email, checklist hay bảng, kết quả hiện ra ở khung Artifact bên phải — bạn chỉnh trực tiếp, yêu cầu 'rút ngắn', 'trang trọng hơn', 'thêm cột deadline' và Claude sửa tại chỗ. Artifact giữ phiên bản, copy ra Word/Google Docs trong một cú nhấp. Đây là cách HR ra tài liệu hoàn chỉnh thay vì copy từng đoạn chat.",
          "learnings": [
            "Nhận biết & dùng khung Artifact",
            "Lệnh chỉnh sửa lặp nhanh (rút gọn, đổi giọng…)",
            "Xuất tài liệu ra Word/Docs"
          ],
          "practicePrompt": "Bạn là trợ lý HR. Bối cảnh: công ty [NGÀNH, QUY MÔ]. Yêu cầu: tạo một checklist onboarding nhân viên mới ngày đầu, đầy đủ đầu mục (tài khoản, thiết bị, giấy tờ, đào tạo, người đỡ đầu). Định dạng: Artifact dạng bảng 4 cột (Việc cần làm | Người phụ trách | Hạn | Trạng thái), nhóm theo giai đoạn. Sau đó chờ tôi yêu cầu chỉnh thêm. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m7",
          "title": "Viết JD chuẩn từ một mô tả ngắn",
          "durationMin": 18,
          "level": 1,
          "skills": [
            "hr-tuyen-dung"
          ],
          "content": "Đưa Claude vài gạch đầu dòng (chức danh, 3–4 nhiệm vụ chính, yêu cầu) → nhận JD đầy đủ: mô tả công việc, yêu cầu, quyền lợi, đúng giọng công ty. Nhờ Claude kiểm tra ngôn ngữ thiên kiến (giới tính, tuổi), chèn EVP hấp dẫn và căn chỉnh với khung lương. Một JD tốt trong 5 phút thay vì nửa buổi.",
          "learnings": [
            "Biến gạch đầu dòng thành JD hoàn chỉnh",
            "Loại bỏ ngôn ngữ thiên kiến trong JD",
            "Chuẩn hóa JD theo giọng công ty"
          ],
          "practicePrompt": "Bạn là chuyên viên tuyển dụng (TA). Bối cảnh: công ty [NGÀNH, QUY MÔ]. Yêu cầu: viết JD cho vị trí [CHỨC DANH] với nhiệm vụ chính [3-4 gạch đầu dòng]; tránh ngôn ngữ phân biệt tuổi/giới. Định dạng: Artifact gồm Mô tả công việc, Yêu cầu, Quyền lợi; giọng thân thiện, chuyên nghiệp. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu.",
          "attachedFile": {
            "name": "jd-va-cv-mau.md",
            "path": "/files/hr/jd-va-cv-mau.md",
            "desc": "JD mẫu để luyện viết JD chuẩn (bỏ ngôn ngữ thiên kiến tuổi/giới)."
          }
        },
        {
          "id": "nhan-su-m8",
          "title": "Tin tuyển dụng hấp dẫn cho từng kênh (TopCV, Facebook, LinkedIn)",
          "durationMin": 18,
          "level": 1,
          "skills": [
            "hr-tuyen-dung"
          ],
          "content": "Từ một JD, nhờ Claude tạo nhiều phiên bản tin đăng: bản ngắn bắt mắt cho Facebook, bản chuyên nghiệp cho LinkedIn, bản đầy đủ cho TopCV/VietnamWorks. Mỗi kênh một giọng và độ dài khác nhau, kèm hashtag, hook 3 dòng đầu để tăng tỉ lệ ứng tuyển.",
          "learnings": [
            "Một JD → nhiều tin theo từng kênh",
            "Hook thu hút trong 3 dòng đầu",
            "Tối ưu độ dài & giọng theo nền tảng"
          ],
          "practicePrompt": "Bạn là chuyên viên tuyển dụng kiêm content tuyển dụng. Bối cảnh: dùng JD bên dưới. Yêu cầu: viết 3 phiên bản tin tuyển dụng theo kênh, có hook 3 dòng đầu và hashtag phù hợp. Định dạng: (1) Facebook ≤120 từ, (2) LinkedIn chuyên nghiệp, (3) TopCV đầy đủ — xuất Artifact. Dữ liệu: [DÁN JD]. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu.",
          "attachedFile": {
            "name": "jd-va-cv-mau.md",
            "path": "/files/hr/jd-va-cv-mau.md",
            "desc": "Dùng phần JD để viết 3 phiên bản tin tuyển theo kênh."
          }
        },
        {
          "id": "nhan-su-m9",
          "title": "Sàng lọc CV theo tiêu chí: upload CV + JD, Claude chấm điểm",
          "durationMin": 25,
          "level": 2,
          "skills": [
            "hr-tuyen-dung"
          ],
          "content": "Upload JD + nhiều CV (đã ẩn thông tin nhạy cảm), nhờ Claude chấm mỗi CV theo tiêu chí bạn đặt (kinh nghiệm, kỹ năng, độ phù hợp), tóm tắt điểm mạnh/điểm yếu/cờ đỏ và xếp hạng. Bạn tiết kiệm hàng giờ đọc CV, nhưng luôn tự đọc lại top ứng viên — AI hỗ trợ ra quyết định, không thay quyết định.",
          "learnings": [
            "Đặt tiêu chí chấm rõ ràng cho Claude",
            "Đọc bảng tóm tắt điểm mạnh/yếu/cờ đỏ",
            "Tránh thiên kiến & tự kiểm tra top CV"
          ],
          "practicePrompt": "Bạn là chuyên viên tuyển dụng giàu kinh nghiệm. Bối cảnh: đây là JD và các CV đã ẩn danh. Yêu cầu: chấm mỗi CV theo thang Kinh nghiệm /40, Kỹ năng /40, Phù hợp văn hóa /20; nêu điểm mạnh, rủi ro, cờ đỏ; KHÔNG tự loại, để tôi quyết định. Định dạng: bảng xếp hạng + 2 dòng nhận xét/ứng viên. Dữ liệu: [DÁN/UPLOAD JD + CV]. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu.",
          "attachedFile": {
            "name": "jd-va-cv-mau.md",
            "path": "/files/hr/jd-va-cv-mau.md",
            "desc": "JD + 3 CV ẩn danh. Upload cùng prompt để Claude chấm điểm & xếp hạng."
          }
        },
        {
          "id": "nhan-su-m10",
          "title": "Xây chân dung ứng viên (candidate persona) từ JD + thị trường",
          "durationMin": 20,
          "level": 2,
          "skills": [
            "hr-tuyen-dung"
          ],
          "content": "Nhờ Claude dựng chân dung ứng viên lý tưởng: họ đang ở đâu (kênh tìm việc), điều gì khiến họ chuyển việc, từ khóa họ tìm, lo ngại khi ứng tuyển. Kết hợp web search để cập nhật mức lương & xu hướng. Chân dung này dùng để viết tin, chọn kênh sourcing và chuẩn bị câu hỏi phỏng vấn đúng động lực.",
          "learnings": [
            "Dựng chân dung ứng viên đa chiều",
            "Tìm đúng kênh & thông điệp tiếp cận",
            "Dùng web search cập nhật lương/xu hướng"
          ],
          "practicePrompt": "Bạn là chuyên viên tuyển dụng am hiểu thị trường lao động VN. Bối cảnh: vị trí [CHỨC DANH] tại [THÀNH PHỐ]. Yêu cầu: dựng chân dung ứng viên lý tưởng (nhân khẩu, động lực chuyển việc, kênh tìm việc, lo ngại, thông điệp thu hút); dùng web search ước lượng khoảng lương hiện tại và nêu nguồn. Định dạng: theo từng mục, gạch đầu dòng. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu.",
          "attachedFile": {
            "name": "jd-va-cv-mau.md",
            "path": "/files/hr/jd-va-cv-mau.md",
            "desc": "Dùng JD để dựng chân dung ứng viên + ước lượng lương thị trường."
          }
        },
        {
          "id": "nhan-su-m11",
          "title": "Bộ câu hỏi phỏng vấn theo năng lực + thang điểm (scorecard)",
          "durationMin": 22,
          "level": 2,
          "skills": [
            "hr-tuyen-dung",
            "hr-hieu-suat"
          ],
          "content": "Từ JD, nhờ Claude tạo bộ câu hỏi phỏng vấn theo từng năng lực (behavioral/STAR), kèm 'câu hỏi đào sâu' và scorecard chấm điểm chuẩn để các interviewer chấm thống nhất. Có thể custom theo từng ứng viên dựa trên CV. Đây là nhu cầu trực tiếp của nhiều học viên (custom câu hỏi & bảng điểm cho từng vị trí).",
          "learnings": [
            "Câu hỏi phỏng vấn theo năng lực (STAR)",
            "Scorecard chuẩn cho nhiều interviewer",
            "Cá nhân hóa câu hỏi theo CV ứng viên"
          ],
          "practicePrompt": "Bạn là chuyên viên tuyển dụng kiêm thiết kế phỏng vấn. Bối cảnh: vị trí [CHỨC DANH], dựa JD nếu có. Yêu cầu: tạo bộ câu hỏi phỏng vấn theo 5 năng lực cốt lõi (mỗi năng lực 2 câu STAR + 1 câu đào sâu) và scorecard 1-5 có mô tả từng mức. Định dạng: Artifact dạng bảng, dùng chung cho nhiều interviewer. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu.",
          "attachedFile": {
            "name": "jd-va-cv-mau.md",
            "path": "/files/hr/jd-va-cv-mau.md",
            "desc": "Dùng JD để tạo bộ câu hỏi phỏng vấn theo năng lực + scorecard."
          }
        },
        {
          "id": "nhan-su-m12",
          "title": "Tóm tắt & đánh giá ứng viên sau phỏng vấn từ ghi chú/transcript",
          "durationMin": 20,
          "level": 2,
          "skills": [
            "hr-tuyen-dung"
          ],
          "content": "Dán ghi chú phỏng vấn rời rạc hoặc transcript, Claude tổng hợp thành biên bản đánh giá gọn: điểm mạnh, rủi ro, mức độ phù hợp từng tiêu chí, đề xuất pass/fail kèm lý do. Giúp ra quyết định nhanh và lưu hồ sơ tuyển dụng minh bạch.",
          "learnings": [
            "Biến ghi chú rời thành biên bản đánh giá",
            "Chấm theo tiêu chí, nêu lý do rõ ràng",
            "Lưu vết quyết định tuyển dụng"
          ],
          "practicePrompt": "Bạn là chuyên viên tuyển dụng. Bối cảnh: đây là ghi chú phỏng vấn rời rạc. Yêu cầu: tổng hợp thành biên bản đánh giá ứng viên gồm tóm tắt, điểm mạnh, rủi ro, chấm theo 4 tiêu chí [LIỆT KÊ], đề xuất pass/fail kèm lý do. Định dạng: biên bản gọn có tiêu đề rõ. Dữ liệu: [DÁN/UPLOAD GHI CHÚ]. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu.",
          "attachedFile": {
            "name": "ghi-chu-phong-van-mau.txt",
            "path": "/files/hr/ghi-chu-phong-van-mau.txt",
            "desc": "Ghi chú phỏng vấn rời rạc. Nhờ Claude tổng hợp thành biên bản đánh giá."
          }
        },
        {
          "id": "nhan-su-m13",
          "title": "Email tuyển dụng toàn trình: mời PV, từ chối khéo, gửi offer",
          "durationMin": 18,
          "level": 3,
          "skills": [
            "hr-tuyen-dung",
            "hr-hanh-chinh-ops"
          ],
          "content": "Một lần dựng, dùng cả mùa tuyển: bộ email mời phỏng vấn, nhắc lịch, từ chối lịch sự giữ thiện cảm thương hiệu, gửi offer, nhắc nhận việc. Nạp vào Project để tái dùng, chỉ điền tên & vị trí. Giữ trải nghiệm ứng viên đồng nhất và chuyên nghiệp.",
          "learnings": [
            "Bộ email tuyển dụng đầy đủ vòng đời",
            "Từ chối khéo, giữ thương hiệu tuyển dụng",
            "Tái dùng qua Project"
          ],
          "practicePrompt": "Bạn là chuyên viên tuyển dụng phụ trách trải nghiệm ứng viên. Bối cảnh: công ty [NGÀNH], giọng [thân thiện/trang trọng]. Yêu cầu: tạo bộ 5 email (mời PV, nhắc lịch, từ chối sau PV giữ thiện cảm, gửi offer, nhắc nhận việc), có [chỗ điền] biến. Định dạng: Artifact, mỗi email có tiêu đề + thân, để lưu vào Project tái dùng. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m14",
          "title": "Phân tích phễu tuyển dụng & nguồn ứng viên từ Excel",
          "durationMin": 22,
          "level": 3,
          "skills": [
            "hr-tuyen-dung",
            "hr-phan-tich-du-lieu"
          ],
          "content": "Upload file theo dõi tuyển dụng (số CV, qua vòng, kênh, thời gian tuyển), nhờ Claude tính tỉ lệ chuyển đổi từng vòng, kênh nào hiệu quả nhất, thời gian tuyển trung bình, và đề xuất nên dồn ngân sách vào đâu. Claude in Excel có thể viết công thức và biểu đồ ngay trên file.",
          "learnings": [
            "Tính tỉ lệ chuyển đổi phễu tuyển",
            "So sánh hiệu quả kênh sourcing",
            "Ra quyết định phân bổ dựa trên dữ liệu"
          ],
          "practicePrompt": "Bạn là chuyên viên phân tích tuyển dụng. Bối cảnh: đây là dữ liệu phễu tuyển dụng theo kênh. Yêu cầu: tính tỉ lệ chuyển đổi từng vòng, time-to-hire trung bình, hiệu quả/chi phí theo kênh; đề xuất 3 hành động phân bổ nguồn lực. Định dạng: bảng số liệu + 3 khuyến nghị. Dữ liệu: [DÁN/UPLOAD FILE]. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu.",
          "attachedFile": {
            "name": "du-lieu-tuyen-dung-mau.csv",
            "path": "/files/hr/du-lieu-tuyen-dung-mau.csv",
            "desc": "Dữ liệu phễu tuyển theo kênh. Tính tỉ lệ chuyển đổi & time-to-hire."
          }
        },
        {
          "id": "nhan-su-m15",
          "title": "Kế hoạch onboarding 30-60-90 ngày theo vị trí",
          "durationMin": 20,
          "level": 1,
          "skills": [
            "hr-onboarding-ld"
          ],
          "content": "Nhân viên quyết định ở hay đi thường trong 90 ngày đầu. Nhờ Claude dựng kế hoạch 30-60-90 ngày theo vị trí: mục tiêu từng mốc, người hỗ trợ, tài liệu cần đọc, cột mốc đánh giá. Có thể dựng riêng cho từng vị trí trong vài phút.",
          "learnings": [
            "Khung 30-60-90 ngày cho người mới",
            "Mục tiêu & cột mốc đánh giá rõ ràng",
            "Cá nhân hóa theo từng vị trí"
          ],
          "practicePrompt": "Bạn là chuyên viên L&D / phụ trách onboarding. Bối cảnh: vị trí [CHỨC DANH] tại [NGÀNH]. Yêu cầu: lập kế hoạch onboarding 30-60-90 ngày; mỗi mốc gồm mục tiêu, việc cần làm, người hỗ trợ, tiêu chí đánh giá. Định dạng: Artifact dạng bảng theo 3 mốc. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m16",
          "title": "Checklist nhận việc & email chào nhân viên mới",
          "durationMin": 15,
          "level": 1,
          "skills": [
            "hr-onboarding-ld",
            "hr-hanh-chinh-ops"
          ],
          "content": "Tạo checklist nhận việc đầy đủ (tài khoản, thiết bị, giấy tờ, đào tạo bắt buộc, người đỡ đầu) và bộ email: chào mừng trước ngày đầu, thông báo nội bộ giới thiệu thành viên mới, lịch tuần đầu. Mọi thứ dùng lại cho mọi đợt tuyển.",
          "learnings": [
            "Checklist nhận việc không sót đầu mục",
            "Email chào mừng tạo ấn tượng đầu",
            "Thông báo nội bộ giới thiệu người mới"
          ],
          "practicePrompt": "Bạn là chuyên viên nhân sự phụ trách onboarding. Bối cảnh: công ty [NGÀNH, QUY MÔ]. Yêu cầu: tạo checklist nhận việc ngày đầu + email chào mừng nhân viên mới + thông báo nội bộ giới thiệu. Định dạng: Artifact, mỗi phần tách rõ; giọng thân thiện, chuyên nghiệp. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m17",
          "title": "Biến tài liệu/SOP thành bài đào tạo + bài kiểm tra ngắn",
          "durationMin": 22,
          "level": 2,
          "skills": [
            "hr-onboarding-ld"
          ],
          "content": "Upload quy trình hoặc tài liệu khô khan, nhờ Claude biến thành bài học dễ hiểu: chia phần, thêm ví dụ, tóm tắt 'cần nhớ', kèm 5 câu trắc nghiệm kiểm tra hiểu bài + đáp án. Đây là cách nhân bản đào tạo mà không tốn người.",
          "learnings": [
            "Chuyển tài liệu thành bài học có cấu trúc",
            "Thêm ví dụ & phần 'cần nhớ'",
            "Sinh câu hỏi kiểm tra tự động"
          ],
          "practicePrompt": "Bạn là chuyên viên L&D thiết kế nội dung đào tạo. Bối cảnh: đây là tài liệu/SOP khô khan. Yêu cầu: biến thành một bài đào tạo dễ hiểu (chia mục, ví dụ, phần Cần nhớ) kèm 5 câu trắc nghiệm có đáp án và giải thích. Định dạng: bài học có cấu trúc + phần quiz cuối. Dữ liệu: [DÁN/UPLOAD TÀI LIỆU]. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu.",
          "attachedFile": {
            "name": "sop-quy-trinh-mau.md",
            "path": "/files/hr/sop-quy-trinh-mau.md",
            "desc": "SOP/quy trình HR khô khan. Biến thành bài đào tạo + câu hỏi kiểm tra."
          }
        },
        {
          "id": "nhan-su-m18",
          "title": "Thiết kế khung đào tạo & lộ trình phát triển kỹ năng",
          "durationMin": 22,
          "level": 2,
          "skills": [
            "hr-onboarding-ld",
            "hr-hieu-suat"
          ],
          "content": "Nhờ Claude dựng khung đào tạo theo cấp độ (mới → vững → chuyên gia) cho một vị trí: kỹ năng cần học, nguồn học, thời lượng, cách đánh giá. Gắn với khung năng lực để biết ai cần học gì. Phù hợp cả công ty nhỏ chưa có hệ thống L&D.",
          "learnings": [
            "Lộ trình phát triển theo cấp độ",
            "Gắn đào tạo với khung năng lực",
            "Khung L&D gọn cho công ty nhỏ"
          ],
          "practicePrompt": "Bạn là chuyên viên L&D. Bối cảnh: vị trí [CHỨC DANH], công ty nhỏ chưa có hệ thống đào tạo. Yêu cầu: thiết kế lộ trình phát triển kỹ năng qua 3 cấp độ (mới → vững → chuyên gia); mỗi cấp gồm kỹ năng, nội dung học, thời lượng, tiêu chí lên cấp. Định dạng: Artifact dạng bảng. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m19",
          "title": "Nội dung training 'newbie': kịch bản, slide outline, tài liệu",
          "durationMin": 20,
          "level": 2,
          "skills": [
            "hr-onboarding-ld"
          ],
          "content": "Trainer nội bộ dùng Claude để soạn nhanh: outline buổi đào tạo, kịch bản dẫn, dàn ý slide, handout, hoạt động tương tác. Nói rõ đối tượng & thời lượng → nhận giáo án hoàn chỉnh, chỉ cần tinh chỉnh theo phong cách.",
          "learnings": [
            "Soạn outline & kịch bản buổi đào tạo",
            "Dàn ý slide + handout đồng bộ",
            "Thêm hoạt động tương tác giữ năng lượng"
          ],
          "practicePrompt": "Bạn là trainer nội bộ. Bối cảnh: buổi đào tạo [CHỦ ĐỀ] cho [ĐỐI TƯỢNG], dài [X] phút. Yêu cầu: soạn giáo án gồm mục tiêu, outline theo phút, kịch bản dẫn, dàn ý slide, 1 hoạt động nhóm, handout tóm tắt. Định dạng: theo từng mục, dễ thực hiện. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m20",
          "title": "Trợ lý onboarding & FAQ tự trả lời bằng Project",
          "durationMin": 20,
          "level": 3,
          "skills": [
            "hr-onboarding-ld",
            "hr-tu-dong-hoa"
          ],
          "content": "Nạp sổ tay, chính sách, quy trình vào một Project → người mới (hoặc bạn) hỏi 'nghỉ phép tính sao', 'quy trình xin thiết bị' và Claude trả lời đúng theo tài liệu công ty. Giảm tải câu hỏi lặp cho HR. Bạn tổng hợp được bộ FAQ chuẩn từ chính các câu hỏi thường gặp.",
          "learnings": [
            "Project trả lời câu hỏi theo tài liệu công ty",
            "Giảm câu hỏi lặp đổ về HR",
            "Tự sinh bộ FAQ chuẩn"
          ],
          "practicePrompt": "Bạn là trợ lý onboarding, CHỈ trả lời dựa trên tài liệu công ty đã nạp vào Project. Bối cảnh: người mới hỏi về quy định/quy trình. Yêu cầu: trả lời đúng theo tài liệu, trích phần liên quan; nếu tài liệu không có thì nói rõ và gợi ý hỏi ai. Định dạng: câu trả lời ngắn gọn, có trích nguồn. Câu hỏi: [DÁN CÂU HỎI NGƯỜI MỚI]."
        },
        {
          "id": "nhan-su-m21",
          "title": "Giải thích bảng lương, phụ cấp, thuế TNCN & BHXH dễ hiểu",
          "durationMin": 18,
          "level": 1,
          "skills": [
            "hr-cb-luong"
          ],
          "content": "Nhờ Claude giải thích từng khoản trên phiếu lương bằng ngôn ngữ đời thường, hoặc soạn email giải thích cho nhân viên thắc mắc 'sao tháng này nhận ít hơn'. Cũng dùng để tự ôn cách tính thuế TNCN, BHXH theo bậc. Lưu ý luôn đối chiếu mức/luật mới nhất (web search) vì quy định thay đổi.",
          "learnings": [
            "Giải thích các khoản lương dễ hiểu",
            "Soạn email trả lời thắc mắc lương",
            "Đối chiếu quy định mới nhất"
          ],
          "practicePrompt": "Bạn là chuyên viên C&B. Bối cảnh: nhân viên thắc mắc vì sao lương thực nhận tháng này thấp hơn; các khoản như sau (đã làm giả). Yêu cầu: viết email giải thích rõ ràng, đồng cảm, đúng từng khoản; bật web search nếu cần đối chiếu quy định mới. Định dạng: email ≤180 từ, có tiêu đề. Dữ liệu: [DÁN CÁC KHOẢN ĐÃ LÀM GIẢ]. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu.",
          "attachedFile": {
            "name": "bang-luong-mau.xlsx",
            "path": "/files/hr/bang-luong-mau.xlsx",
            "desc": "Phiếu lương mẫu (đã làm giả). Giải thích từng khoản cho nhân viên."
          }
        },
        {
          "id": "nhan-su-m22",
          "title": "Dùng Claude (Excel/file) kiểm tra & dò lỗi bảng công, bảng lương",
          "durationMin": 25,
          "level": 2,
          "skills": [
            "hr-cb-luong",
            "hr-phan-tich-du-lieu"
          ],
          "content": "Nhiều học viên nói bảng lương / Excel phức tạp dùng AI chưa hiệu quả — mấu chốt là cách đưa bài toán. Upload file (đã ẩn tên), mô tả quy tắc tính, nhờ Claude dò ô sai logic, công lệch, công thức hỏng, và đề xuất công thức chuẩn. Claude in Excel làm việc trực tiếp trên file. Luôn đối chiếu lại bản gốc.",
          "learnings": [
            "Đưa bài toán Excel đúng cách cho AI",
            "Dò lỗi logic & công thức bảng lương",
            "Nhận công thức chuẩn để áp dụng"
          ],
          "practicePrompt": "Bạn là chuyên viên C&B kiêm rà soát số liệu. Bối cảnh: đây là bảng chấm công + quy tắc tính lương (đã ẩn danh). Yêu cầu: dò các dòng bất thường (công âm, vượt định mức, tăng ca không tính tiền, mã trùng, thực nhận lệch công thức); liệt kê lỗi nghi ngờ và đề xuất công thức đúng. Định dạng: bảng (Dòng | Lỗi nghi ngờ | Đề xuất). Dữ liệu: [UPLOAD FILE]. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu.",
          "attachedFile": {
            "name": "bang-cong-luong-mau.csv",
            "path": "/files/hr/bang-cong-luong-mau.csv",
            "desc": "Bảng chấm công + lương ẩn danh. Dò lỗi logic & công thức với Claude."
          }
        },
        {
          "id": "nhan-su-m23",
          "title": "Soạn & rà hợp đồng lao động, phụ lục, quyết định theo luật VN",
          "durationMin": 22,
          "level": 2,
          "skills": [
            "hr-cb-luong",
            "hr-quan-he-chinh-sach"
          ],
          "content": "Claude soạn nháp hợp đồng lao động, phụ lục, quyết định bổ nhiệm/điều chuyển theo cấu trúc chuẩn, và rà soát hợp đồng để chỉ ra điều khoản thiếu/rủi ro. CẢNH BÁO: đây là nháp tham khảo — phải đối chiếu Bộ luật Lao động hiện hành và để bộ phận pháp lý duyệt trước khi ký.",
          "learnings": [
            "Soạn nháp văn bản lao động đúng cấu trúc",
            "Rà điều khoản thiếu/rủi ro",
            "Ranh giới pháp lý: luôn để người có thẩm quyền duyệt"
          ],
          "practicePrompt": "Bạn là chuyên viên nhân sự soạn thảo văn bản lao động (nháp tham khảo, không thay luật sư). Bối cảnh: hợp đồng lao động xác định thời hạn 12 tháng cho vị trí [CHỨC DANH], theo cấu trúc chuẩn VN. Yêu cầu: soạn nháp, đánh dấu [chỗ cần điền] và ghi chú điều khoản cần pháp lý rà lại. Định dạng: văn bản có mục rõ + phần Ghi chú pháp lý cuối. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m24",
          "title": "Thiết kế cơ cấu lương 3P & khung phúc lợi",
          "durationMin": 22,
          "level": 2,
          "skills": [
            "hr-cb-luong"
          ],
          "content": "Nhờ Claude phác khung lương 3P (Position–Person–Performance), dải lương theo cấp bậc, và gói phúc lợi phù hợp ngân sách & ngành. Dùng như bản nháp để thảo luận với ban lãnh đạo, không phải con số cuối — cần dữ liệu thị trường thật để chốt.",
          "learnings": [
            "Hiểu & phác khung lương 3P",
            "Thiết kế dải lương theo cấp bậc",
            "Gói phúc lợi theo ngân sách"
          ],
          "practicePrompt": "Bạn là chuyên gia C&B. Bối cảnh: công ty [NGÀNH, QUY MÔ] người. Yêu cầu: phác khung lương 3P (nguyên tắc, yếu tố P1/P2/P3, ví dụ dải lương 4 cấp bậc) và 5 phúc lợi nên có; nêu rõ giả định cần kiểm chứng bằng dữ liệu thị trường. Định dạng: theo mục, có bảng dải lương. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m25",
          "title": "Khảo sát & benchmark lương thị trường bằng web search",
          "durationMin": 20,
          "level": 2,
          "skills": [
            "hr-cb-luong",
            "hr-phan-tich-du-lieu"
          ],
          "content": "Dùng Claude web search để tổng hợp khoảng lương thị trường cho một vị trí theo thành phố/ngành từ các nguồn công khai, rồi so với khung công ty để biết đang trả cao/thấp. Kết quả là ước lượng tham khảo — ghi rõ nguồn & ngày để báo cáo lên cấp trên.",
          "learnings": [
            "Tổng hợp khoảng lương thị trường",
            "So sánh khung công ty vs thị trường",
            "Trích nguồn & nêu giới hạn dữ liệu"
          ],
          "practicePrompt": "Bạn là chuyên viên C&B nghiên cứu thị trường lương. Bối cảnh: vị trí [CHỨC DANH] tại [THÀNH PHỐ]; công ty đang trả [X]. Yêu cầu: dùng web search tổng hợp khoảng lương hiện tại (min–trung vị–max) từ nguồn công khai, nêu nguồn và ngày, so sánh với mức công ty và nhận xét. Định dạng: bảng + đoạn nhận xét; ghi rõ giới hạn dữ liệu. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m26",
          "title": "Viết công thức Excel tính & giải trình lương cùng Claude",
          "durationMin": 22,
          "level": 3,
          "skills": [
            "hr-cb-luong",
            "hr-tu-dong-hoa"
          ],
          "content": "Mô tả cách tính (lương theo công, tăng ca, phụ cấp, khấu trừ) → Claude viết công thức Excel/Google Sheets sẵn dán, giải thích từng phần, và tạo bảng tính mẫu. Bạn tự động hóa khâu tính toán mà không cần biết hàm phức tạp.",
          "learnings": [
            "Mô tả logic lương để Claude ra công thức",
            "Hiểu công thức để tự bảo trì",
            "Tạo bảng tính lương mẫu tái dùng"
          ],
          "practicePrompt": "Bạn là chuyên gia Excel cho C&B. Bối cảnh: tôi cần công thức tính lương gồm lương cơ bản theo ngày công thực tế + tăng ca 150% + phụ cấp [X] − BHXH [tỉ lệ] − tạm ứng. Yêu cầu: viết công thức Excel cho từng cột và giải thích ngắn từng phần. Định dạng: bảng (Cột | Công thức | Giải thích). Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu.",
          "attachedFile": {
            "name": "bang-luong-mau.xlsx",
            "path": "/files/hr/bang-luong-mau.xlsx",
            "desc": "Tham khảo cấu trúc bảng lương để viết công thức Excel tính lương."
          }
        },
        {
          "id": "nhan-su-m27",
          "title": "Viết nhận xét đánh giá hiệu suất khách quan, xây dựng",
          "durationMin": 18,
          "level": 1,
          "skills": [
            "hr-hieu-suat"
          ],
          "content": "Đưa Claude vài gạch đầu dòng về kết quả & hành vi của nhân viên → nhận bản nhận xét cân bằng (ghi nhận + góp ý phát triển), ngôn ngữ chuyên nghiệp, tránh cảm tính. Giúp quản lý viết review nhanh và công bằng hơn.",
          "learnings": [
            "Biến gạch đầu dòng thành nhận xét hoàn chỉnh",
            "Cân bằng ghi nhận & góp ý",
            "Ngôn ngữ khách quan, hướng phát triển"
          ],
          "practicePrompt": "Bạn là quản lý trực tiếp / HR tại doanh nghiệp VN. Bối cảnh: nhân viên [VỊ TRÍ] với thành tích [..], điểm cần cải thiện [..], hành vi [..]. Yêu cầu: viết nhận xét đánh giá cuối kỳ cân bằng ghi nhận và góp ý, kèm 2-3 gợi ý phát triển cụ thể. Định dạng: 3 đoạn (Ghi nhận / Cần cải thiện / Định hướng), ≤250 từ, giọng chuyên nghiệp, xây dựng. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m28",
          "title": "Thiết kế KPI/OKR theo phòng ban & vị trí",
          "durationMin": 22,
          "level": 2,
          "skills": [
            "hr-hieu-suat"
          ],
          "content": "Nhờ Claude đề xuất KPI/OKR đo được, gắn mục tiêu công ty, tránh chỉ tiêu 'làm cho có'. Cho từng vị trí: 3–5 chỉ tiêu, cách đo, trọng số, mục tiêu. Dùng làm bản nháp để quản lý phòng tinh chỉnh.",
          "learnings": [
            "Phân biệt KPI tốt vs hình thức",
            "Đặt chỉ tiêu đo được, có trọng số",
            "Gắn mục tiêu cá nhân với công ty"
          ],
          "practicePrompt": "Bạn là HRBP thiết kế hệ thống đo lường. Bối cảnh: vị trí [CHỨC DANH], gắn mục tiêu công ty. Yêu cầu: đề xuất 3-5 KPI/OKR đo được; mỗi chỉ tiêu có cách đo, trọng số, mục tiêu quý; cảnh báo chỉ tiêu dễ bị lách. Định dạng: bảng + ghi chú cảnh báo. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m29",
          "title": "Khung năng lực (competency framework) theo vị trí",
          "durationMin": 20,
          "level": 2,
          "skills": [
            "hr-hieu-suat",
            "hr-onboarding-ld"
          ],
          "content": "Claude dựng khung năng lực: năng lực cốt lõi + chuyên môn cho vị trí, mô tả hành vi theo 4–5 mức thành thạo. Dùng cho tuyển dụng, đánh giá, và lộ trình đào tạo — một nền tảng nhiều mục đích.",
          "learnings": [
            "Xác định năng lực cốt lõi & chuyên môn",
            "Mô tả hành vi theo mức thành thạo",
            "Tái dùng cho tuyển dụng & đào tạo"
          ],
          "practicePrompt": "Bạn là chuyên gia khung năng lực. Bối cảnh: vị trí [CHỨC DANH]. Yêu cầu: dựng khung năng lực gồm 4 năng lực cốt lõi + 3 chuyên môn, mỗi năng lực mô tả hành vi ở 4 mức (cơ bản → xuất sắc), dùng được cho cả tuyển dụng và đào tạo. Định dạng: Artifact dạng bảng. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m30",
          "title": "Chuẩn bị & dẫn dắt 1:1, phản hồi và kế hoạch cải thiện (PIP)",
          "durationMin": 20,
          "level": 2,
          "skills": [
            "hr-hieu-suat",
            "hr-quan-he-chinh-sach"
          ],
          "content": "Claude giúp soạn agenda 1:1, gợi câu hỏi mở, cách đưa phản hồi khó theo mô hình SBI, và dựng kế hoạch cải thiện hiệu suất (PIP) công bằng, rõ mục tiêu & thời hạn. Hỗ trợ quản lý xử lý tình huống nhạy cảm đúng mực.",
          "learnings": [
            "Agenda & câu hỏi cho buổi 1:1",
            "Đưa phản hồi khó theo mô hình SBI",
            "Dựng PIP công bằng, đo được"
          ],
          "practicePrompt": "Bạn là HRBP hỗ trợ quản lý xử lý hiệu suất. Bối cảnh: nhân viên [mô tả vấn đề hiệu suất]. Yêu cầu: soạn (1) agenda buổi 1:1, (2) cách mở lời phản hồi theo mô hình SBI, (3) khung PIP 30 ngày với mục tiêu đo được. Định dạng: 3 phần tách rõ, giọng tôn trọng, hướng hỗ trợ. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m31",
          "title": "Tổng hợp & phân tích đánh giá 360 độ",
          "durationMin": 22,
          "level": 2,
          "skills": [
            "hr-hieu-suat",
            "hr-phan-tich-du-lieu"
          ],
          "content": "Upload kết quả 360 (đã ẩn danh người đánh giá), Claude tổng hợp chủ đề lặp lại, mâu thuẫn giữa các nguồn, điểm mạnh/khoảng trống, và gợi ý phát triển — biến hàng chục phản hồi rời thành báo cáo dùng được trong buổi feedback.",
          "learnings": [
            "Tổng hợp phản hồi 360 thành chủ đề",
            "Phát hiện mâu thuẫn giữa các nguồn",
            "Gợi ý phát triển cá nhân"
          ],
          "practicePrompt": "Bạn là chuyên gia phát triển nhân sự. Bối cảnh: đây là kết quả 360 độ (ẩn danh người đánh giá) của một nhân viên. Yêu cầu: tổng hợp 3 điểm mạnh nổi bật, 3 khoảng trống, mâu thuẫn giữa các nhóm đánh giá, 3 gợi ý phát triển. Định dạng: theo từng mục, ngắn gọn. Dữ liệu: [DÁN/UPLOAD KẾT QUẢ 360]. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu.",
          "attachedFile": {
            "name": "ket-qua-360-mau.md",
            "path": "/files/hr/ket-qua-360-mau.md",
            "desc": "Kết quả 360 độ (ẩn danh người đánh giá). Tổng hợp điểm mạnh & khoảng trống."
          }
        },
        {
          "id": "nhan-su-m32",
          "title": "Phân tích kết quả đánh giá toàn công ty → insight cho lãnh đạo",
          "durationMin": 22,
          "level": 3,
          "skills": [
            "hr-hieu-suat",
            "hr-phan-tich-du-lieu"
          ],
          "content": "Upload bảng kết quả đánh giá toàn công ty, nhờ Claude tìm phân bố điểm, phòng ban mạnh/yếu, tương quan với thâm niên, và viết bản tóm tắt 1 trang cho ban lãnh đạo kèm khuyến nghị. Dữ liệu phải ẩn danh ở mức cá nhân.",
          "learnings": [
            "Đọc phân bố & xu hướng đánh giá",
            "Tìm tương quan đáng chú ý",
            "Viết tóm tắt điều hành 1 trang"
          ],
          "practicePrompt": "Bạn là chuyên viên People Analytics. Bối cảnh: đây là bảng điểm đánh giá toàn công ty (ẩn danh). Yêu cầu: phân tích phân bố điểm, so sánh phòng ban, tương quan với thâm niên; viết tóm tắt cho ban lãnh đạo kèm 3 khuyến nghị. Định dạng: tóm tắt điều hành 1 trang + bảng số liệu chính. Dữ liệu: [DÁN/UPLOAD BẢNG ĐIỂM]. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu.",
          "attachedFile": {
            "name": "danh-gia-mau.xlsx",
            "path": "/files/hr/danh-gia-mau.xlsx",
            "desc": "Bảng điểm đánh giá toàn công ty (ẩn danh). Phân tích phân bố & insight cho lãnh đạo."
          }
        },
        {
          "id": "nhan-su-m33",
          "title": "Soạn chính sách & nội quy nội bộ rõ ràng",
          "durationMin": 18,
          "level": 1,
          "skills": [
            "hr-quan-he-chinh-sach"
          ],
          "content": "Mô tả ý định (vd chính sách làm việc từ xa, nghỉ phép, thưởng) → Claude soạn chính sách có cấu trúc: mục đích, phạm vi, quy định, ngoại lệ, hiệu lực. Ngôn ngữ rõ, ít gây hiểu nhầm. Rà lại theo luật & văn hóa công ty trước khi ban hành.",
          "learnings": [
            "Cấu trúc một chính sách rõ ràng",
            "Ngôn ngữ tránh hiểu nhầm",
            "Liệt kê ngoại lệ & hiệu lực"
          ],
          "practicePrompt": "Bạn là chuyên viên phụ trách chính sách nhân sự. Bối cảnh: công ty [NGÀNH, QUY MÔ], chính sách [TÊN, vd làm việc từ xa]. Yêu cầu: soạn chính sách rõ ràng gồm mục đích, phạm vi áp dụng, quy định chi tiết, ngoại lệ, ngày hiệu lực; ngôn ngữ tránh hiểu nhầm. Định dạng: Artifact có mục đánh số. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m34",
          "title": "Xây sổ tay nhân viên (employee handbook)",
          "durationMin": 25,
          "level": 2,
          "skills": [
            "hr-quan-he-chinh-sach",
            "hr-onboarding-ld"
          ],
          "content": "Nhờ Claude dựng khung sổ tay nhân viên đầy đủ chương mục (văn hóa, giờ làm, lương–phúc lợi, quy tắc ứng xử, an toàn, quy trình), rồi viết từng chương theo bối cảnh công ty. Dùng Project để giữ nhất quán giọng văn xuyên suốt.",
          "learnings": [
            "Khung chương mục sổ tay chuẩn",
            "Viết từng chương theo bối cảnh",
            "Giữ nhất quán bằng Project"
          ],
          "practicePrompt": "Bạn là chuyên viên nhân sự soạn sổ tay, dùng tài liệu công ty trong Project để giữ giọng nhất quán. Bối cảnh: công ty [NGÀNH, QUY MÔ]. Yêu cầu: đề xuất mục lục sổ tay nhân viên đầy đủ, rồi viết chi tiết chương [TÊN CHƯƠNG]. Định dạng: mục lục + nội dung chương; giọng thân thiện nhưng chuyên nghiệp. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m35",
          "title": "Xử lý tình huống nhạy cảm: kỷ luật, khiếu nại",
          "durationMin": 20,
          "level": 2,
          "skills": [
            "hr-quan-he-chinh-sach"
          ],
          "content": "Claude giúp soạn biên bản, thư nhắc nhở, quyết định kỷ luật đúng trình tự, và kịch bản cho buổi trao đổi khó. Trung lập, dựa sự việc, giảm rủi ro pháp lý & cảm xúc. CẢNH BÁO: tình huống kỷ luật/chấm dứt HĐLĐ phải tuân thủ đúng quy trình luật và có pháp lý duyệt.",
          "learnings": [
            "Soạn văn bản kỷ luật đúng trình tự",
            "Kịch bản cho buổi trao đổi khó",
            "Giữ trung lập, giảm rủi ro pháp lý"
          ],
          "practicePrompt": "Bạn là chuyên viên quan hệ lao động (văn bản là nháp, cần pháp lý duyệt). Bối cảnh: một nhân viên [mô tả vi phạm, đã ẩn danh]. Yêu cầu: soạn biên bản ghi nhận sự việc + thư nhắc nhở lần 1 đúng trình tự, ngôn ngữ trung lập dựa sự việc; ghi chú điểm cần pháp lý rà. Định dạng: 2 văn bản tách rõ + phần Ghi chú pháp lý. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m36",
          "title": "Khảo sát mức độ gắn kết & phân tích kết quả",
          "durationMin": 22,
          "level": 2,
          "skills": [
            "hr-quan-he-chinh-sach",
            "hr-phan-tich-du-lieu"
          ],
          "content": "Claude soạn bộ câu hỏi khảo sát gắn kết/eNPS phù hợp công ty, rồi sau khi thu phản hồi (upload), tổng hợp điểm, chủ đề tích cực/tiêu cực từ câu trả lời mở, và đề xuất hành động. Biến khảo sát thành quyết định thực tế.",
          "learnings": [
            "Thiết kế khảo sát gắn kết/eNPS",
            "Phân tích câu trả lời mở thành chủ đề",
            "Đề xuất hành động từ kết quả"
          ],
          "practicePrompt": "Bạn là chuyên viên gắn kết nhân sự. Bối cảnh: công ty [NGÀNH]. Yêu cầu: soạn khảo sát gắn kết 12 câu (thang Likert + 2 câu mở); sau khi tôi upload kết quả, tổng hợp điểm và chủ đề tích cực/tiêu cực. Định dạng: bộ câu hỏi theo nhóm; phần phân tích để sau. Dữ liệu (bước 2): [UPLOAD KẾT QUẢ]. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu.",
          "attachedFile": {
            "name": "ket-qua-khao-sat-gan-ket-mau.csv",
            "path": "/files/hr/ket-qua-khao-sat-gan-ket-mau.csv",
            "desc": "Kết quả khảo sát gắn kết (Likert). Kèm file cau-mo-mau.txt cho câu trả lời mở."
          }
        },
        {
          "id": "nhan-su-m37",
          "title": "Truyền thông nội bộ & quản trị văn hóa",
          "durationMin": 18,
          "level": 2,
          "skills": [
            "hr-quan-he-chinh-sach",
            "hr-hanh-chinh-ops"
          ],
          "content": "Claude viết thông báo nội bộ, bản tin, nội dung vinh danh, lời chúc sự kiện, thông điệp dịp lễ — đúng giọng văn hóa công ty. Lập lịch nội dung truyền thông nội bộ hằng tháng để giữ kết nối đội ngũ.",
          "learnings": [
            "Viết thông báo & bản tin nội bộ",
            "Nội dung vinh danh, gắn kết",
            "Lịch truyền thông nội bộ hằng tháng"
          ],
          "practicePrompt": "Bạn là chuyên viên truyền thông nội bộ. Bối cảnh: [SỰ KIỆN/CHÍNH SÁCH], giọng [văn hóa công ty]. Yêu cầu: viết thông báo nội bộ cho toàn công ty, có tiêu đề thu hút và lời kêu gọi hành động rõ. Định dạng: Artifact, ≤200 từ. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m38",
          "title": "Soạn thông điệp xử lý thay đổi tổ chức / khủng hoảng nhân sự",
          "durationMin": 20,
          "level": 3,
          "skills": [
            "hr-quan-he-chinh-sach"
          ],
          "content": "Khi có tái cấu trúc, cắt giảm, sáp nhập hay sự cố, Claude giúp dựng kế hoạch truyền thông: thông điệp cho từng nhóm (ở lại, rời đi, quản lý), FAQ lường trước câu hỏi khó, kịch bản họp. Đồng cảm, minh bạch, giảm tổn thương niềm tin.",
          "learnings": [
            "Thông điệp riêng cho từng nhóm",
            "FAQ lường trước câu hỏi khó",
            "Giữ minh bạch & đồng cảm"
          ],
          "practicePrompt": "Bạn là cố vấn truyền thông nhân sự trong thay đổi tổ chức. Bối cảnh: công ty sắp [thay đổi tổ chức]. Yêu cầu: dựng kế hoạch truyền thông nội bộ gồm thông điệp chính, phiên bản cho 3 nhóm (ở lại / bị ảnh hưởng / quản lý), FAQ 8 câu khó, kịch bản họp thông báo. Định dạng: theo từng phần; giọng minh bạch, đồng cảm. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m39",
          "title": "Soạn email & văn bản hành chính HR trong 2 phút",
          "durationMin": 15,
          "level": 1,
          "skills": [
            "hr-hanh-chinh-ops"
          ],
          "content": "Email thông báo, nhắc việc, mời họp, trả lời nhân viên — nói ý chính, Claude viết bản hoàn chỉnh đúng giọng & độ dài. Học cách ra lệnh ngắn (giọng, độ dài, đối tượng) để khỏi sửa nhiều.",
          "learnings": [
            "Ra lệnh ngắn cho email chuẩn",
            "Điều chỉnh giọng & độ dài",
            "Mẫu mở đầu/kết thư chuyên nghiệp"
          ],
          "practicePrompt": "Bạn là chuyên viên hành chính nhân sự. Bối cảnh: email [mục đích] gửi [đối tượng], giọng [trang trọng/thân thiện], ý chính [gạch đầu dòng]. Yêu cầu: viết email hoàn chỉnh, có tiêu đề và lời kêu gọi rõ. Định dạng: ≤150 từ, sẵn gửi. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m40",
          "title": "Bộ mẫu thư/quyết định/thông báo dùng lại (template hệ thống)",
          "durationMin": 18,
          "level": 1,
          "skills": [
            "hr-hanh-chinh-ops",
            "hr-tu-dong-hoa"
          ],
          "content": "Tạo một lần bộ template hay dùng (quyết định bổ nhiệm, thông báo nghỉ lễ, xác nhận công tác, thư cảm ơn) với [chỗ điền], lưu trong Project. Lần sau chỉ điền biến — chuẩn hóa văn bản toàn phòng HR.",
          "learnings": [
            "Dựng template có chỗ điền",
            "Lưu & tái dùng qua Project",
            "Chuẩn hóa văn bản toàn phòng"
          ],
          "practicePrompt": "Bạn là chuyên viên hành chính nhân sự chuẩn hóa văn bản. Bối cảnh: công ty [NGÀNH, QUY MÔ]. Yêu cầu: tạo bộ 5 template văn bản HR hay dùng (bạn đề xuất loại) với [chỗ điền] rõ ràng và hướng dẫn dùng cho mỗi mẫu. Định dạng: Artifact để lưu vào Project. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m41",
          "title": "Chuẩn hóa quy trình HR (SOP) thành sơ đồ & checklist",
          "durationMin": 22,
          "level": 2,
          "skills": [
            "hr-hanh-chinh-ops",
            "hr-onboarding-ld"
          ],
          "content": "Mô tả quy trình đang làm (tuyển dụng, onboarding, nghỉ phép…), Claude chuẩn hóa thành SOP: các bước, người phụ trách (RACI), biểu mẫu, sơ đồ luồng, checklist. 'Thiết lập quy trình HR' là nhu cầu trực tiếp của học viên.",
          "learnings": [
            "Biến quy trình thực tế thành SOP",
            "Phân vai RACI rõ ràng",
            "Sơ đồ luồng + checklist kèm theo"
          ],
          "practicePrompt": "Bạn là chuyên gia chuẩn hóa quy trình HR. Bối cảnh: đây là mô tả quy trình [TÊN] đang làm (lộn xộn). Yêu cầu: chuẩn hóa thành SOP gồm mục đích, các bước, phân vai RACI, biểu mẫu cần, checklist và mô tả sơ đồ luồng. Định dạng: Artifact có mục rõ. Dữ liệu: [DÁN/UPLOAD MÔ TẢ QUY TRÌNH]. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu.",
          "attachedFile": {
            "name": "sop-quy-trinh-mau.md",
            "path": "/files/hr/sop-quy-trinh-mau.md",
            "desc": "Mô tả quy trình HR lộn xộn. Chuẩn hóa thành SOP + RACI + checklist."
          }
        },
        {
          "id": "nhan-su-m42",
          "title": "Tóm tắt biên bản họp, chính sách dài & tài liệu pháp lý",
          "durationMin": 18,
          "level": 2,
          "skills": [
            "hr-hanh-chinh-ops",
            "hr-phan-tich-du-lieu"
          ],
          "content": "Tận dụng long-context: upload tài liệu dài (biên bản họp, thông tư, hợp đồng) → Claude tóm tắt ý chính, đầu việc kèm người phụ trách & hạn, điểm cần lưu ý. Đọc 30 trang trong 1 phút thay vì cả buổi.",
          "learnings": [
            "Tóm tắt tài liệu dài giữ ý quan trọng",
            "Trích đầu việc + người + hạn",
            "Đánh dấu điểm rủi ro cần lưu ý"
          ],
          "practicePrompt": "Bạn là trợ lý hành chính nhân sự. Bối cảnh: đây là biên bản họp thô. Yêu cầu: tóm tắt thành 5 quyết định chính, bảng đầu việc (Việc | Người | Hạn), và 3 điểm cần theo dõi. Định dạng: phần tóm tắt + bảng đầu việc. Dữ liệu: [DÁN/UPLOAD BIÊN BẢN]. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu.",
          "attachedFile": {
            "name": "bien-ban-hop-mau.txt",
            "path": "/files/hr/bien-ban-hop-mau.txt",
            "desc": "Biên bản họp thô. Tóm tắt quyết định, đầu việc & người phụ trách."
          }
        },
        {
          "id": "nhan-su-m43",
          "title": "Quản lý hồ sơ nhân sự: cấu trúc, đặt tên & checklist tuân thủ",
          "durationMin": 18,
          "level": 2,
          "skills": [
            "hr-hanh-chinh-ops"
          ],
          "content": "Claude đề xuất cây thư mục hồ sơ nhân sự, quy ước đặt tên file, checklist giấy tờ bắt buộc theo vòng đời nhân viên (tuyển → ký HĐ → onboarding → nghỉ việc), và bảng theo dõi hồ sơ thiếu. 'Quản lý hồ sơ nhân sự' là nhu cầu được nêu trực tiếp.",
          "learnings": [
            "Cấu trúc & đặt tên hồ sơ khoa học",
            "Checklist giấy tờ theo vòng đời",
            "Bảng theo dõi hồ sơ còn thiếu"
          ],
          "practicePrompt": "Bạn là chuyên viên hành chính nhân sự phụ trách hồ sơ. Bối cảnh: công ty [QUY MÔ] người. Yêu cầu: đề xuất hệ thống quản lý hồ sơ nhân sự gồm cây thư mục, quy ước đặt tên file, checklist giấy tờ bắt buộc theo từng giai đoạn, và bảng theo dõi hồ sơ thiếu. Định dạng: Artifact, có ví dụ tên file. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m44",
          "title": "Trợ lý trả lời câu hỏi HR lặp lại (policy Q&A) bằng Project",
          "durationMin": 20,
          "level": 3,
          "skills": [
            "hr-hanh-chinh-ops",
            "hr-tu-dong-hoa"
          ],
          "content": "Nạp toàn bộ chính sách vào Project, viết Custom Instructions 'chỉ trả lời theo tài liệu, không bịa, không có thì nói không có' → trở thành tổng đài tự trả lời câu hỏi nhân viên (phép, lương, quy trình). Giảm mạnh câu hỏi lặp đổ về HR.",
          "learnings": [
            "Cấu hình Project trả lời theo tài liệu",
            "Chống bịa: chỉ dựa tài liệu nội bộ",
            "Giảm tải câu hỏi lặp cho HR"
          ],
          "practicePrompt": "Bạn là trợ lý HR, CHỈ trả lời dựa trên chính sách công ty đã nạp vào Project, không bịa. Bối cảnh: nhân viên hỏi về phép/lương/quy trình. Yêu cầu: trả lời đúng theo tài liệu, trích phần liên quan; nếu không có thì nói rõ. Định dạng: câu trả lời ngắn, có trích dẫn. Câu hỏi: [DÁN CÂU HỎI]."
        },
        {
          "id": "nhan-su-m45",
          "title": "Đọc & hiểu số liệu HR: turnover, headcount, tỉ lệ tuyển",
          "durationMin": 18,
          "level": 1,
          "skills": [
            "hr-phan-tich-du-lieu"
          ],
          "content": "Bài nền phân tích: Claude giải thích các chỉ số HR cốt lõi (tỉ lệ nghỉ việc, headcount, time-to-hire, tỉ lệ giữ chân, cost-per-hire) bằng ngôn ngữ dễ hiểu và cách tính. Hiểu chỉ số trước, phân tích sau.",
          "learnings": [
            "Ý nghĩa các chỉ số HR cốt lõi",
            "Cách tính & ngưỡng tham khảo",
            "Chỉ số nào quan trọng với công ty bạn"
          ],
          "practicePrompt": "Bạn là chuyên viên People Analytics, giải thích cho người mới. Bối cảnh: tôi chưa quen các chỉ số HR. Yêu cầu: giải thích turnover, retention, time-to-hire, cost-per-hire, absenteeism — định nghĩa, công thức, ví dụ số, ngưỡng nào đáng lo. Định dạng: bảng (Chỉ số | Công thức | Ví dụ | Ngưỡng lưu ý). Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m46",
          "title": "Upload Excel nhân sự → Claude phân tích & tìm bất thường",
          "durationMin": 25,
          "level": 2,
          "skills": [
            "hr-phan-tich-du-lieu"
          ],
          "content": "Upload bảng dữ liệu nhân sự (ẩn danh), nhờ Claude tính các chỉ số, phát hiện bất thường (phòng nghỉ việc cao, lệch giới, khoảng trống dữ liệu) và trả lời câu hỏi bằng lời thường: 'phòng nào nghỉ nhiều nhất quý này?'. Học viên muốn 'dựa vào data ra insight' — đây là bài lõi.",
          "learnings": [
            "Đưa file & câu hỏi đúng cách",
            "Đọc bất thường & nguyên nhân khả dĩ",
            "Hỏi đáp dữ liệu bằng ngôn ngữ thường"
          ],
          "practicePrompt": "Bạn là chuyên viên phân tích dữ liệu nhân sự. Bối cảnh: đây là bảng nhân sự quý này (ẩn danh). Yêu cầu: tính turnover theo phòng, headcount đầu/cuối kỳ, và chỉ ra 3 bất thường đáng chú ý kèm giả thuyết nguyên nhân; sẵn sàng trả lời thêm câu hỏi của tôi bằng lời thường. Định dạng: bảng số liệu + phần nhận xét. Dữ liệu: [UPLOAD FILE]. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu.",
          "attachedFile": {
            "name": "nhan-su-mau.xlsx",
            "path": "/files/hr/nhan-su-mau.xlsx",
            "desc": "Bảng nhân sự quý (ẩn danh). Phân tích turnover & bất thường."
          }
        },
        {
          "id": "nhan-su-m47",
          "title": "Báo cáo nhân sự định kỳ tự động: mẫu + tóm tắt insight",
          "durationMin": 22,
          "level": 2,
          "skills": [
            "hr-phan-tich-du-lieu",
            "hr-hanh-chinh-ops"
          ],
          "content": "Dựng mẫu báo cáo nhân sự tháng/quý một lần, lần sau chỉ dán số liệu mới → Claude điền và viết phần 'điểm nổi bật' bằng lời. Báo cáo nhanh chóng là nhu cầu lặp lại của nhiều học viên. Nạp mẫu vào Project để chuẩn hóa.",
          "learnings": [
            "Dựng mẫu báo cáo tái dùng",
            "Tự động sinh phần tóm tắt insight",
            "Chuẩn hóa báo cáo qua Project"
          ],
          "practicePrompt": "Bạn là chuyên viên phân tích nhân sự. Bối cảnh: báo cáo nhân sự hằng tháng. Yêu cầu: tạo mẫu báo cáo (headcount, tuyển/nghỉ, turnover, đào tạo, điểm nổi bật); sau khi tôi dán số liệu, điền vào và viết tóm tắt điều hành 5 dòng. Định dạng: mẫu báo cáo tái dùng + phần tóm tắt. Dữ liệu (bước 2): [DÁN/UPLOAD SỐ LIỆU]. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu.",
          "attachedFile": {
            "name": "nhan-su-mau.xlsx",
            "path": "/files/hr/nhan-su-mau.xlsx",
            "desc": "Dữ liệu nhân sự để tạo mẫu báo cáo định kỳ + tóm tắt insight."
          }
        },
        {
          "id": "nhan-su-m48",
          "title": "Dashboard & biểu đồ HR bằng Artifacts",
          "durationMin": 22,
          "level": 2,
          "skills": [
            "hr-phan-tich-du-lieu",
            "hr-tu-dong-hoa"
          ],
          "content": "Nhờ Claude tạo dashboard trực quan (biểu đồ headcount, turnover, phễu tuyển) dưới dạng Artifact tương tác từ dữ liệu bạn đưa — không cần biết code. Dùng để trình bày cho lãnh đạo đẹp & nhanh.",
          "learnings": [
            "Tạo biểu đồ HR không cần code",
            "Dashboard tương tác bằng Artifact",
            "Chuẩn bị số liệu cho trực quan hóa"
          ],
          "practicePrompt": "Bạn là chuyên viên trực quan hóa dữ liệu HR. Bối cảnh: đây là dữ liệu nhân sự. Yêu cầu: tạo dashboard HR dạng Artifact gồm biểu đồ headcount theo phòng, turnover 6 tháng, phễu tuyển dụng, cho phép lọc theo phòng. Định dạng: Artifact tương tác. Dữ liệu: [DÁN/UPLOAD DỮ LIỆU]. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu.",
          "attachedFile": {
            "name": "headcount-mau.xlsx",
            "path": "/files/hr/headcount-mau.xlsx",
            "desc": "Dữ liệu headcount & turnover. Tạo dashboard HR bằng Artifact."
          }
        },
        {
          "id": "nhan-su-m49",
          "title": "Headcount planning & dự báo nhu cầu nhân sự (Claude in Excel)",
          "durationMin": 22,
          "level": 3,
          "skills": [
            "hr-phan-tich-du-lieu",
            "hr-cb-luong"
          ],
          "content": "Dùng Claude in Excel để dựng mô hình kế hoạch nhân sự: dự báo headcount theo tăng trưởng, chi phí lương tương ứng, kịch bản tuyển theo quý. Theo đúng hướng dẫn headcount planning của Claude cho HR. Mọi giả định nêu rõ để lãnh đạo điều chỉnh.",
          "learnings": [
            "Mô hình dự báo headcount theo kịch bản",
            "Gắn kế hoạch tuyển với chi phí lương",
            "Nêu rõ giả định để ra quyết định"
          ],
          "practicePrompt": "Bạn là chuyên viên hoạch định nhân sự, làm việc trên bảng tính (Claude in Excel). Bối cảnh: công ty [QUY MÔ] người, tăng trưởng [X]%. Yêu cầu: dựng mô hình headcount planning 12 tháng (dự báo nhân sự theo phòng, chi phí lương ước tính, kế hoạch tuyển theo quý, 2 kịch bản); nêu rõ giả định. Định dạng: bảng mô hình + phần giả định. Dữ liệu: [UPLOAD FILE]. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu.",
          "attachedFile": {
            "name": "headcount-cost-mau.csv",
            "path": "/files/hr/headcount-cost-mau.csv",
            "desc": "Headcount + chi phí lương theo phòng. Dự báo kế hoạch nhân sự 12 tháng."
          }
        },
        {
          "id": "nhan-su-m50",
          "title": "Phân tích nguyên nhân nghỉ việc & đề xuất giữ chân",
          "durationMin": 22,
          "level": 3,
          "skills": [
            "hr-phan-tich-du-lieu",
            "hr-quan-he-chinh-sach"
          ],
          "content": "Kết hợp dữ liệu nghỉ việc + nội dung phỏng vấn thôi việc (ẩn danh), Claude tìm mẫu hình (nghỉ nhiều ở mốc nào, phòng nào, lý do lặp), và đề xuất chương trình giữ chân ưu tiên theo tác động/chi phí. Biến dữ liệu thành hành động giữ người.",
          "learnings": [
            "Tìm mẫu hình nghỉ việc",
            "Tổng hợp lý do từ exit interview",
            "Đề xuất giữ chân theo tác động/chi phí"
          ],
          "practicePrompt": "Bạn là chuyên viên People Analytics. Bối cảnh: đây là dữ liệu nghỉ việc + các phỏng vấn thôi việc (ẩn danh). Yêu cầu: phân tích mốc nghỉ tập trung, phòng rủi ro, 3 nguyên nhân lặp; đề xuất 5 hành động giữ chân xếp theo tác động/chi phí. Định dạng: phần phân tích + bảng đề xuất ưu tiên. Dữ liệu: [UPLOAD FILE]. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu.",
          "attachedFile": {
            "name": "du-lieu-nghi-viec-exit-mau.md",
            "path": "/files/hr/du-lieu-nghi-viec-exit-mau.md",
            "desc": "Dữ liệu nghỉ việc + exit interview ẩn danh. Tìm mẫu hình & đề xuất giữ chân."
          }
        },
        {
          "id": "nhan-su-m51",
          "title": "Xây thư viện prompt HR dùng lại hằng ngày",
          "durationMin": 18,
          "level": 1,
          "skills": [
            "hr-tu-dong-hoa"
          ],
          "content": "Gom các prompt tốt thành thư viện cá nhân theo nhóm việc (tuyển dụng, email, chính sách, báo cáo). Mỗi prompt có [chỗ điền]. Đây là bước đầu của 'một lần dựng, dùng mãi' — và cũng là nền để Agent gợi ý prompt theo việc bạn chọn.",
          "learnings": [
            "Tổ chức thư viện prompt theo nhóm việc",
            "Thiết kế prompt có [chỗ điền]",
            "Thói quen lưu lại prompt hiệu quả"
          ],
          "practicePrompt": "Bạn là chuyên gia năng suất cho HR. Bối cảnh: 3 việc HR tôi làm nhiều nhất là [..]. Yêu cầu: tạo thư viện 9 prompt mẫu (3 mỗi việc) theo chuẩn Vai trò + Bối cảnh + Yêu cầu + Định dạng, có [chỗ điền] và ghi chú khi nào dùng. Định dạng: Artifact để lưu, nhóm theo việc. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m52",
          "title": "Dùng Project + Custom Instructions làm trợ lý HR riêng của bạn",
          "durationMin": 20,
          "level": 2,
          "skills": [
            "hr-tu-dong-hoa",
            "hr-nen-tang"
          ],
          "content": "Nâng cấp từ bài nền: tinh chỉnh trợ lý HR riêng — Custom Instructions ghi rõ vai trò, giọng, ràng buộc (không bịa, luôn ẩn danh), tài liệu nền theo từng mảng việc. Có thể tạo nhiều Project: 'Tuyển dụng', 'Chính sách', 'Báo cáo' cho gọn.",
          "learnings": [
            "Tinh chỉnh Custom Instructions nâng cao",
            "Tổ chức nhiều Project theo mảng việc",
            "Ràng buộc an toàn trong chỉ dẫn"
          ],
          "practicePrompt": "Bạn là chuyên gia thiết lập Claude cho HR. Bối cảnh: tôi đang dựng Project Trợ lý Tuyển dụng. Yêu cầu: viết Custom Instructions chi tiết gồm vai trò, giọng xưng hô, quy tắc ẩn danh dữ liệu, định dạng đầu ra ưa thích, và việc nên/không nên làm. Định dạng: đoạn chỉ dẫn sẵn dán. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m53",
          "title": "Quy trình 'một lần dựng, dùng mãi': biến việc lặp thành mẫu Claude",
          "durationMin": 20,
          "level": 2,
          "skills": [
            "hr-tu-dong-hoa"
          ],
          "content": "Nhận diện việc HR lặp hằng tuần (sàng lọc CV, báo cáo, trả lời chính sách) và biến mỗi việc thành một 'mẫu vận hành' với Claude: prompt chuẩn + tài liệu nền + định dạng đầu ra. Tư duy quy trình giúp tiết kiệm hệ thống chứ không lẻ tẻ.",
          "learnings": [
            "Nhận diện việc lặp đáng tự động",
            "Đóng gói thành mẫu vận hành tái dùng",
            "Tư duy tiết kiệm theo hệ thống"
          ],
          "practicePrompt": "Bạn là chuyên gia tối ưu quy trình cho HR. Bối cảnh: tôi làm lặp lại việc [MÔ TẢ] mỗi tuần. Yêu cầu: đóng gói thành quy trình chuẩn với Claude gồm prompt mẫu, tài liệu cần nạp, các bước, định dạng kết quả; ước tính thời gian tiết kiệm. Định dạng: quy trình đánh số + phần ước tính. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m54",
          "title": "Kết nối Claude với Google Drive/email để xử lý tài liệu",
          "durationMin": 20,
          "level": 2,
          "skills": [
            "hr-tu-dong-hoa",
            "hr-hanh-chinh-ops"
          ],
          "content": "Bật connectors để Claude đọc trực tiếp tài liệu trên Google Drive (JD, chính sách, báo cáo) hay tóm tắt email — không cần copy thủ công. Học cách dùng an toàn: chỉ kết nối thư mục cần thiết, kiểm soát quyền truy cập dữ liệu nhân sự.",
          "learnings": [
            "Kết nối Drive/email cho Claude",
            "Xử lý tài liệu không cần copy tay",
            "Kiểm soát quyền & an toàn dữ liệu"
          ],
          "practicePrompt": "Bạn là chuyên gia tích hợp công cụ AI cho HR. Bối cảnh: tôi muốn kết nối Google Drive với Claude an toàn cho công việc HR. Yêu cầu: hướng dẫn từng bước kết nối, nên cấp quyền thư mục nào, rủi ro cần tránh với dữ liệu nhân sự nhạy cảm. Định dạng: các bước đánh số + phần Lưu ý an toàn. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m55",
          "title": "Tư duy workflow tự động hóa HR — Claude làm 'bộ não'",
          "durationMin": 22,
          "level": 3,
          "skills": [
            "hr-tu-dong-hoa"
          ],
          "content": "Bước nâng cao: nhìn một quy trình HR (vd nhận CV → sàng lọc → mời PV) như một luồng tự động, trong đó Claude lo phần 'suy nghĩ' (đọc, phân loại, soạn thư) còn công cụ kết nối (n8n/Lark/Zapier) lo phần chuyển tiếp. Bài cho bạn bản đồ tư duy để phối hợp với người làm kỹ thuật.",
          "learnings": [
            "Nhìn quy trình HR như một luồng tự động",
            "Phân vai: Claude 'suy nghĩ', tool 'chuyển tiếp'",
            "Phối hợp với người dựng hệ thống"
          ],
          "practicePrompt": "Bạn là chuyên gia tự động hóa quy trình cho HR. Bối cảnh: tôi muốn tự động hóa quy trình [VD: nhận CV → sàng lọc → mời PV]. Yêu cầu: vẽ sơ đồ luồng, chỉ rõ bước nào Claude làm (và prompt gì), bước nào cần công cụ kết nối, dữ liệu đi qua đâu. Định dạng: mô tả sơ đồ luồng theo bước. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        },
        {
          "id": "nhan-su-m56",
          "title": "Đo thời gian tiết kiệm & nhân rộng cho cả phòng HR",
          "durationMin": 18,
          "level": 3,
          "skills": [
            "hr-tu-dong-hoa",
            "hr-phan-tich-du-lieu"
          ],
          "content": "Bài tổng kết: lập bảng theo dõi việc nào đã giao cho Claude, tiết kiệm bao nhiêu giờ/tuần, chất lượng ra sao; chọn 3 'best practice' để hướng dẫn lại đồng nghiệp. Biến năng suất cá nhân thành năng suất cả phòng — đúng tinh thần 'doanh nghiệp tinh gọn nhờ AI'.",
          "learnings": [
            "Đo lường thời gian & chất lượng tiết kiệm",
            "Chọn best practice để nhân rộng",
            "Lan tỏa năng lực AI cho cả phòng"
          ],
          "practicePrompt": "Bạn là chuyên gia năng suất HR. Bối cảnh: phòng HR muốn đo và nhân rộng hiệu quả AI. Yêu cầu: tạo bảng theo dõi AI tiết kiệm thời gian (cột: việc, tần suất, giờ tiết kiệm/tuần, chất lượng 1-5, ghi chú) và hướng dẫn 1 trang để đào tạo lại đồng nghiệp. Định dạng: Artifact bảng + phần hướng dẫn. Nếu thiếu thông tin để làm sát, hãy hỏi lại tôi 1–3 câu trước khi bắt đầu."
        }
      ],
      "catalogCount": 64,
      "starterKit": {
        "prompts": [
          {
            "title": "JD nhanh từ vài gạch đầu dòng",
            "prompt": "Bạn là chuyên viên tuyển dụng. Viết JD cho vị trí [CHỨC DANH] tại công ty [NGÀNH, QUY MÔ]. Nhiệm vụ chính: [3-4 gạch đầu dòng]. Trình bày: Mô tả công việc · Yêu cầu · Quyền lợi. Tránh ngôn ngữ phân biệt tuổi/giới."
          },
          {
            "title": "Sàng lọc & xếp hạng CV",
            "prompt": "Đây là JD và các CV (đã ẩn danh). Chấm mỗi CV theo: Kinh nghiệm /40 · Kỹ năng /40 · Phù hợp /20. Trả bảng xếp hạng + 2 dòng nhận xét + cờ đỏ nếu có. [DÁN JD + CV]"
          },
          {
            "title": "Kế hoạch onboarding 30-60-90",
            "prompt": "Lập kế hoạch onboarding 30-60-90 ngày cho vị trí [CHỨC DANH]. Mỗi mốc: mục tiêu, việc cần làm, người hỗ trợ, tiêu chí đánh giá. Xuất bảng."
          },
          {
            "title": "Nhận xét đánh giá hiệu suất",
            "prompt": "Viết nhận xét đánh giá cuối kỳ dựa trên: thành tích [..], điểm cải thiện [..], hành vi [..]. Cân bằng ghi nhận & góp ý, giọng chuyên nghiệp, có gợi ý phát triển."
          },
          {
            "title": "Phân tích file nhân sự",
            "prompt": "Đây là bảng nhân sự quý này (ẩn danh). Tính turnover theo phòng, headcount đầu/cuối kỳ, và chỉ ra 3 bất thường kèm giả thuyết nguyên nhân. [UPLOAD FILE]"
          },
          {
            "title": "Email HR trong 2 phút",
            "prompt": "Viết email [mục đích] gửi [đối tượng], giọng [trang trọng/thân thiện], ≤150 từ, có tiêu đề và lời kêu gọi rõ. Ý chính: [gạch đầu dòng]."
          }
        ],
        "tools": [
          {
            "name": "Claude",
            "color": "#D97757",
            "desc": "Trợ lý chính của chương trình (bản Pro): Projects, Artifacts, đọc file dài, viết tài liệu HR.",
            "useFor": "Mọi việc chữ nghĩa HR: JD, email, chính sách, đánh giá, phân tích file."
          },
          {
            "name": "Claude in Excel",
            "color": "#1D7044",
            "desc": "Claude làm việc trực tiếp trên bảng tính.",
            "useFor": "Đối soát bảng lương, headcount planning, công thức & biểu đồ."
          },
          {
            "name": "NotebookLM",
            "color": "#4A6CF7",
            "desc": "Hỏi đáp trên bộ tài liệu lớn, tạo bản tóm tắt/âm thanh.",
            "useFor": "Tra cứu sổ tay, chính sách, tài liệu đào tạo dài."
          },
          {
            "name": "Gamma",
            "color": "#7C5CFC",
            "desc": "Tạo slide/đề xuất đẹp trong vài phút.",
            "useFor": "Slide đào tạo, báo cáo nhân sự trình lãnh đạo."
          }
        ]
      },
      "quiz": [
        {
          "question": "Bạn muốn nhờ Claude sàng lọc 30 CV. Cách làm an toàn & hiệu quả nhất là?",
          "options": [
            "Dán nguyên CV có đầy đủ tên, SĐT, CCCD để Claude chấm chính xác nhất",
            "Ẩn thông tin nhận dạng, đưa kèm JD + tiêu chí chấm rõ ràng, rồi tự đọc lại top ứng viên",
            "Chỉ đưa tên ứng viên và hỏi 'người này có tốt không'",
            "Nhờ Claude tự quyết định loại ai mà không cần mình xem lại"
          ],
          "correctIndex": 1,
          "explanation": "Luôn ẩn dữ liệu nhận dạng trước khi đưa lên AI, cung cấp tiêu chí rõ để chấm nhất quán, và tự rà lại top CV — AI hỗ trợ ra quyết định chứ không thay quyết định tuyển dụng."
        },
        {
          "question": "Điều gì khiến một 'Project Trợ lý HR' trên Claude hữu ích hơn hẳn chat thường?",
          "options": [
            "Nó trả lời nhanh hơn",
            "Nó lưu sẵn tài liệu công ty + chỉ dẫn nên mọi câu trả lời bám đúng bối cảnh, không phải gõ lại context",
            "Nó miễn phí",
            "Nó tự động gửi email cho nhân viên"
          ],
          "correctIndex": 1,
          "explanation": "Project giữ tài liệu nền (chính sách, JD mẫu, giọng văn) và Custom Instructions, nên Claude luôn hiểu bối cảnh công ty bạn mà không cần nhập lại mỗi lần."
        },
        {
          "question": "Claude soạn cho bạn một quyết định kỷ luật. Bước tiếp theo đúng đắn là?",
          "options": [
            "Gửi ngay cho nhân viên vì AI viết đúng chuẩn rồi",
            "Coi đây là bản nháp, đối chiếu quy trình & Bộ luật Lao động và để người có thẩm quyền/pháp lý duyệt trước khi ban hành",
            "Đăng lên nhóm công ty để mọi người góp ý",
            "Lưu lại và không cần ai xem"
          ],
          "correctIndex": 1,
          "explanation": "Văn bản pháp lý/kỷ luật phải tuân thủ đúng trình tự luật và được người có thẩm quyền duyệt. Claude chỉ làm nháp; trách nhiệm cuối cùng thuộc về con người."
        },
        {
          "question": "Học viên than 'đưa bảng lương Excel cho AI nhưng không hiệu quả'. Nguyên nhân thường gặp nhất là?",
          "options": [
            "AI không bao giờ làm được Excel",
            "Chưa mô tả rõ quy tắc tính và chưa nêu rõ cần kiểm tra/đầu ra gì; đưa dữ liệu thiếu ngữ cảnh",
            "Phải mua thêm phần mềm",
            "Excel quá hiện đại cho AI"
          ],
          "correctIndex": 1,
          "explanation": "Mấu chốt là cách đặt bài toán: nêu rõ quy tắc tính, ẩn danh dữ liệu, yêu cầu cụ thể (dò lỗi/viết công thức/ tóm tắt) và định dạng kết quả. Có thể dùng Claude in Excel để thao tác trực tiếp."
        },
        {
          "question": "Mục tiêu cuối cùng của track 'Tự động hóa & năng suất' cho HR là gì?",
          "options": [
            "Thay thế hoàn toàn nhân viên HR bằng AI",
            "Biến việc lặp thành mẫu dùng lại, đo thời gian tiết kiệm và nhân rộng cách làm cho cả phòng",
            "Dùng càng nhiều công cụ AI càng tốt",
            "Tự động gửi mọi email mà không cần duyệt"
          ],
          "correctIndex": 1,
          "explanation": "Tự động hóa HR hiệu quả là đóng gói việc lặp thành quy trình chuẩn với Claude, đo lường lợi ích thực và lan tỏa best practice — con người vẫn kiểm soát và chịu trách nhiệm."
        }
      ]
    },
    "kinh-doanh": {
      "id": "kinh-doanh",
      "label": "Nhân viên Kinh doanh",
      "shortLabel": "Kinh doanh / Bán hàng",
      "icon": "🤝",
      "color": "#DB6E4C",
      "modules": [
        {
          "id": "kinh-doanh-m1",
          "title": "AI là gì? Nó giúp được gì cho người bán hàng",
          "durationMin": 15,
          "level": 1,
          "content": "AI (Artificial Intelligence) là công cụ giúp bạn xử lý nhanh những việc lặp lại: soạn email, viết kịch bản, gợi ý ý tưởng. Với nhân viên bán hàng, AI giống như một trợ lý ngồi cạnh — bạn ra lệnh, nó làm nháp, bạn duyệt và gửi đi.",
          "learnings": [
            "Hiểu AI bằng ngôn ngữ đời thường",
            "3 việc AI làm tốt nhất cho sales",
            "Điều AI KHÔNG thay được con người"
          ]
        },
        {
          "id": "kinh-doanh-m2",
          "title": "Dùng Claude viết email & tin nhắn chào hàng",
          "durationMin": 20,
          "level": 1,
          "content": "Một prompt tốt = vai trò + bối cảnh + yêu cầu cụ thể. VD: 'Bạn là nhân viên bán đệm cao cấp. Viết email chào khách công ty 50 nhân viên vừa chuyển văn phòng, giọng thân thiện, tối đa 120 từ, kết bằng lời mời đặt lịch xem hàng.'",
          "learnings": [
            "Cấu trúc prompt tốt",
            "Viết email chào khách trong 2 phút",
            "Cá nhân hóa theo từng khách"
          ]
        },
        {
          "id": "kinh-doanh-m3",
          "title": "Kịch bản tư vấn & xử lý từ chối bằng AI",
          "durationMin": 25,
          "level": 2,
          "content": "AI giúp bạn luyện trả lời các câu từ chối khó nhằn: 'đắt quá', 'để em suy nghĩ', 'chỗ khác rẻ hơn'. Nhờ AI đóng vai khách khó tính, bạn phản xạ trước khi gặp khách thật.",
          "learnings": [
            "Sinh nhiều phương án trả lời",
            "Xử lý 'đắt quá', 'để em suy nghĩ'",
            "Luyện phản xạ với AI đóng vai khách"
          ]
        },
        {
          "id": "kinh-doanh-m4",
          "title": "Phân tích nhu cầu khách từ lịch sử chat",
          "durationMin": 20,
          "level": 2,
          "attachedFile": {
            "name": "lich-su-chat-khach-mau.txt",
            "path": "/files/lich-su-chat-khach-mau.txt",
            "desc": "Đoạn chat với khách (ẩn danh). Thử nhờ AI tóm tắt nhu cầu, tín hiệu mua và bước tiếp theo."
          },
          "content": "Copy lịch sử chat với khách, nhờ AI tóm tắt + chỉ ra tín hiệu mua hàng + gợi ý bước tiếp theo. Tiết kiệm 30 phút/khách.",
          "learnings": [
            "Tóm tắt hội thoại dài",
            "Nhận ra tín hiệu mua hàng",
            "Gợi ý bước tiếp theo"
          ]
        },
        {
          "id": "kinh-doanh-m5",
          "title": "Soạn báo giá & đề xuất nhanh với AI",
          "durationMin": 20,
          "level": 3,
          "content": "AI tạo bảng so sánh gói, viết đề xuất thuyết phục. Nhưng SỐ LIỆU PHẢI tự kiểm tra — AI hay 'bịa' giá tiền.",
          "learnings": [
            "Tạo bảng so sánh gói",
            "Viết đề xuất thuyết phục",
            "Kiểm tra số liệu trước khi gửi"
          ]
        },
        {
          "id": "kinh-doanh-m6",
          "title": "Đạo đức & rủi ro: điều KHÔNG nên đưa cho AI",
          "durationMin": 15,
          "level": 3,
          "content": "KHÔNG dán số điện thoại, mã số thuế, hợp đồng mật vào công cụ AI công cộng. AI có thể bịa cam kết bạn không thể giữ. Luôn đọc lại trước khi gửi.",
          "learnings": [
            "Dữ liệu cá nhân khách hàng",
            "Tránh AI 'bịa' cam kết",
            "Luôn đọc lại trước khi gửi"
          ]
        }
      ],
      "starterKit": {
        "prompts": [
          {
            "title": "Email chào khách lần đầu",
            "prompt": "Bạn là nhân viên bán hàng [SẢN PHẨM]. Viết email chào khách [LOẠI KHÁCH], giọng thân thiện, ≤120 từ, kết bằng lời mời đặt lịch xem/gọi."
          },
          {
            "title": "Xử lý 'đắt quá'",
            "prompt": "Khách hàng nói 'bên em đắt quá so với chỗ khác'. Gợi ý 3 cách trả lời tập trung vào giá trị thay vì giảm giá. Mỗi cách 2-3 câu."
          },
          {
            "title": "Tóm tắt cuộc gọi tư vấn",
            "prompt": "Tóm tắt cuộc gọi sau thành: (1) nhu cầu khách, (2) phản đối chính, (3) bước tiếp theo nên làm. [DÁN NỘI DUNG GỌI]"
          }
        ],
        "tools": [
          {
            "name": "ChatGPT",
            "color": "#10A37F",
            "desc": "Trợ lý đa năng: soạn email, kịch bản, trả lời nhanh.",
            "useFor": "Soạn email chào hàng & luyện xử lý từ chối"
          },
          {
            "name": "Claude",
            "color": "#D97757",
            "desc": "Viết dài mạch lạc, đọc tài liệu dài.",
            "useFor": "Đọc & tóm tắt hồ sơ khách, soạn đề xuất"
          },
          {
            "name": "Gamma",
            "color": "#7C5CFC",
            "desc": "Tạo slide/đề xuất đẹp trong vài phút.",
            "useFor": "Làm bài giới thiệu sản phẩm cho khách"
          },
          {
            "name": "Fireflies",
            "color": "#4A6CF7",
            "desc": "Tự động ghi & tóm tắt cuộc gọi.",
            "useFor": "Ghi lại nội dung cuộc gọi tư vấn"
          }
        ]
      },
      "quiz": [
        {
          "question": "Khách nhắn: «Bên em đắt quá so với chỗ khác». Bạn muốn dùng AI soạn câu trả lời. Cách làm ĐÚNG nhất?",
          "options": [
            "Dán nguyên thông tin khách (tên, SĐT, công ty) vào ChatGPT rồi bảo nó trả lời",
            "Mô tả tình huống chung (không kèm dữ liệu cá nhân) và nhờ AI gợi ý 3 hướng trả lời tập trung vào giá trị",
            "Bảo AI tự bịa một mức giảm giá để chốt đơn",
            "Gửi luôn câu trả lời AI viết mà không đọc lại"
          ],
          "correctIndex": 1,
          "explanation": "Không đưa dữ liệu cá nhân của khách vào công cụ AI công cộng. Hãy mô tả tình huống chung, lấy gợi ý rồi tự điều chỉnh và kiểm tra trước khi gửi."
        },
        {
          "question": "AI giúp người bán hàng việc nào TỐT nhất?",
          "options": [
            "Tự động hiểu cảm xúc thật của khách qua điện thoại",
            "Gợi ý ý tưởng & soạn nháp email/kịch bản để bạn chỉnh sửa",
            "Thay bạn ra quyết định giảm giá",
            "Đảm bảo chốt được 100% đơn"
          ],
          "correctIndex": 1,
          "explanation": "AI mạnh ở việc tạo nháp, gợi ý ý tưởng, tiết kiệm thời gian — còn quyết định cuối cùng vẫn là con người."
        },
        {
          "question": "Prompt nào sẽ cho kết quả TỐT hơn khi nhờ AI viết email chào hàng?",
          "options": [
            "«Viết email bán hàng»",
            "«Viết email chào ghế văn phòng cao cấp, gửi công ty 50 nhân viên vừa chuyển văn phòng, giọng thân thiện, ≤120 từ, có lời mời đặt lịch xem hàng»",
            "«Email»",
            "«Bán đi»"
          ],
          "correctIndex": 1,
          "explanation": "Prompt càng cụ thể (đối tượng, bối cảnh, giọng văn, độ dài, mục tiêu) thì AI trả kết quả càng sát thực tế."
        }
      ]
    },
    "ke-toan": {
      "id": "ke-toan",
      "label": "Nhân viên Kế toán",
      "shortLabel": "Kế toán",
      "icon": "🧾",
      "color": "#2E6B4F",
      "modules": [
        {
          "id": "ke-toan-m1",
          "title": "AI là gì? Nó giúp được gì cho kế toán",
          "durationMin": 15,
          "level": 1,
          "content": "AI giúp kế toán tóm tắt báo cáo dài, phân loại hóa đơn, hỏi công thức Excel. Nhưng SỐ LIỆU phải luôn tự đối chiếu — AI có thể 'bịa số'.",
          "learnings": [
            "AI bằng ngôn ngữ đời thường",
            "Việc lặp lại AI làm thay được",
            "Giới hạn & trách nhiệm của con người"
          ]
        },
        {
          "id": "ke-toan-m2",
          "title": "Dùng AI kiểm tra, phân loại & đối chiếu hóa đơn",
          "durationMin": 25,
          "level": 2,
          "attachedFile": {
            "name": "bang-chi-phi-6-thang-mau.csv",
            "path": "/files/bang-chi-phi-6-thang-mau.csv",
            "desc": "Bảng chi phí 6 tháng theo nhóm. Có 1 khoản chi tăng đột biến — nhờ AI phân loại và phát hiện."
          },
          "content": "Copy danh sách hóa đơn (đã ẩn danh) vào AI → nhờ phân loại theo nhóm chi phí, phát hiện hóa đơn trùng/lệch.",
          "learnings": [
            "Phân loại hóa đơn theo nhóm",
            "Phát hiện trùng/lệch",
            "Quy trình an toàn với dữ liệu"
          ]
        },
        {
          "id": "ke-toan-m3",
          "title": "Tóm tắt báo cáo tài chính dài thành vài dòng",
          "durationMin": 20,
          "level": 2,
          "content": "Báo cáo 20 trang → 5 ý chính cho sếp đọc trong 30 giây. AI tóm tắt được nhưng các CHỈ SỐ cụ thể bạn phải tự verify.",
          "learnings": [
            "Tóm tắt 20 trang còn 5 ý",
            "Trích chỉ số quan trọng",
            "Diễn giải cho sếp dễ hiểu"
          ]
        },
        {
          "id": "ke-toan-m4",
          "title": "Trích xuất số liệu từ chứng từ & PDF bằng AI",
          "durationMin": 25,
          "level": 2,
          "content": "ChatPDF + Claude đọc PDF chứng từ → trích thành bảng Excel. Luôn so lại với gốc trước khi nhập sổ.",
          "learnings": [
            "Đọc PDF/ảnh chứng từ",
            "Chuyển thành bảng",
            "Kiểm tra lại với gốc"
          ]
        },
        {
          "id": "ke-toan-m5",
          "title": "Phát hiện số liệu bất thường với AI",
          "durationMin": 20,
          "level": 3,
          "content": "Nhờ AI so sánh kỳ này với kỳ trước, chỉ ra điểm lạ (chi phí tăng đột biến, doanh thu lệch nguyên tắc). KHÔNG tin số AI đưa ra mà chưa đối chiếu sổ gốc.",
          "learnings": [
            "So sánh kỳ/kỳ",
            "Cảnh báo điểm lạ",
            "Không tin số AI mà chưa đối chiếu"
          ]
        },
        {
          "id": "ke-toan-m6",
          "title": "Bảo mật dữ liệu tài chính khi dùng AI",
          "durationMin": 15,
          "level": 3,
          "content": "KHÔNG đưa lương nhân viên, số tài khoản, MST khách lên công cụ AI công cộng. Hỏi kiến thức chung thì OK. Dữ liệu mật → ẩn danh hoặc dùng bản nội bộ.",
          "learnings": [
            "Dữ liệu nào tuyệt đối không đưa lên",
            "Ẩn danh trước khi hỏi",
            "Công cụ nội bộ vs công cộng"
          ]
        },
        {
          "id": "ke-toan-m7",
          "title": "Đối chiếu công nợ & soạn email nhắc thu hồi bằng AI",
          "durationMin": 20,
          "level": 2,
          "attachedFile": {
            "name": "cong-no-phai-thu-mau.csv",
            "path": "/files/cong-no-phai-thu-mau.csv",
            "desc": "Bảng công nợ phải thu (ẩn tên khách). Mở bằng Excel/Google Sheets. Có 1 dòng số dư không khớp — thử nhờ AI phát hiện."
          },
          "content": "Copy bảng công nợ phải thu (đã ẩn tên khách), nhờ AI xếp theo tuổi nợ, đánh dấu khoản quá hạn và soạn sẵn email nhắc với giọng lịch sự. Việc dò tay cả buổi rút còn vài phút. Luôn đối chiếu lại số dư với sổ gốc trước khi gửi.",
          "learnings": [
            "Phân nhóm nợ theo tuổi nợ (chưa tới hạn / quá hạn 30-60-90 ngày)",
            "Soạn email nhắc thu hồi đúng giọng từng nhóm khách",
            "Đối chiếu số dư với sổ gốc trước khi gửi"
          ]
        },
        {
          "id": "ke-toan-m8",
          "title": "Lập báo cáo quản trị nhanh cho sếp bằng AI",
          "durationMin": 20,
          "level": 3,
          "attachedFile": {
            "name": "doanh-thu-chi-phi-loi-nhuan-mau.csv",
            "path": "/files/doanh-thu-chi-phi-loi-nhuan-mau.csv",
            "desc": "Số liệu doanh thu–chi phí–lợi nhuận 6 tháng. Có 1 tháng lỗ bất thường — nhờ AI chỉ ra nguyên nhân."
          },
          "content": "Từ số liệu thô (doanh thu, chi phí, lợi nhuận theo tháng), nhờ AI viết bản tóm tắt quản trị 5 ý cho sếp: xu hướng, điểm bất thường, rủi ro, đề xuất. AI dựng khung và câu chữ, bạn kiểm số liệu. Tuyệt đối không để AI tự bịa con số — yêu cầu nó chỉ dùng dữ liệu bạn cung cấp.",
          "learnings": [
            "Biến số liệu khô thành bản tóm tắt sếp đọc hiểu ngay",
            "Yêu cầu AI chỉ dùng số bạn đưa, không tự bịa",
            "Kiểm chứng mọi con số trước khi trình"
          ]
        }
      ],
      "starterKit": {
        "prompts": [
          {
            "title": "Tóm tắt báo cáo tài chính",
            "prompt": "Tóm tắt báo cáo sau thành 5 ý chính cho CEO: (1) tổng doanh thu, (2) chi phí lớn nhất, (3) lợi nhuận, (4) điểm bất thường, (5) đề xuất. [DÁN BÁO CÁO]"
          },
          {
            "title": "Công thức Excel khó",
            "prompt": "Viết công thức Excel để [MÔ TẢ YÊU CẦU]. Giải thích từng phần. Cho VÍ DỤ với dữ liệu mẫu."
          },
          {
            "title": "Phân loại chi phí",
            "prompt": "Phân loại các khoản chi sau theo nhóm: chi phí cố định/biến đổi/đầu tư. Cho dạng bảng. [DÁN DANH SÁCH]"
          }
        ],
        "tools": [
          {
            "name": "ChatGPT",
            "color": "#10A37F",
            "desc": "Hỏi đáp nghiệp vụ, công thức Excel.",
            "useFor": "Hỏi cách viết công thức Excel phức tạp"
          },
          {
            "name": "Claude",
            "color": "#D97757",
            "desc": "Đọc tài liệu & báo cáo dài.",
            "useFor": "Tóm tắt báo cáo tài chính, đọc hợp đồng"
          },
          {
            "name": "Copilot",
            "color": "#0F6CBD",
            "desc": "Phân tích bảng tính ngay trong Excel.",
            "useFor": "Tạo công thức & biểu đồ từ câu lệnh"
          },
          {
            "name": "ChatPDF",
            "color": "#E8533F",
            "desc": "Hỏi đáp trực tiếp trên file PDF.",
            "useFor": "Trích số liệu từ chứng từ PDF"
          }
        ]
      },
      "quiz": [
        {
          "question": "Dữ liệu nào bạn TUYỆT ĐỐI không nên dán vào công cụ AI công cộng?",
          "options": [
            "Định nghĩa «khấu hao là gì»",
            "Bảng lương chi tiết kèm tên & số tài khoản nhân viên",
            "Câu hỏi về cách dùng hàm Excel",
            "Câu hỏi về chuẩn mực kế toán chung"
          ],
          "correctIndex": 1,
          "explanation": "Thông tin nhạy cảm (lương, tài khoản, MST khách) không nên đưa lên công cụ công cộng. Hỏi kiến thức chung thì an toàn."
        },
        {
          "question": "AI có thể giúp kế toán việc nào?",
          "options": [
            "Tự động nộp thuế thay bạn",
            "Tóm tắt nhanh báo cáo tài chính 20 trang để bạn nắm ý chính",
            "Đảm bảo sổ sách không bao giờ sai",
            "Thay kế toán trưởng ký duyệt"
          ],
          "correctIndex": 1,
          "explanation": "AI giỏi tóm tắt, phân loại, trích xuất — nhưng con người vẫn phải kiểm tra và chịu trách nhiệm cuối cùng."
        },
        {
          "question": "AI trả lời một con số tài chính rất cụ thể mà bạn không chắc đúng. Bạn nên?",
          "options": [
            "Tin ngay vì AI thông minh",
            "Đối chiếu lại với chứng từ/sổ gốc trước khi dùng",
            "Gửi luôn cho sếp",
            "Bỏ qua hoàn toàn AI"
          ],
          "correctIndex": 1,
          "explanation": "AI có thể «bịa số» (ảo giác). Luôn đối chiếu số liệu với nguồn gốc trước khi sử dụng."
        }
      ]
    },
    "marketing": {
      "id": "marketing",
      "label": "Nhân viên Marketing",
      "shortLabel": "Marketing",
      "icon": "📣",
      "color": "#C8923B",
      "modules": [
        {
          "id": "marketing-m1",
          "title": "AI là gì? Nó giúp được gì cho marketing",
          "durationMin": 15,
          "level": 1,
          "content": "AI là người viết nháp giỏi — bạn là biên tập viên. Tạo 20 ý tưởng trong 1 phút, viết nháp đa kênh, sinh ảnh minh hoạ. Nhưng giọng văn cuối phải do bạn duyệt.",
          "learnings": [
            "AI bằng ngôn ngữ đời thường",
            "AI làm nháp — bạn làm biên tập",
            "Việc AI hỗ trợ tốt nhất"
          ]
        },
        {
          "id": "marketing-m2",
          "title": "Viết content đa kênh (FB, email, web) với AI",
          "durationMin": 25,
          "level": 1,
          "content": "Một ý tưởng → nhiều định dạng: post FB ngắn, email dài, bài blog SEO, caption Instagram. Đưa mẫu giọng văn brand vào prompt để giữ tone.",
          "learnings": [
            "Một ý tưởng → nhiều định dạng",
            "Giữ giọng thương hiệu",
            "Prompt cho từng kênh"
          ]
        },
        {
          "id": "marketing-m3",
          "title": "Tạo ý tưởng & ảnh visual bằng AI",
          "durationMin": 20,
          "level": 2,
          "tool": "chatgpt-image",
          "toolReason": "Bài này cần tạo ảnh minh hoạ — dùng ChatGPT có DALL-E tích hợp sẵn để có kết quả tốt nhất",
          "content": "Brainstorm 20 ý trong 1 phút với Claude. Tạo ảnh minh hoạ với Midjourney/Canva AI. Mô tả ảnh càng chi tiết → AI vẽ càng đúng.",
          "learnings": [
            "Brainstorm 20 ý trong 1 phút",
            "Tạo ảnh minh hoạ",
            "Mô tả ảnh cho AI vẽ"
          ]
        },
        {
          "id": "marketing-m4",
          "title": "Lên lịch & kế hoạch nội dung 30 ngày với AI",
          "durationMin": 20,
          "level": 2,
          "content": "Khung content tháng theo 3 trụ cột (educate/inspire/sell). AI giúp phân bổ + tái sử dụng nội dung cũ thành format mới.",
          "learnings": [
            "Khung content tháng",
            "Phân bổ theo trụ cột",
            "Tái sử dụng nội dung cũ"
          ]
        },
        {
          "id": "marketing-m5",
          "title": "Đọc số & phân tích hiệu quả chiến dịch",
          "durationMin": 25,
          "level": 3,
          "attachedFile": {
            "name": "so-lieu-chien-dich-mau.csv",
            "path": "/files/so-lieu-chien-dich-mau.csv",
            "desc": "Số liệu 5 chiến dịch (impression/click/chi phí/đơn). Có 1 chiến dịch CTR cực thấp — nhờ AI chỉ ra và đề xuất tối ưu."
          },
          "content": "Copy báo cáo Meta Ads/GA4 → nhờ AI giải thích. Đề xuất tối ưu dựa trên CPM, CTR, conversion. Nhưng QUYẾT ĐỊNH ngân sách vẫn do bạn.",
          "learnings": [
            "Hiểu chỉ số cơ bản",
            "Nhờ AI giải thích báo cáo",
            "Đề xuất tối ưu"
          ]
        },
        {
          "id": "marketing-m6",
          "title": "Đạo đức nội dung AI & tránh 'giọng văn AI'",
          "durationMin": 15,
          "level": 3,
          "content": "Content AI thường nhạt: 'Hãy cùng khám phá', 'Trong thời đại số ngày nay'. Cần biên tập lại có cảm xúc, ví dụ cụ thể, ngôn ngữ thương hiệu. Minh bạch khi dùng AI.",
          "learnings": [
            "Nhận ra văn AI nhạt",
            "Biên tập cho có cảm xúc",
            "Minh bạch khi dùng AI"
          ]
        }
      ],
      "starterKit": {
        "prompts": [
          {
            "title": "20 tiêu đề Facebook",
            "prompt": "Viết 20 tiêu đề Facebook cho [SẢN PHẨM], đối tượng [TUỔI + ĐẶC ĐIỂM], giọng [TONE], mỗi tiêu đề ≤12 từ. Đa dạng góc nhìn (hài, sốc, lợi ích, FOMO)."
          },
          {
            "title": "Caption đa kênh từ 1 ý",
            "prompt": "Từ ý: [Ý CHÍNH]. Viết 4 phiên bản: (1) Post FB 80 từ, (2) Caption IG 30 từ + 5 hashtag, (3) Email subject + 100 từ preview, (4) Hook TikTok 3 giây đầu."
          },
          {
            "title": "Phân tích chiến dịch",
            "prompt": "Đọc số liệu chiến dịch sau, chỉ ra: (1) chỉ số tốt, (2) chỉ số kém, (3) 3 đề xuất tối ưu cụ thể. [DÁN SỐ LIỆU]"
          }
        ],
        "tools": [
          {
            "name": "ChatGPT",
            "color": "#10A37F",
            "desc": "Ý tưởng, tiêu đề, bài nháp.",
            "useFor": "Tạo 20 ý tưởng bài viết trong 1 phút"
          },
          {
            "name": "Claude",
            "color": "#D97757",
            "desc": "Viết bài dài có chiều sâu, đúng giọng brand.",
            "useFor": "Viết blog & chuỗi email"
          },
          {
            "name": "Canva AI",
            "color": "#7D2AE8",
            "desc": "Thiết kế & ấn phẩm nhanh.",
            "useFor": "Tạo ảnh post & banner"
          },
          {
            "name": "Gemini",
            "color": "#1A73E8",
            "desc": "Tìm kiếm + sáng tạo, đọc xu hướng.",
            "useFor": "Nghiên cứu xu hướng & đối thủ"
          }
        ]
      },
      "quiz": [
        {
          "question": "Làm sao để content AI viết không bị «giọng văn AI» nhạt nhẽo?",
          "options": [
            "Cứ đăng nguyên văn AI viết",
            "Cho AI ví dụ giọng văn thương hiệu + tự biên tập lại cho có cảm xúc",
            "Viết prompt 1 chữ «content»",
            "Dịch qua lại nhiều thứ tiếng"
          ],
          "correctIndex": 1,
          "explanation": "Hãy đưa AI mẫu giọng văn của thương hiệu và luôn biên tập lại — AI là người viết nháp, bạn là biên tập viên."
        },
        {
          "question": "AI hữu ích nhất cho marketing ở khâu nào?",
          "options": [
            "Thay bạn hiểu sâu insight khách hàng mà không cần dữ liệu",
            "Tạo nhanh nhiều phương án tiêu đề, ý tưởng, bài nháp để chọn lọc",
            "Đảm bảo bài viral",
            "Tự chạy quảng cáo không cần người"
          ],
          "correctIndex": 1,
          "explanation": "AI giúp tạo nhiều phương án thật nhanh để bạn chọn lọc — sáng tạo và phán đoán vẫn cần con người."
        },
        {
          "question": "Bạn cần 10 tiêu đề cho bài về đệm ngủ cao cấp. Prompt nào tốt hơn?",
          "options": [
            "«Cho tiêu đề»",
            "«Viết 10 tiêu đề Facebook cho đệm cao cấp nhập khẩu, đối tượng 35–55 tuổi quan tâm giấc ngủ, giọng sang trọng mà gần gũi, mỗi tiêu đề ≤12 từ»",
            "«Đệm»",
            "«Hay vào»"
          ],
          "correctIndex": 1,
          "explanation": "Cụ thể về đối tượng, sản phẩm, giọng văn, số lượng, độ dài → kết quả sát hơn nhiều."
        }
      ]
    },
    "van-hanh": {
      "id": "van-hanh",
      "label": "Nhân viên Hành chính / Nhân sự (HR)",
      "shortLabel": "Hành chính / HR",
      "icon": "🗂️",
      "color": "#3C6E8F",
      "modules": [
        {
          "id": "van-hanh-m1",
          "title": "AI là gì? Nó giúp được gì cho hành chính & HR",
          "durationMin": 15,
          "level": 1,
          "isFoundation": true,
          "skills": [
            "nen-tang-ai"
          ],
          "content": "AI giúp tự động hóa việc lặp lại: email thông báo, tóm tắt biên bản, soạn quy trình, sàng lọc CV. Tiết kiệm 2-3 giờ/ngày cho việc cần phán đoán.",
          "learnings": [
            "AI bằng ngôn ngữ đời thường",
            "Tự động hoá việc lặp lại trong hành chính",
            "Khi nào cần con người quyết"
          ]
        },
        {
          "id": "van-hanh-m2",
          "title": "Viết prompt tốt & tự động hóa việc lặp lại",
          "durationMin": 25,
          "level": 1,
          "isFoundation": true,
          "skills": [
            "viet-prompt"
          ],
          "content": "Một prompt tốt = vai trò + bối cảnh + yêu cầu. Nhận diện việc lặp lại trong ngày → tạo prompt template tái dùng. VD: 'Soạn email từ chối ứng viên cho vị trí [VỊ TRÍ], giọng tôn trọng, gợi ý cơ hội khác'.",
          "practicePrompt": "Bạn là nhân viên hành chính. Viết prompt mẫu để soạn nhanh email thông báo nội bộ cho [SỰ KIỆN], giọng lịch sự, ≤100 từ. Chừa chỗ [NGẶC] cho phần thay đổi.",
          "learnings": [
            "Cấu trúc prompt vai trò + bối cảnh + yêu cầu",
            "Mẫu prompt tái dùng cho việc lặp lại",
            "Giảm thời gian thủ công"
          ]
        },
        {
          "id": "van-hanh-m3",
          "title": "Tóm tắt & soạn email/biên bản công việc",
          "durationMin": 20,
          "level": 2,
          "skills": [
            "tom-tat-tai-lieu",
            "email-noi-bo"
          ],
          "attachedFile": {
            "name": "bien-ban-hop-mau.txt",
            "path": "/files/bien-ban-hop-mau.txt",
            "desc": "Biên bản họp mẫu. Có 1 con số ngân sách CHƯA được duyệt — đừng để AI ghi nhầm thành đã chốt."
          },
          "content": "Biên bản họp 1 giờ → 5 ý chính + đầu việc + deadline. Email mẫu nhiều tình huống. Tiết kiệm 30 phút/họp.",
          "learnings": [
            "Tóm tắt biên bản họp",
            "Soạn email theo mẫu",
            "Trích đầu việc & deadline"
          ]
        },
        {
          "id": "van-hanh-m4",
          "title": "Sắp xếp & tra cứu dữ liệu nhanh bằng AI",
          "durationMin": 20,
          "level": 2,
          "content": "Upload tài liệu SOP → AI giúp tra cứu nhanh. Tạo checklist tự động cho quy trình mới. Phân loại dữ liệu theo nhóm.",
          "learnings": [
            "Phân loại dữ liệu",
            "Hỏi đáp trên tài liệu",
            "Tạo checklist tự động"
          ]
        },
        {
          "id": "van-hanh-m5",
          "title": "Lập kế hoạch & điều phối lịch với AI",
          "durationMin": 20,
          "level": 3,
          "content": "AI giúp lập kế hoạch tuần dựa trên priority. Phân việc theo capacity team. Nhắc việc + theo dõi deadline.",
          "learnings": [
            "Lập kế hoạch tuần",
            "Phân việc hợp lý",
            "Nhắc việc & theo dõi"
          ]
        },
        {
          "id": "van-hanh-m6",
          "title": "Rủi ro & cách kiểm soát khi dùng AI",
          "durationMin": 15,
          "level": 3,
          "isFoundation": true,
          "skills": [
            "an-toan-du-lieu"
          ],
          "content": "Hợp đồng, dữ liệu nhân viên mật KHÔNG đưa lên công cụ công cộng. Luôn đọc lại kết quả AI. Có quy tắc dùng AI an toàn cho team.",
          "learnings": [
            "Dữ liệu mật & hợp đồng",
            "Kiểm tra lại kết quả AI",
            "Quy tắc dùng AI an toàn"
          ]
        },
        {
          "id": "van-hanh-m7",
          "title": "Soạn quyết định & thông báo nội bộ bằng AI",
          "durationMin": 20,
          "level": 2,
          "skills": [
            "van-ban-hanh-chinh"
          ],
          "rubric": [
            {
              "criteria": "Đúng thể thức văn bản hành chính",
              "maxPoints": 20
            },
            {
              "criteria": "Đủ thông tin bắt buộc (số/ký hiệu, căn cứ, ngày)",
              "maxPoints": 20
            },
            {
              "criteria": "Nội dung chính xác theo yêu cầu đề bài",
              "maxPoints": 25
            },
            {
              "criteria": "Ngôn ngữ trang trọng, chuyên nghiệp",
              "maxPoints": 15
            },
            {
              "criteria": "Đã điền/chỉnh chỗ trống thay vì để nguyên mẫu",
              "maxPoints": 10
            },
            {
              "criteria": "Kết quả có thể ban hành được ngay",
              "maxPoints": 10
            }
          ],
          "practicePrompt": "Bạn là nhân viên hành chính. Soạn một QUYẾT ĐỊNH bổ nhiệm [CHỨC DANH] cho [VỊ TRÍ], đúng thể thức văn bản hành chính Việt Nam (Quốc hiệu, số/ký hiệu, căn cứ, điều khoản, nơi nhận). Chừa [NGẶC] cho phần điền tay.",
          "content": "AI dựng nhanh khung văn bản hành chính đúng thể thức: quyết định, thông báo, công văn. Bạn chỉ điền số liệu và rà thể thức. Lưu ý: tên người, số quyết định thật phải tự điền, không để AI bịa.",
          "learnings": [
            "Khung văn bản đúng thể thức hành chính VN",
            "Điền chỗ trống & rà lại trước khi ban hành",
            "Không để AI bịa số/tên thật"
          ]
        },
        {
          "id": "van-hanh-m8",
          "title": "Sàng lọc & tóm tắt CV tuyển dụng bằng AI",
          "durationMin": 25,
          "level": 2,
          "skills": [
            "loc-cv"
          ],
          "attachedFile": {
            "name": "cv-ung-vien-mau.txt",
            "path": "/files/cv-ung-vien-mau.txt",
            "desc": "5 CV ứng viên (ẩn danh). Có ứng viên nhảy việc nhiều và CV mô tả mơ hồ — thử nhờ AI chấm mức khớp."
          },
          "rubric": [
            {
              "criteria": "Chấm mức khớp JD rõ ràng (thang điểm)",
              "maxPoints": 25
            },
            {
              "criteria": "Nêu điểm mạnh & điểm thiếu của ứng viên",
              "maxPoints": 20
            },
            {
              "criteria": "Gợi ý câu hỏi phỏng vấn sát vị trí",
              "maxPoints": 20
            },
            {
              "criteria": "Đã ẩn danh dữ liệu ứng viên",
              "maxPoints": 20
            },
            {
              "criteria": "Kết quả trình bày dạng bảng dễ dùng",
              "maxPoints": 15
            }
          ],
          "practicePrompt": "Đây là JD vị trí [VỊ TRÍ] và 5 CV (đã ẩn tên, SĐT). Hãy chấm mỗi CV theo mức độ khớp JD (thang 1-5), nêu 1 điểm mạnh + 1 điểm thiếu, và gợi ý câu hỏi phỏng vấn. Trả về dạng bảng.",
          "content": "Dán JD + nhiều CV (đã ẩn thông tin cá nhân) → AI xếp hạng mức khớp, tóm tắt điểm mạnh/yếu, gợi ý câu hỏi phỏng vấn. Việc đọc cả xấp CV rút còn vài phút. TUYỆT ĐỐI ẩn danh dữ liệu ứng viên trước khi đưa lên công cụ công cộng.",
          "learnings": [
            "Chấm CV theo mức khớp JD",
            "Ẩn danh dữ liệu ứng viên trước khi hỏi AI",
            "Gợi ý câu hỏi phỏng vấn sát vị trí"
          ]
        },
        {
          "id": "van-hanh-m9",
          "title": "Viết email nội bộ & truyền thông HR bằng AI",
          "durationMin": 15,
          "level": 1,
          "skills": [
            "email-noi-bo"
          ],
          "practicePrompt": "Viết email nội bộ thông báo [CHÍNH SÁCH/SỰ KIỆN HR] gửi toàn công ty, giọng thân thiện nhưng chuyên nghiệp, ≤150 từ, có phần hành động cần làm & hạn chót.",
          "content": "AI giúp HR viết email nội bộ rõ ràng, đúng giọng công ty: thông báo chính sách, nhắc nộp hồ sơ, mời sự kiện. Một ý → nhiều bản (trang trọng/thân thiện) để chọn.",
          "learnings": [
            "Email nội bộ rõ ý, đúng giọng công ty",
            "Nêu rõ hành động & hạn chót",
            "Tạo nhiều phiên bản giọng để chọn"
          ]
        },
        {
          "id": "van-hanh-m10",
          "title": "Hỗ trợ chấm công & nghỉ phép bằng AI",
          "durationMin": 20,
          "level": 3,
          "skills": [
            "cham-cong-nghi-phep"
          ],
          "practicePrompt": "Đây là bảng chấm công tháng (đã ẩn tên). Hãy phát hiện ngày công bất thường (đi muộn, thiếu công), tính số ngày phép còn lại theo quy định [SỐ NGÀY/NĂM], và tóm tắt thành bảng cho HR rà soát.",
          "content": "Dán bảng chấm công (ẩn tên) → AI phát hiện bất thường, tính phép tồn, dựng bản tóm tắt. AI hỗ trợ rà soát, còn con số cuối cùng HR phải đối chiếu hệ thống chấm công gốc.",
          "learnings": [
            "Phát hiện ngày công bất thường",
            "Tính phép tồn theo quy định công ty",
            "Đối chiếu lại với hệ thống gốc trước khi chốt"
          ]
        },
        {
          "id": "van-hanh-m11",
          "title": "Soạn nháp chính sách/nội quy & rà rủi ro pháp lý",
          "durationMin": 25,
          "level": 3,
          "skills": [
            "danh-gia-chinh-sach"
          ],
          "practicePrompt": "Soạn nháp quy định làm việc từ xa cho công ty 50 người: phạm vi, điều kiện, trách nhiệm, ≤1 trang. Đánh dấu rõ chỗ cần pháp chế rà.",
          "content": "AI soạn nháp chính sách/nội quy, khung tiêu chí đánh giá KPI, tổng hợp feedback. Cảnh báo: chính sách phải đúng Luật Lao động — AI chỉ nháp, người + pháp chế rà trước khi ban hành.",
          "learnings": [
            "Soạn nháp chính sách/nội quy",
            "Khung tiêu chí đánh giá",
            "Rà rủi ro pháp lý"
          ],
          "attachedFile": {
            "name": "noi-quy-cong-ty-mau.txt",
            "path": "/files/noi-quy-cong-ty-mau.txt",
            "desc": "Bản nội quy công ty mẫu. Có 1 điều khoản phạt tiền nhân viên — trái Luật Lao động Việt Nam; học viên cần phát hiện và gắn cờ."
          },
          "rubric": [
            {
              "criteria": "Đúng cấu trúc chính sách",
              "maxPoints": 25
            },
            {
              "criteria": "Nội dung hợp lý",
              "maxPoints": 25
            },
            {
              "criteria": "Phát hiện điều khoản trái luật",
              "maxPoints": 30
            },
            {
              "criteria": "Đánh dấu chỗ cần pháp chế",
              "maxPoints": 20
            }
          ]
        },
        {
          "id": "van-hanh-m12",
          "title": "Phân tích dữ liệu nhân sự & ra quyết định",
          "durationMin": 25,
          "level": 3,
          "skills": [
            "phan-tich-du-lieu-ns"
          ],
          "practicePrompt": "Từ bảng dữ liệu nhân sự đính kèm, chỉ ra 3 điểm bất thường (đi muộn nhiều, nghỉ bất thường, OT cao) và đề xuất hành động cho mỗi điểm.",
          "content": "AI hỗ trợ đọc bảng chấm công, turnover, chi phí nhân sự → tìm bất thường, tóm tắt cho ban giám đốc. AI đọc số, con người diễn giải bối cảnh và quyết định.",
          "learnings": [
            "Đọc & tóm tắt bảng số liệu",
            "Phát hiện bất thường",
            "Đề xuất hành động dựa trên dữ liệu"
          ],
          "attachedFile": {
            "name": "du-lieu-nhan-su-mau.csv",
            "path": "/files/du-lieu-nhan-su-mau.csv",
            "desc": "Dữ liệu nhân sự theo phòng (headcount, turnover, đi muộn, OT) — đã ẩn tên. Có 1 con số bất thường có thể do lỗi nhập liệu; đừng kết luận vội, nêu là điểm cần xác minh."
          },
          "rubric": [
            {
              "criteria": "Đọc đúng số liệu",
              "maxPoints": 25
            },
            {
              "criteria": "Tìm đúng bất thường",
              "maxPoints": 30
            },
            {
              "criteria": "Không kết luận vội/bịa",
              "maxPoints": 25
            },
            {
              "criteria": "Đề xuất hành động hợp lý",
              "maxPoints": 20
            }
          ]
        },
        {
          "id": "van-hanh-m13",
          "title": "C&B & kiểm tra bảng lương an toàn",
          "durationMin": 25,
          "level": 3,
          "skills": [
            "cb-tinh-luong",
            "an-toan-du-lieu"
          ],
          "practicePrompt": "Kiểm tra bảng lương đính kèm: công thức 'thực nhận' có nhất quán với (gross − khấu trừ) không? Chỉ ra dòng sai. Dữ liệu đã ẩn tên.",
          "content": "AI giúp giải thích cấu trúc lương, kiểm tra công thức, phát hiện sai sót tính toán. ĐẶC BIỆT QUAN TRỌNG: lương là dữ liệu nhạy cảm — luôn ẩn danh (bỏ tên, mã NV) trước khi đưa lên công cụ AI công cộng.",
          "learnings": [
            "Hiểu cấu trúc lương gross/net",
            "Kiểm tra công thức & sai sót",
            "An toàn dữ liệu lương"
          ],
          "attachedFile": {
            "name": "bang-luong-mau.csv",
            "path": "/files/bang-luong-mau.csv",
            "desc": "Bảng lương mẫu (đã ẩn tên, chỉ còn mã ẩn danh). Có 1 dòng sai: thực nhận ≠ gross − khấu trừ. Học viên cần tìm ra."
          },
          "rubric": [
            {
              "criteria": "Tìm đúng dòng sai",
              "maxPoints": 30
            },
            {
              "criteria": "Giải thích công thức đúng",
              "maxPoints": 25
            },
            {
              "criteria": "Cảnh báo ẩn danh dữ liệu lương",
              "maxPoints": 25
            },
            {
              "criteria": "Không bịa số",
              "maxPoints": 20
            }
          ]
        },
        {
          "id": "van-hanh-m14",
          "title": "Thiết kế đào tạo & L&D với mục tiêu SMART",
          "durationMin": 20,
          "level": 2,
          "skills": [
            "dao-tao-ld"
          ],
          "practicePrompt": "Thiết kế outline buổi đào tạo 2 giờ về 'An toàn lao động' cho nhân viên mới: mục tiêu (đo được), nội dung từng phần, 3 câu quiz cuối buổi.",
          "content": "AI giúp soạn outline khóa đào tạo, tạo quiz kiểm tra, lộ trình onboarding kiến thức, tài liệu hướng dẫn. Mục tiêu đào tạo cần đo được (SMART).",
          "learnings": [
            "Soạn outline đào tạo",
            "Tạo quiz/đánh giá",
            "Đặt mục tiêu học tập đo được"
          ],
          "attachedFile": {
            "name": "ke-hoach-dao-tao-mau.txt",
            "path": "/files/ke-hoach-dao-tao-mau.txt",
            "desc": "Brief kế hoạch đào tạo mẫu. Mục tiêu viết mơ hồ ('giúp nhân viên hiểu hơn') — học viên cần biến thành mục tiêu SMART đo được."
          },
          "rubric": [
            {
              "criteria": "Outline rõ, logic",
              "maxPoints": 30
            },
            {
              "criteria": "Mục tiêu SMART đo được",
              "maxPoints": 30
            },
            {
              "criteria": "Quiz bám nội dung",
              "maxPoints": 25
            },
            {
              "criteria": "Phù hợp đối tượng",
              "maxPoints": 15
            }
          ]
        }
      ],
      "starterKit": {
        "prompts": [
          {
            "title": "Tóm tắt biên bản họp",
            "prompt": "Tóm tắt biên bản sau thành: (1) chủ đề chính, (2) quyết định đã chốt, (3) đầu việc + người chịu trách nhiệm + deadline, (4) việc còn vướng. [DÁN BIÊN BẢN]"
          },
          {
            "title": "Email từ chối lịch sự",
            "prompt": "Soạn email từ chối [DỊCH VỤ/ỨNG VIÊN/ĐỀ XUẤT] một cách lịch sự, tôn trọng, ≤80 từ. Có gợi ý hướng khác nếu phù hợp."
          },
          {
            "title": "Checklist quy trình mới",
            "prompt": "Tạo checklist chi tiết cho quy trình [MÔ TẢ]. Có bước, người phụ trách, thời gian dự kiến. Dạng bảng."
          }
        ],
        "tools": [
          {
            "name": "ChatGPT",
            "color": "#10A37F",
            "desc": "Soạn email, quy trình, checklist.",
            "useFor": "Soạn quy trình & email mẫu"
          },
          {
            "name": "Claude",
            "color": "#D97757",
            "desc": "Tóm tắt tài liệu, biên bản dài.",
            "useFor": "Tóm tắt biên bản họp, đọc SOP"
          },
          {
            "name": "Copilot",
            "color": "#0F6CBD",
            "desc": "Hỗ trợ ngay trong Word/Excel/Outlook.",
            "useFor": "Soạn & tóm tắt trong bộ Office"
          },
          {
            "name": "Zapier",
            "color": "#FF4F00",
            "desc": "Tự động nối các phần mềm với nhau.",
            "useFor": "Tự chuyển dữ liệu giữa các app"
          }
        ]
      },
      "quiz": [
        {
          "question": "Việc lặp đi lặp lại nào AI giúp được nhiều nhất?",
          "options": [
            "Soạn đi soạn lại email thông báo theo mẫu",
            "Quyết định tuyển ai vào công ty",
            "Ký hợp đồng",
            "Thay bạn họp với sếp"
          ],
          "correctIndex": 0,
          "explanation": "AI giỏi các việc lặp lại theo mẫu (email, tóm tắt, phân loại) — giải phóng thời gian cho việc cần phán đoán."
        },
        {
          "question": "Bạn nhờ AI tóm tắt một biên bản họp dài. Bước quan trọng sau đó?",
          "options": [
            "Tin tuyệt đối bản tóm tắt",
            "Đọc lại & đối chiếu các đầu việc/điểm quan trọng",
            "Xóa biên bản gốc",
            "Gửi ngay cho cả công ty"
          ],
          "correctIndex": 1,
          "explanation": "Luôn kiểm tra lại bản tóm tắt, nhất là các đầu việc và con số quan trọng trước khi dùng."
        },
        {
          "question": "Điều nào KHÔNG nên làm khi dùng AI trong công việc?",
          "options": [
            "Dùng AI để soạn nháp email",
            "Đưa toàn bộ dữ liệu khách hàng & hợp đồng mật lên công cụ công cộng",
            "Nhờ AI tóm tắt tài liệu công khai",
            "Hỏi AI cách dùng phần mềm"
          ],
          "correctIndex": 1,
          "explanation": "Không đưa dữ liệu mật/cá nhân lên công cụ AI công cộng. Dùng cho việc chung công khai thì an toàn."
        },
        {
          "question": "Khi dùng AI soạn nội quy/chính sách công ty, điều BẮT BUỘC là gì?",
          "options": [
            "Ban hành ngay vì AI viết chuẩn",
            "Người + pháp chế rà lại tính hợp pháp trước khi áp dụng",
            "Sao chép nội quy công ty khác",
            "Giữ bí mật không cho nhân viên biết"
          ],
          "correctIndex": 1,
          "explanation": "AI có thể viết sai/thiếu so với luật; trách nhiệm pháp lý thuộc con người."
        },
        {
          "question": "Khi AI chỉ ra một con số bất thường trong dữ liệu nhân sự, HR nên làm gì?",
          "options": [
            "Tin ngay và xử lý nhân viên",
            "Xác minh nguồn gốc (có thể lỗi nhập) trước khi kết luận",
            "Bỏ qua vì AI hay sai",
            "Công khai cho cả công ty"
          ],
          "correctIndex": 1,
          "explanation": "Số bất thường có thể do lỗi dữ liệu; cần kiểm chứng trước khi ra quyết định ảnh hưởng con người."
        },
        {
          "question": "Trước khi nhờ AI công cộng kiểm tra bảng lương, việc BẮT BUỘC là gì?",
          "options": [
            "Gửi nguyên file có tên + số tài khoản cho nhanh",
            "Ẩn danh: bỏ tên, mã NV, số tài khoản — chỉ giữ số liệu cần tính",
            "Không cần, lương không nhạy cảm",
            "Đăng lên nhóm chung để nhiều người xem"
          ],
          "correctIndex": 1,
          "explanation": "Lương + thông tin định danh là dữ liệu nhạy cảm; phải ẩn danh trước khi đưa lên công cụ AI công cộng."
        },
        {
          "question": "Mục tiêu đào tạo nào sau đây 'đo được' (tốt nhất)?",
          "options": [
            "Giúp nhân viên hiểu hơn về an toàn",
            "Sau buổi học, 90% nhân viên đạt ≥8/10 bài kiểm tra an toàn lao động",
            "Nâng cao nhận thức chung",
            "Làm nhân viên yêu thích công ty"
          ],
          "correctIndex": 1,
          "explanation": "Mục tiêu tốt phải cụ thể, đo lường được — nền tảng để đánh giá hiệu quả đào tạo."
        }
      ]
    },
    "khac": {
      "id": "khac",
      "label": "Nhân viên văn phòng",
      "shortLabel": "Văn phòng / Khác",
      "icon": "💼",
      "color": "#6B5B95",
      "modules": [
        {
          "id": "khac-m1",
          "title": "AI là gì? Nó giúp được gì cho nhân viên văn phòng",
          "durationMin": 15,
          "level": 1,
          "content": "AI giúp bạn xử lý nhanh email, tóm tắt tài liệu, lên checklist công việc — những việc lặp lại mỗi ngày. Bạn ra lệnh rõ, AI làm nháp, bạn duyệt rồi gửi.",
          "learnings": [
            "Hiểu AI bằng ngôn ngữ đời thường",
            "3 việc AI làm tốt cho văn phòng",
            "Điều AI không thay được con người"
          ]
        },
        {
          "id": "khac-m2",
          "title": "Viết email & tin nhắn công việc bằng AI",
          "durationMin": 20,
          "level": 1,
          "content": "Prompt tốt = vai trò + bối cảnh + yêu cầu. VD: 'Bạn là nhân viên hành chính. Viết email nhắc họp lúc 14h thứ Sáu, giọng lịch sự, ≤100 từ, có link phòng họp.'",
          "learnings": [
            "Cấu trúc prompt email",
            "Giọng văn phù hợp tình huống",
            "Luôn đọc lại trước khi gửi"
          ]
        },
        {
          "id": "khac-m3",
          "title": "Tóm tắt tài liệu & biên bản dài",
          "durationMin": 20,
          "level": 2,
          "content": "Dán nội dung (đã ẩn danh) → nhờ AI tóm tắt 5 ý chính + đầu việc + deadline. Tiết kiệm 20–30 phút mỗi lần đọc tài liệu dài.",
          "learnings": [
            "Tóm tắt có cấu trúc",
            "Trích đầu việc & deadline",
            "Ẩn danh dữ liệu nhạy cảm"
          ]
        },
        {
          "id": "khac-m4",
          "title": "Lên checklist & kế hoạch tuần",
          "durationMin": 20,
          "level": 2,
          "content": "Liệt kê việc cần làm → AI gợi ý thứ tự ưu tiên, chia theo ngày, nhắc deadline. Dùng cho công việc cá nhân hoặc hỗ trợ team nhỏ.",
          "learnings": [
            "Ưu tiên công việc",
            "Chia việc theo ngày",
            "Theo dõi deadline"
          ]
        },
        {
          "id": "khac-m5",
          "title": "Họp & ghi chú nhanh với AI",
          "durationMin": 20,
          "level": 3,
          "content": "Ghi chú thô trong họp → AI soạn biên bản: chủ đề, quyết định, người phụ trách, việc cần làm. Gửi team trong 10 phút sau họp.",
          "learnings": [
            "Biên bản họp gọn",
            "Phân công rõ ràng",
            "Gửi sớm sau họp"
          ]
        },
        {
          "id": "khac-m6",
          "title": "An toàn dữ liệu khi dùng AI",
          "durationMin": 15,
          "level": 3,
          "content": "Không đưa lương, hợp đồng mật, CMND, mật khẩu lên công cụ AI công cộng. Mô tả tình huống chung, ẩn tên khách hàng.",
          "learnings": [
            "Dữ liệu không nên paste",
            "Ẩn danh khi hỏi AI",
            "Kiểm tra lại kết quả"
          ]
        }
      ],
      "starterKit": {
        "prompts": [
          {
            "title": "Email nhắc deadline",
            "prompt": "Viết email nhắc đồng nghiệp nộp báo cáo trước [NGÀY], giọng thân thiện, ≤80 từ, có bullet việc cần nộp."
          },
          {
            "title": "Tóm tắt tài liệu",
            "prompt": "Tóm tắt văn bản sau thành: (1) 3 ý chính, (2) việc cần làm, (3) deadline nếu có. [DÁN NỘI DUNG]"
          },
          {
            "title": "Checklist công việc tuần",
            "prompt": "Từ danh sách việc: [LIỆT KÊ]. Sắp xếp theo ưu tiên, gợi ý chia 5 ngày làm việc, dạng bảng."
          }
        ],
        "tools": [
          {
            "name": "ChatGPT",
            "color": "#10A37F",
            "desc": "Soạn email, tóm tắt, checklist.",
            "useFor": "Email & tài liệu hằng ngày"
          },
          {
            "name": "Claude",
            "color": "#D97757",
            "desc": "Tóm tắt văn bản dài, biên bản.",
            "useFor": "Đọc & tóm tắt tài liệu"
          },
          {
            "name": "Copilot",
            "color": "#0F6CBD",
            "desc": "Hỗ trợ trong Word, Excel, Outlook.",
            "useFor": "Soạn thảo trong Office"
          },
          {
            "name": "Notion AI",
            "color": "#000000",
            "desc": "Ghi chú & tổ chức việc team.",
            "useFor": "Wiki nội bộ & task list"
          }
        ]
      },
      "quiz": [
        {
          "question": "Việc nào AI giúp nhân viên văn phòng hiệu quả nhất?",
          "options": [
            "Soạn nháp email và tóm tắt tài liệu",
            "Quyết định sa thải nhân viên",
            "Ký hợp đồng thay sếp",
            "Thay bạn đi họp với khách"
          ],
          "correctIndex": 0,
          "explanation": "AI mạnh ở việc lặp lại theo mẫu: email, tóm tắt, checklist — giải phóng thời gian cho việc cần phán đoán."
        },
        {
          "question": "Bạn nhờ AI tóm tắt biên bản họp. Bước quan trọng sau đó?",
          "options": [
            "Gửi ngay không đọc",
            "Đối chiếu đầu việc và deadline với ghi chú gốc",
            "Xóa biên bản gốc",
            "Đăng lên mạng xã hội"
          ],
          "correctIndex": 1,
          "explanation": "Luôn kiểm tra lại — AI có thể bỏ sót hoặc hiểu sai chi tiết quan trọng."
        },
        {
          "question": "Điều KHÔNG nên làm khi dùng AI ở công ty?",
          "options": [
            "Dùng AI soạn nháp email nội bộ",
            "Paste toàn bộ hồ sơ nhân sự mật lên ChatGPT công cộng",
            "Hỏi AI cách dùng Excel",
            "Nhờ AI lên checklist tuần"
          ],
          "correctIndex": 1,
          "explanation": "Dữ liệu nhân sự, lương, hợp đồng mật không đưa lên công cụ AI công cộng."
        }
      ]
    }
  },
  "skillLabels": {
    "nen-tang-ai": "Nền tảng AI cơ bản",
    "viet-prompt": "Viết prompt hiệu quả",
    "an-toan-du-lieu": "An toàn dữ liệu khi dùng AI",
    "van-ban-hanh-chinh": "Soạn văn bản hành chính",
    "loc-cv": "Lọc CV tuyển dụng",
    "email-noi-bo": "Viết email nội bộ",
    "cham-cong-nghi-phep": "Chấm công & nghỉ phép",
    "tom-tat-tai-lieu": "Tóm tắt tài liệu & biên bản",
    "danh-gia-chinh-sach": "Đánh giá & chính sách nhân sự",
    "phan-tich-du-lieu-ns": "Phân tích dữ liệu nhân sự",
    "cb-tinh-luong": "C&B & kiểm tra bảng lương",
    "dao-tao-ld": "Thiết kế đào tạo / L&D",
    "hr-nen-tang": "Nền tảng Claude cho HR",
    "hr-tuyen-dung": "Tuyển dụng & sàng lọc ứng viên",
    "hr-onboarding-ld": "Onboarding & Đào tạo (L&D)",
    "hr-cb-luong": "C&B, tính lương & phúc lợi",
    "hr-hieu-suat": "Đánh giá hiệu suất & KPI/OKR",
    "hr-quan-he-chinh-sach": "Quan hệ lao động & chính sách",
    "hr-hanh-chinh-ops": "HR Ops, hành chính & soạn thảo",
    "hr-phan-tich-du-lieu": "Phân tích dữ liệu HR & báo cáo",
    "hr-tu-dong-hoa": "Tự động hóa & năng suất HR"
  }
};
