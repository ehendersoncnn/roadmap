/**
 * Persist lightweight UI prefs in readable cookies so the server can honor them
 * (no hydration mismatch vs. toggling purely in localStorage).
 */

import type { KeyDecisionItem, SwimlaneId } from "@/lib/roadmap-data";
import { SWIMLANES } from "@/lib/roadmap-data";

export const ROADMAP_HIDDEN_LANES_COOKIE = "roadmap-hidden-lanes";
export const ROADMAP_RESOLVED_DECISIONS_COOKIE = "roadmap-resolved-decisions";

const ALL_LANE_IDS: SwimlaneId[] = SWIMLANES.map((l) => l.id);

function commaSplitDecoded(raw?: string): string[] {
  if (!raw?.trim()) return [];
  try {
    return decodeURIComponent(raw)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  } catch {
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
}

export function sanitizeHiddenSwimlanes(values: SwimlaneId[]): SwimlaneId[] {
  const valid = new Set(ALL_LANE_IDS);
  const hidden = [...new Set(values)].filter((id): id is SwimlaneId =>
    valid.has(id as SwimlaneId),
  );

  /** If nothing would remain visible, clear the filter entirely. */
  if (hidden.length >= ALL_LANE_IDS.length) return [];

  return hidden;
}

export function parseRoadmapHiddenLanes(raw?: string): SwimlaneId[] {
  return sanitizeHiddenSwimlanes(commaSplitDecoded(raw) as SwimlaneId[]);
}

/** Serialize comma-separated canonical ids for the cookie value (URL-encoded). */
export function serializeRoadmapHiddenLanes(hidden: SwimlaneId[]): string {
  return [...new Set(hidden)].sort().join(",");
}

export function sanitizeResolvedDecisionIds(
  values: string[],
  decisions: KeyDecisionItem[],
): string[] {
  const valid = new Set(decisions.map((d) => d.id));
  return [...new Set(values)].filter((id) => valid.has(id));
}

export function parseRoadmapResolvedDecisions(
  raw: string | undefined,
  decisions: KeyDecisionItem[],
): string[] {
  return sanitizeResolvedDecisionIds(commaSplitDecoded(raw), decisions);
}

export function serializeDecisionIds(ids: string[]): string {
  return [...new Set(ids)].sort().join(",");
}
