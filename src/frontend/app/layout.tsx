import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Trợ Lý Doanh Nghiệp",
  description: "Company AI learning workspace for SME teams"
};

export const viewport: Viewport = {
  themeColor: "#f7f8f8"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
