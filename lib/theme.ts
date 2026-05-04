/** Cookie controlling server-rendered theme class on `<html>`. Non-HttpOnly so the client toggle can update it. */
export const THEME_COOKIE = "roadmap-theme";

export type ThemePreference = "light" | "dark";

export function themePreferenceFromCookie(raw: string | undefined): ThemePreference {
  return raw === "light" ? "light" : "dark";
}
