"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { KeyDecisionItem } from "@/lib/roadmap-data";
import {
  ROADMAP_RESOLVED_DECISIONS_COOKIE,
  serializeDecisionIds,
} from "@/lib/preference-cookies";
import { writeRoadmapUiCookie } from "@/lib/write-roadmap-cookie";

type KeyDecisionsPanelProps = {
  decisions: KeyDecisionItem[];
  resolvedIds: string[];
};

export function KeyDecisionsPanel({
  decisions,
  resolvedIds,
}: KeyDecisionsPanelProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const resolved = new Set(resolvedIds);

  function commit(nextResolved: Set<string>) {
    const value = encodeURIComponent(serializeDecisionIds([...nextResolved]));
    writeRoadmapUiCookie(ROADMAP_RESOLVED_DECISIONS_COOKIE, value);
    startTransition(() => {
      router.refresh();
    });
  }

  function setResolved(id: string, isResolved: boolean) {
    const next = new Set(resolved);
    if (isResolved) next.add(id);
    else next.delete(id);
    commit(next);
  }

  return (
    <div className="max-h-[min(640px,calc(100vh-4.5rem))] overflow-y-auto overscroll-y-contain rounded-xl border border-zinc-200 bg-white/90 p-4 shadow-[0_0_0_1px_rgba(204,0,0,0.08)] ring-1 ring-cnn-red/10 dark:border-zinc-800 dark:bg-zinc-950/70 dark:shadow-[0_0_0_1px_rgba(204,0,0,0.06)] dark:ring-cnn-red/15 xl:max-h-[calc(100vh-6.5rem)]">
      <h2 id="key-decisions-heading" className="text-[13px] font-semibold text-foreground">
        Key decisions needed
      </h2>
      <ol className="mt-3 list-decimal space-y-2.5 ps-4 text-[12px] leading-snug marker:text-cnn-red">
        {decisions.map((d) => {
          const isResolved = resolved.has(d.id);
          return (
            <li
              key={d.id}
              className={`ps-1 ${isResolved ? "text-zinc-500 line-through decoration-zinc-400 dark:text-zinc-500" : "text-zinc-700 dark:text-zinc-300"}`}
            >
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="no-print mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-zinc-400 text-cnn-red focus:ring-cnn-red/40 dark:border-zinc-600"
                  checked={isResolved}
                  disabled={pending}
                  aria-label={isResolved ? "Mark decision as open" : "Mark decision as resolved"}
                  onChange={(e) => setResolved(d.id, e.target.checked)}
                />
                <span>{d.text}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
