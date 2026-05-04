"use client";

import { useCallback, useState } from "react";
import type { ThemePreference } from "@/lib/theme";
import { THEME_COOKIE } from "@/lib/theme";

function persistTheme(preference: ThemePreference) {
  const dark = preference === "dark";
  document.documentElement.classList.toggle("dark", dark);
  document.cookie = `${THEME_COOKIE}=${preference};path=/;max-age=31536000;SameSite=Lax`;
}

type ThemeToggleProps = {
  /** Must match SSR theme on `<html>` (from roadmap-theme cookie). */
  initialIsDark: boolean;
};

export function ThemeToggle({ initialIsDark }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(initialIsDark);

  const toggle = useCallback(() => {
    const preference: ThemePreference = isDark ? "light" : "dark";
    persistTheme(preference);
    setIsDark(preference === "dark");
  }, [isDark]);

  return (
    <div className="flex shrink-0 items-center gap-2">
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={toggle}
        className="inline-flex h-8 cursor-pointer items-center gap-2 rounded-full border border-zinc-300 bg-white px-2.5 text-[11px] font-medium text-zinc-800 shadow-sm outline-none transition hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-cnn-red/60 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        <span
          aria-hidden
          className={`inline-flex h-5 w-9 items-center rounded-full p-0.5 transition ${isDark ? "justify-end bg-cnn-red/90" : "justify-start bg-zinc-300 dark:bg-zinc-600"}`}
        >
          <span className="h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-black/10" />
        </span>
        <span aria-hidden>{isDark ? "Dark" : "Light"}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {isDark ? "Dark theme" : "Light theme"}
      </span>
    </div>
  );
}
