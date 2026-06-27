import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Quiz Battle — Game gắn kết",
  description: "Quiz AI thi đấu thời gian thực cho buổi sáng thứ 2 gắn kết đội ngũ.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
