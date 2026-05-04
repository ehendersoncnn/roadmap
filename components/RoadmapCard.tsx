"use client";

import type { RoadmapCardData } from "@/lib/roadmap-data";
import { StatusChip } from "@/components/StatusChip";

export function RoadmapCard({ card }: { card: RoadmapCardData }) {
  return (
    <article
      tabIndex={0}
      className="group rounded-lg border border-zinc-200 bg-white/90 p-2.5 shadow-sm outline-none transition duration-200 hover:-translate-y-0.5 hover:border-cnn-red/70 hover:shadow-[0_12px_40px_-12px_rgba(204,0,0,0.22)] focus-visible:ring-2 focus-visible:ring-cnn-red/60 dark:border-zinc-800 dark:bg-surface/80 dark:hover:border-cnn-red/80 dark:hover:shadow-[0_12px_40px_-12px_rgba(204,0,0,0.35)]"
    >
      <div className="mb-1.5 flex flex-wrap gap-1">
        {card.statuses.map((status, index) => (
          <StatusChip key={`${status}-${index}`} status={status} />
        ))}
      </div>
      <p className="text-[13px] font-medium leading-snug text-zinc-900 dark:text-zinc-100">
        {card.label}
      </p>
    </article>
  );
}
