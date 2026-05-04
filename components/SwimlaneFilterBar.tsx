"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { SwimlaneId } from "@/lib/roadmap-data";
import { SWIMLANES } from "@/lib/roadmap-data";
import {
  ROADMAP_HIDDEN_LANES_COOKIE,
  sanitizeHiddenSwimlanes,
  serializeRoadmapHiddenLanes,
} from "@/lib/preference-cookies";
import { writeRoadmapUiCookie } from "@/lib/write-roadmap-cookie";

type SwimlaneFilterBarProps = {
  hiddenLaneIds: SwimlaneId[];
};

export function SwimlaneFilterBar({ hiddenLaneIds }: SwimlaneFilterBarProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const hidden = new Set(hiddenLaneIds);

  function commit(nextHidden: SwimlaneId[]) {
    const safe = sanitizeHiddenSwimlanes(nextHidden);
    const value = encodeURIComponent(serializeRoadmapHiddenLanes(safe));
    writeRoadmapUiCookie(ROADMAP_HIDDEN_LANES_COOKIE, value);
    startTransition(() => {
      router.refresh();
    });
  }

  function setLaneVisible(id: SwimlaneId, visible: boolean) {
    const next = new Set(hidden);
    if (visible) next.delete(id);
    else next.add(id);

    if (visible === false) {
      const visibleCount = SWIMLANES.filter((l) => !next.has(l.id)).length;
      if (visibleCount === 0) return;
    }

    commit([...next]);
  }

  function showAll() {
    commit([]);
  }

  return (
    <div className="no-print mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-zinc-200 bg-surface/40 px-3 py-2 text-[11px] dark:border-zinc-800/80">
      <span className="font-semibold uppercase tracking-wide text-muted">
        Swimlanes
      </span>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        {SWIMLANES.map((lane) => {
          const checked = !hidden.has(lane.id);
          return (
            <label
              key={lane.id}
              className="inline-flex cursor-pointer items-center gap-1.5 text-zinc-800 dark:text-zinc-200"
            >
              <input
                type="checkbox"
                className="h-3.5 w-3.5 rounded border-zinc-400 text-cnn-red focus:ring-cnn-red/40 dark:border-zinc-600"
                checked={checked}
                disabled={pending}
                onChange={(e) => setLaneVisible(lane.id, e.target.checked)}
              />
              <span className="max-w-[12rem] truncate sm:max-w-none">{lane.label}</span>
            </label>
          );
        })}
      </div>
      <button
        type="button"
        disabled={pending || hidden.size === 0}
        onClick={showAll}
        className="ml-auto text-[11px] font-medium text-cnn-red underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:opacity-40"
      >
        Show all
      </button>
    </div>
  );
}
