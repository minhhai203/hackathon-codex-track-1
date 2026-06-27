import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
        🤖 AI Quiz Battle
      </h1>
      <p className="text-lg text-white/70">
        Quiz AI thi đấu thời gian thực — gắn kết đội ngũ mỗi sáng thứ 2.
      </p>
      <Link
        href="/game"
        className="rounded-2xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-8 py-4 text-xl font-bold shadow-lg transition hover:scale-105"
      >
        Vào phòng chơi ▶
      </Link>
      <p className="text-sm text-white/40">
        Bản mock-up chạy với bot &amp; dữ liệu mẫu. Sau này thay lớp transport để
        cắm WebSocket + Supabase.
      </p>
    </main>
  );
}
