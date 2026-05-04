import type { Status } from "@/lib/roadmap-data";

/** Chips need distinct contrast on both light grey and near-black canvases. */
export const STATUS_CHIP_STYLES: Record<Status, string> = {
  DISCOVERY:
    "border-sky-700/35 bg-sky-100 text-sky-950 ring-1 ring-inset ring-sky-600/20 dark:border-sky-500/40 dark:bg-sky-950/60 dark:text-sky-100 dark:ring-sky-500/20",
  BUILD:
    "border-amber-700/35 bg-amber-100 text-amber-950 ring-1 ring-inset ring-amber-600/20 dark:border-amber-500/45 dark:bg-amber-950/55 dark:text-amber-100 dark:ring-amber-500/25",
  TEST:
    "border-violet-700/35 bg-violet-100 text-violet-950 ring-1 ring-inset ring-violet-600/20 dark:border-violet-500/45 dark:bg-violet-950/55 dark:text-violet-100 dark:ring-violet-500/25",
  SCALE:
    "border-emerald-700/35 bg-emerald-100 text-emerald-950 ring-1 ring-inset ring-emerald-600/20 dark:border-emerald-500/45 dark:bg-emerald-950/55 dark:text-emerald-100 dark:ring-emerald-500/25",
};

export function StatusChip({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${STATUS_CHIP_STYLES[status]}`}
    >
      {status}
    </span>
  );
}
