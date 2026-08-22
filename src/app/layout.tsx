import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { PostHogProvider } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "mixedsigns - Are they into you or are you delulu? | Relationship Signal Engine",
  description: "Decode their unspoken intent using 8 behavioral proofs. Measure natural attraction, time & effort, commitment intent, and exclusive focus with precision.",
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
          <Analytics />
        </PostHogProvider>
      </body>
    </html>
  );
}

