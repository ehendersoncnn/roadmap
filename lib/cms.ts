export function getRoadmapSourceUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_ROADMAP_SOURCE_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.href;
  } catch {
    return null;
  }
}
