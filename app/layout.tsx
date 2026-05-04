import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import {
  THEME_COOKIE,
  themePreferenceFromCookie,
} from "@/lib/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Content Engagement Roadmap",
  description:
    "CNN Content Engagement — Catch-Up Phase 1 through Phase 2 strategy roadmap (draft).",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = themePreferenceFromCookie(
    cookieStore.get(THEME_COOKIE)?.value,
  );
  const htmlClass =
    `${geistSans.variable} ${geistMono.variable} h-full antialiased` +
    (theme === "dark" ? " dark" : "");

  return (
    <html lang="en" className={htmlClass} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground transition-colors duration-150">
        {children}
      </body>
    </html>
  );
}
