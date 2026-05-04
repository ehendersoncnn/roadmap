"use client";

import type { RoadmapCardData } from "@/lib/roadmap-data";
import { StatusChip } from "@/components/StatusChip";

export function RoadmapCard({ card }: { card: RoadmapCardData }) {
  return (
    <article
      tabIndex={0}
      className="group rounded-lg border border-zinc-800 bg-surface/80 p-3 shadow-sm outline-none transition duration-200 hover:-translate-y-0.5 hover:border-cnn-red/80 hover:shadow-[0_12px_40px_-12px_rgba(204,0,0,0.35)] focus-visible:ring-2 focus-visible:ring-cnn-red/70"
    >
      <div className="mb-2 flex flex-wrap gap-1.5">
        {card.statuses.map((status, index) => (
          <StatusChip key={`${status}-${index}`} status={status} />
        ))}
      </div>
      <p className="text-sm font-medium leading-snug text-zinc-100">{card.label}</p>
    </article>
  );
}
