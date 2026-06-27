import { GamePlayer, GameQuestion } from "./types";

export const GAME_ORGANIZATION_ID = "00000000-0000-0000-0000-000000000901";
export const GAME_HOST_USER_ID = "00000000-0000-0000-0000-000000000902";
export const HUMAN_PLAYER_ID = "human-player";

export const demoPlayers: GamePlayer[] = [
  { id: HUMAN_PLAYER_ID, displayName: "Bạn", department: "Marketing", avatar: "AI", role: "employee", isBot: false },
  { id: "bot-an", displayName: "An", department: "Marketing", avatar: "AN", role: "employee", isBot: true, botAccuracy: 0.78 },
  { id: "bot-binh", displayName: "Bình", department: "Kinh doanh", avatar: "BI", role: "employee", isBot: true, botAccuracy: 0.64 },
  { id: "bot-chi", displayName: "Chi", department: "Kế toán", avatar: "CH", role: "employee", isBot: true, botAccuracy: 0.72 },
  { id: "bot-dung", displayName: "Dũng", department: "Vận hành", avatar: "DU", role: "employee", isBot: true, botAccuracy: 0.58 },
  { id: "bot-ha", displayName: "Hà", department: "Nhân sự", avatar: "HA", role: "employee", isBot: true, botAccuracy: 0.68 }
];

