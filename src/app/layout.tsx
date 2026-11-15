import type { Metadata } from "next";
import { SafeAnalytics } from "../components/SafeAnalytics";
import { PostHogProvider } from "./providers";
import "./globals.css";
import "./design.css";
import "./premium.css";

export const metadata: Metadata = {
  title: "mixedsigns — A little less guessing. A little more clarity.",
  description: "A private reflection tool for ambiguous relationships. Explore observable behavior, compare expectations, and find a grounded next step.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-palette-lilac selection:text-palette-slate">
        <PostHogProvider>
          {children}
          <SafeAnalytics />
        </PostHogProvider>
      </body>
    </html>
  );
}

