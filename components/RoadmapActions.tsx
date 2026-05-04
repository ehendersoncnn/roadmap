"use client";

type RoadmapActionsProps = {
  /** HTTPS link to Notion, Google Doc, Sanity, or other CMS / living source. */
  externalSourceUrl?: string | null;
};

export function RoadmapActions({ externalSourceUrl }: RoadmapActionsProps) {
  function handlePrint() {
    window.print();
  }

  return (
    <div className="no-print flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex h-8 items-center rounded-full border border-zinc-300 bg-white px-3 text-[11px] font-medium text-zinc-800 shadow-sm outline-none transition hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-cnn-red/60 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        Print / PDF
      </button>
      {externalSourceUrl ? (
        <a
          href={externalSourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-8 items-center rounded-full border border-zinc-300 bg-white px-3 text-[11px] font-medium text-cnn-red shadow-sm underline-offset-2 transition hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800"
        >
          CMS / Notion
        </a>
      ) : null}
    </div>
  );
}
