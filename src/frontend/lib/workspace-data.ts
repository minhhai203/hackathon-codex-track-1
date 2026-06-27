import type { ChatMessage, Department, LearningPath, ManagerSummary, Module, ProgressSummary, Section } from "@/lib/workspace-types";

export const sectionLinks: Array<[Section, string]> = [
  ["learn", "Học viên"],
  ["player", "Bài học"],
  ["tutor", "Trợ lý"],
  ["progress", "Tiến bộ"],
  ["manager", "Quản lý"],
  ["game", "Game"]
];

export const sectionIds = sectionLinks.map(([id]) => id);

export const sectionMeta: Record<Section, { title: string; description: string }> = {
  learn: {
    title: "Gán lộ trình học",
    description: "Chấm level, chọn phòng ban và tạo lộ trình từ catalog thật khi Supabase sẵn sàng."
  },
  player: {
    title: "Bài học đang mở",
    description: "Mô phỏng lesson player, thực hành và nộp bài trong một màn làm việc."
  },
  tutor: {
    title: "Trợ lý học tập",
    description: "Chat theo module đang học, có context từ lộ trình hiện tại."
  },
  progress: {
    title: "Theo dõi tiến bộ",
    description: "Xem module đã hoàn thành, giờ tiết kiệm và bước học tiếp theo."
  },
  manager: {
    title: "Dashboard quản lý",
    description: "Theo dõi phòng ban, học viên cần hỗ trợ và tín hiệu vận hành."
  },
  game: {
    title: "Trò chơi học tập",
    description: "Trò chơi giải đố kết hợp rèn luyện và kiểm tra kiến thức về AI."
  }
};

export const fallbackModules: Module[] = [
  {
    module_id: "foundation-ai-safety",
    title: "AI Safety And Data Boundaries",
    role_id: "common",
    level: 1,
    outcome: "Nhận biết dữ liệu không nên đưa vào công cụ AI.",
    tags: ["safety", "governance"],
    starter_kit: ["Redact dữ liệu cá nhân", "Kiểm tra độ nhạy trước khi prompt"]
  },
  {
    module_id: "foundation-prompt-basics",
    title: "Prompt Basics For Daily Work",
    role_id: "common",
    level: 1,
    outcome: "Biến công việc hằng ngày thành prompt rõ vai trò, bối cảnh và đầu ra.",
    tags: ["prompting", "workflow"],
    starter_kit: ["Nêu định dạng đầu ra", "Thêm vai trò và ràng buộc"]
  },
  {
    module_id: "marketing-content-planning",
    title: "AI For Content Planning",
    role_id: "marketing",
    level: 2,
    outcome: "Lập theme nội dung và brief sản xuất bằng AI.",
    tags: ["marketing", "content"],
    starter_kit: ["Lập theme theo tuần", "Tạo góc nội dung"]
  },
  {
    module_id: "sales-discovery-ai",
    title: "AI For Sales Discovery",
    role_id: "kinh-doanh",
    level: 2,
    outcome: "Chuẩn bị câu hỏi discovery và ghi chú khách hàng.",
    tags: ["sales", "customer"],
    starter_kit: ["Soạn câu hỏi discovery", "Tóm tắt call notes"]
  }
];

export const fallbackPath: LearningPath = {
  modules: fallbackModules,
  reasons: [
    "Bắt đầu bằng an toàn dữ liệu trước khi dùng AI cho công việc thật.",
    "Prompt căn bản là nền cho mọi phòng ban.",
    "Module role-specific giúp demo tác động theo công việc.",
    "Giữ sprint đầu nhỏ và dễ chứng minh."
  ],
  starter_kit: [
    "Redact private fields before prompting.",
    "Ask for output format first.",
    "Turn campaign goals into weekly themes.",
    "Draft discovery questions."
  ],
  confidence: 82,
  warnings: ["Next.js API đang dùng dữ liệu demo cục bộ cho đến khi Supabase được kết nối."],
  source: "demo"
};

