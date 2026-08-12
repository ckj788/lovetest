import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SignalQuiz - Is he into you or are you delulu? | Relationship Diagnosis",
  description: "Decode his unspoken intent using 8 behavioral proofs. Measure raw attraction, effort, commitment, and roster status with Co-Star level precision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-mbti-purple/20 selection:text-mbti-purple">
        {children}
      </body>
    </html>
  );
}
