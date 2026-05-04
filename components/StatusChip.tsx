import type { Status } from "@/lib/roadmap-data";

/** Tailwind class bundles per status — tuned for dark backgrounds. */
export const STATUS_CHIP_STYLES: Record<Status, string> = {
  DISCOVERY:
    "border-sky-500/40 bg-sky-950/60 text-sky-100 ring-1 ring-inset ring-sky-500/20",
  BUILD:
    "border-amber-500/45 bg-amber-950/55 text-amber-100 ring-1 ring-inset ring-amber-500/25",
  TEST:
    "border-violet-500/45 bg-violet-950/55 text-violet-100 ring-1 ring-inset ring-violet-500/25",
  SCALE:
    "border-emerald-500/45 bg-emerald-950/55 text-emerald-100 ring-1 ring-inset ring-emerald-500/25",
};

export function StatusChip({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border ${STATUS_CHIP_STYLES[status]}`}
    >
      {status}
    </span>
  );
}