export const fallbackManager: ManagerSummary = {
  organization_name: "Nội thất Mộc An",
  team_size: 39,
  average_completion: 41,
  total_hours_saved: 84.5,
  top_department: "Marketing",
  at_risk_employees: ["Phạm Thu Hà", "Vũ Thị Lan"],
  department_counts: {
    "Nhân sự": 12,
    "Kinh doanh": 8,
    Marketing: 6,
    "Kế toán": 4,
    "Vận hành": 6,
    "Ban giám đốc": 3
  },
  last_team_activity: [
    "Marketing hoàn thành campaign brief draft",
    "Kinh doanh dùng AI tóm tắt discovery calls",
    "Kế toán tự động hóa variance notes"
  ]
};

export const fallbackProgress: ProgressSummary = {
  completion_percent: 38,
  completed_modules: ["foundation-ai-safety", "foundation-prompt-basics"],
  next_modules: fallbackModules.slice(2),
  hours_saved: 12.5,
  recent_activity: ["Hoàn thành Prompt Basics", "Nộp bài thực hành dữ liệu an toàn"]
};

export const departments: Department[] = [
  { id: "nhan-su", name: "Nhân sự", course: "AI cho Nhân sự", progress: 58, seats: 12, tone: "teal" },
  { id: "kinh-doanh", name: "Kinh doanh", course: "AI cho Sales", progress: 33, seats: 8, tone: "blue" },
  { id: "marketing", name: "Marketing", course: "AI cho Marketing", progress: 40, seats: 6, tone: "violet" },
  { id: "ke-toan", name: "Kế toán", course: "AI cho Kế toán", progress: 25, seats: 4, tone: "amber" },
  { id: "van-hanh", name: "Vận hành", course: "AI cho Vận hành", progress: 0, seats: 6, tone: "olive" },
  { id: "cskh", name: "CSKH", course: "AI cho CSKH", progress: 18, seats: 6, tone: "rose" }
];

export const learners = [
  ["Trần Thị Mai", "Nhân sự", "AI cho HR", "Cấp 3", 62, "Hôm nay", "Đang học"],
  ["Nguyễn Thị An", "Nhân sự", "AI cho HR", "Cấp 4", 80, "Hôm nay", "Đang học"],
  ["Đỗ Minh Quân", "Ban giám đốc", "AI cho Chủ DN", "Cấp 5", 95, "Hôm nay", "Sắp xong"],
  ["Lê Văn Hùng", "Kinh doanh", "AI cho Sales", "Cấp 2", 45, "Hôm qua", "Đang học"],
  ["Phạm Thu Hà", "Kinh doanh", "AI cho Sales", "Cấp 1", 20, "3 ngày trước", "Chậm tiến độ"],
  ["Vũ Thị Lan", "Vận hành", "Chưa gán", "-", 0, "-", "Chưa bắt đầu"]
] as const;

export const workQueue = [
  ["Chấm onboarding", "Nguyễn Thị An", "Hôm nay"],
  ["Gán khóa Sales", "Lê Văn Hùng", "Hôm nay"],
  ["Nhắc học viên chậm", "Phạm Thu Hà", "3 ngày"],
  ["Duyệt bài thực hành", "Marketing", "2 bài"]
] as const;

export const initialMessages: ChatMessage[] = [
  {
    id: "hello",
    role: "ai",
    text: "Chào chị An. Em đang nạp lộ trình, bài học và bối cảnh công việc để trả lời trong phạm vi khóa học."
  },
  {
    id: "starter",
    role: "me",
    text: "Soạn prompt để Claude chấm 5 CV theo JD Nhân viên tuyển dụng."
  },
  {
    id: "starter-response",
    role: "ai",
    text: "Hãy dùng cấu trúc: vai trò người chấm, JD rút gọn, tiêu chí điểm, định dạng bảng. Nhớ ẩn dữ liệu cá nhân trước khi dán CV."
  }
];
