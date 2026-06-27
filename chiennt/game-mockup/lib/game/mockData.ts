// Dữ liệu mẫu cho mock-up: câu hỏi AI (đa dạng dạng) + bots theo phòng ban.
// Sau này thay bằng dữ liệu từ Supabase (game_questions, game_players).

import { Player, Question } from "./types";

export const MOCK_QUESTIONS: Question[] = [
  {
    id: "q1",
    type: "mcq",
    prompt: "RAG trong AI là viết tắt của cụm từ nào?",
    options: [
      "Retrieval-Augmented Generation",
      "Random Access Grouping",
      "Rapid AI Gateway",
      "Recurrent Adaptive Graph",
    ],
    correctIndex: 0,
    timeLimitSec: 20,
    topicTag: "RAG",
    funFact:
      "RAG cho mô hình 'tra cứu' tài liệu thật trước khi trả lời, giúp giảm bịa đặt (hallucination).",
  },
  {
    id: "q2",
    type: "truefalse",
    prompt: "Đúng hay Sai: Prompt càng dài thì kết quả của AI luôn càng tốt.",
    options: ["Đúng", "Sai"],
    correctIndex: 1,
    timeLimitSec: 15,
    topicTag: "Prompting",
    funFact:
      "Chất lượng prompt nằm ở sự RÕ RÀNG (vai trò, bối cảnh, ràng buộc), không phải độ dài.",
  },
  {
    id: "q3",
    type: "guess",
    prompt:
      "Bạn yêu cầu: 'Tóm tắt trong đúng 1 từ cảm xúc của: Tôi vừa được thăng chức!'. AI thường trả lời gì nhất?",
    options: ["Vui", "Một đoạn văn dài", "Xin lỗi tôi không biết", "404"],
    correctIndex: 0,
    timeLimitSec: 20,
    topicTag: "LLM behavior",
    funFact:
      "Khi ràng buộc 'đúng 1 từ', mô hình tốt sẽ tuân thủ định dạng — đây là sức mạnh của output constraint.",
  },
  {
    id: "q4",
    type: "mcq",
    prompt: "Hiện tượng AI 'bịa' thông tin nghe có vẻ hợp lý nhưng sai gọi là gì?",
    options: ["Hallucination", "Overfitting", "Tokenization", "Fine-tuning"],
    correctIndex: 0,
    timeLimitSec: 20,
    topicTag: "An toàn AI",
    funFact:
      "Cách giảm hallucination: yêu cầu trích nguồn, dùng RAG, và kiểm chứng lại trước khi tin.",
  },
  {
    id: "q5",
    type: "truefalse",
    prompt:
      "Đúng hay Sai: Nên dán dữ liệu khách hàng nhạy cảm vào chatbot AI công cộng cho nhanh.",
    options: ["Đúng", "Sai"],
    correctIndex: 1,
    timeLimitSec: 15,
    topicTag: "Bảo mật dữ liệu",
    funFact:
      "Luôn ẩn/loại bỏ thông tin nhạy cảm trước khi prompt — đây là nguyên tắc an toàn dữ liệu số 1.",
  },
  {
    id: "q6",
    type: "mcq",
    prompt: "'Token' trong các mô hình ngôn ngữ gần nhất với khái niệm nào?",
    options: [
      "Mẩu văn bản (từ/ký tự) mô hình xử lý",
      "Mật khẩu đăng nhập",
      "Đơn vị tiền điện tử",
      "Một loại GPU",
    ],
    correctIndex: 0,
    timeLimitSec: 20,
    topicTag: "Cơ bản LLM",
    funFact:
      "Chi phí và giới hạn độ dài của LLM thường tính theo token, không phải theo số từ.",
  },
];

export const MOCK_PLAYERS: Player[] = [
  { id: "me", name: "Bạn", department: "Marketing", isBot: false, avatar: "🦊" },
  {
    id: "bot-an",
    name: "An",
    department: "Marketing",
    isBot: true,
    botAccuracy: 0.78,
    avatar: "🐼",
  },
  {
    id: "bot-binh",
    name: "Bình",
    department: "Sales",
    isBot: true,
    botAccuracy: 0.62,
    avatar: "🐯",
  },
  {
    id: "bot-chi",
    name: "Chi",
    department: "Finance",
    isBot: true,
    botAccuracy: 0.7,
    avatar: "🐨",
  },
  {
    id: "bot-dung",
    name: "Dũng",
    department: "Operations",
    isBot: true,
    botAccuracy: 0.55,
    avatar: "🦁",
  },
  {
    id: "bot-em",
    name: "Em",
    department: "Sales",
    isBot: true,
    botAccuracy: 0.66,
    avatar: "🐧",
  },
];

export const HUMAN_PLAYER_ID = "me";