export const gameQuestions: GameQuestion[] = [
  {
    id: "ai-rag-basics",
    topic: "RAG",
    type: "mcq",
    prompt: "RAG trong AI thường dùng để làm gì?",
    options: ["Tra cứu tài liệu thật trước khi trả lời", "Tăng kích thước màn hình", "Xóa dữ liệu huấn luyện", "Tự động mua quảng cáo"],
    correctIndex: 0,
    timeLimitSec: 20,
    difficulty: "easy",
    funFact: "RAG giúp câu trả lời có căn cứ hơn vì mô hình được cấp thêm ngữ cảnh từ nguồn dữ liệu thật."
  },
  {
    id: "ai-prompt-length",
    topic: "Prompting",
    type: "truefalse",
    prompt: "Prompt càng dài thì kết quả AI luôn càng tốt.",
    options: ["Đúng", "Sai"],
    correctIndex: 1,
    timeLimitSec: 15,
    difficulty: "easy",
    funFact: "Prompt tốt cần rõ vai trò, bối cảnh, ràng buộc và định dạng đầu ra; độ dài không tự đảm bảo chất lượng."
  },
  {
    id: "ai-hallucination",
    topic: "An toàn AI",
    type: "mcq",
    prompt: "Hiện tượng AI bịa thông tin nghe hợp lý nhưng sai gọi là gì?",
    options: ["Hallucination", "Tokenization", "Fine-tuning", "Embedding"],
    correctIndex: 0,
    timeLimitSec: 18,
    difficulty: "easy",
    funFact: "Giảm hallucination bằng cách yêu cầu nguồn, dùng RAG và kiểm chứng trước khi dùng cho quyết định quan trọng."
  },
  {
    id: "ai-sensitive-data",
    topic: "Bảo mật",
    type: "truefalse",
    prompt: "Có thể dán dữ liệu khách hàng nhạy cảm vào chatbot công cộng nếu chỉ dùng để tóm tắt nhanh.",
    options: ["Đúng", "Sai"],
    correctIndex: 1,
    timeLimitSec: 15,
    difficulty: "easy",
    funFact: "Dữ liệu cá nhân, tài chính, hợp đồng và thông tin nội bộ cần được ẩn hoặc xử lý trong môi trường được kiểm soát."
  },
  {
    id: "ai-token",
    topic: "LLM cơ bản",
    type: "mcq",
    prompt: "Token trong mô hình ngôn ngữ gần nhất với khái niệm nào?",
    options: ["Mẩu văn bản mô hình xử lý", "Mật khẩu đăng nhập", "Đồng tiền điện tử", "Tên một loại GPU"],
    correctIndex: 0,
    timeLimitSec: 20,
    difficulty: "easy",
    funFact: "Chi phí và giới hạn ngữ cảnh của LLM thường tính theo token, không phải số từ."
  },
  {
    id: "ai-output-constraint",
    topic: "Output constraint",
    type: "guess",
    prompt: "Nếu yêu cầu AI: 'Tóm tắt cảm xúc trong đúng 1 từ: Tôi vừa được thăng chức', câu trả lời hợp lý nhất là gì?",
    options: ["Vui", "Một đoạn văn dài", "Không thể trả lời", "404"],
    correctIndex: 0,
    timeLimitSec: 20,
    difficulty: "medium",
    funFact: "Ràng buộc output giúp AI trả lời theo đúng định dạng để dễ dùng trong workflow."
  },
  {
    id: "ai-temperature",
    topic: "Model settings",
    type: "mcq",
    prompt: "Giảm temperature thường làm câu trả lời AI như thế nào?",
    options: ["Ổn định và ít ngẫu nhiên hơn", "Luôn dài hơn", "Không còn cần prompt", "Tự kiểm chứng dữ liệu"],
    correctIndex: 0,
    timeLimitSec: 20,
    difficulty: "medium",
    funFact: "Temperature thấp phù hợp khi cần câu trả lời nhất quán; temperature cao phù hợp hơn cho brainstorming."
  },
  {
    id: "ai-grounding",
    topic: "Grounding",
    type: "truefalse",
    prompt: "Grounding nghĩa là buộc câu trả lời bám vào nguồn/ngữ cảnh được cung cấp.",
    options: ["Đúng", "Sai"],
    correctIndex: 0,
    timeLimitSec: 15,
    difficulty: "medium",
    funFact: "Grounding là thói quen quan trọng trong đào tạo AI doanh nghiệp vì giúp giảm trả lời mơ hồ."
  },
  {
    id: "ai-eval",
    topic: "Đánh giá",
    type: "mcq",
    prompt: "Cách tốt nhất để biết workflow AI có hiệu quả là gì?",
    options: ["Đo bằng tiêu chí và ví dụ thật", "Chỉ nhìn câu trả lời có hay không", "Dùng prompt dài nhất", "Chọn model đắt nhất"],
    correctIndex: 0,
    timeLimitSec: 20,
    difficulty: "medium",
    funFact: "Evaluation cần bộ ví dụ, tiêu chí chấm và so sánh trước/sau để tránh cảm tính."
  },
  {
    id: "ai-role-prompt",
    topic: "Prompting",
    type: "mcq",
    prompt: "Trong prompt công việc, phần 'Bạn là chuyên gia...' chủ yếu giúp gì?",
    options: ["Đặt vai trò và góc nhìn trả lời", "Tăng bảo mật dữ liệu", "Giảm số token về 0", "Bắt buộc AI luôn đúng"],
    correctIndex: 0,
    timeLimitSec: 18,
    difficulty: "easy",
    funFact: "Vai trò giúp mô hình chọn ngôn ngữ, tiêu chí và độ sâu phù hợp hơn với nhiệm vụ."
  },
  {
    id: "ai-human-review",
    topic: "Governance",
    type: "truefalse",
    prompt: "Với nội dung gửi khách hàng, con người vẫn nên review trước khi phát hành.",
    options: ["Đúng", "Sai"],
    correctIndex: 0,
    timeLimitSec: 15,
    difficulty: "easy",
    funFact: "Human-in-the-loop giúp giữ chất lượng, tone thương hiệu và kiểm soát rủi ro pháp lý."
  },
  {
    id: "ai-embedding",
    topic: "Embedding",
    type: "mcq",
    prompt: "Embedding thường được dùng để làm gì trong tìm kiếm AI?",
    options: ["Biểu diễn ý nghĩa văn bản thành vector", "Nén ảnh thành JPG", "Tạo mật khẩu mới", "Chạy thanh toán"],
    correctIndex: 0,
    timeLimitSec: 22,
    difficulty: "hard",
    funFact: "Embedding giúp tìm các đoạn có nghĩa gần nhau, kể cả khi không trùng chính xác từ khóa."
  }
];
