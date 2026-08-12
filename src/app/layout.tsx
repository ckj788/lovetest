import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SignalQuiz - 测懂他未说出口的关系信号 | 全网爆款恋爱行为测评",
  description: "基于8组核心行为证据与20+行为信号，全方位诊断对方的Attraction、Investment与Commitment关系倾向，提供未来7天实操策略。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased selection:bg-mbti-purple/20 selection:text-mbti-purple">
        {children}
      </body>
    </html>
  );
}
