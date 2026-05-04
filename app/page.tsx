import { RoadmapCard } from "@/components/RoadmapCard";
import { StatusChip } from "@/components/StatusChip";
import {
  KEY_DECISIONS,
  QUARTERS,
  QUARTER_NARRATIVE,
  QUARTER_LABELS,
  STATUS_ORDER,
  STRATEGIC_SHIFT,
  SWIMLANES,
  getQuarterRangeLabel,
  roadmapData,
} from "@/lib/roadmap-data";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1760px] px-6 py-8 pb-16 lg:px-10">
        <header className="border-b border-zinc-800/90 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cnn-red">
            CNN · Content Engagement
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight lg:text-[2rem]">
            Product roadmap
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted lg:text-[0.9375rem]">
            Q2&nbsp;2026 through Q1&nbsp;2027 — Catch-Up phased delivery (Phase&nbsp;1 →
            1.5 → 2) and Content Engagement platform alignment. Desktop / slide layout.
          </p>
        </header>

        <section
          className="relative mt-6 overflow-hidden rounded-lg border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-background pl-5 pr-4 py-4 shadow-[inset_4px_0_0_0_#cc0000]"
          aria-labelledby="strategic-shift-heading"
        >
          <h2 id="strategic-shift-heading" className="text-sm font-semibold text-foreground">
            Strategic shift
          </h2>
          <p className="mt-1 text-lg font-semibold tracking-tight text-white">
            {STRATEGIC_SHIFT.headline}
          </p>
          <p className="mt-2 max-w-4xl text-sm leading-relaxed text-zinc-300">
            {STRATEGIC_SHIFT.body}
          </p>
        </section>

        <div className="mt-10 flex flex-col gap-10 xl:flex-row xl:items-start xl:gap-12">
          <div className="min-w-0 flex-1">
            <div className="overflow-x-auto rounded-xl border border-zinc-800/90 bg-zinc-950/40 pb-2 shadow-inner shadow-black/20 [-ms-overflow-style:none] [scrollbar-width:thin]">
              <div
                className="grid min-w-[1040px] grid-cols-[minmax(12rem,14rem)_repeat(4,minmax(11rem,1fr))] divide-x divide-zinc-800/70"
                aria-label="Roadmap by swimlane and quarter"
              >
                <div className="sticky left-0 z-[1] border-r border-zinc-800 bg-zinc-950/95 p-4 backdrop-blur-sm" />

                {QUARTERS.map((quarter) => (
                  <div key={quarter} className="border-b border-zinc-700/90 p-4 pb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-cnn-red">
                      {QUARTER_LABELS[quarter]}
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted">{getQuarterRangeLabel(quarter)}</p>
                    <p className="mt-2 text-xs leading-snug text-zinc-300">
                      {QUARTER_NARRATIVE[quarter]}
                    </p>
                  </div>
                ))}

                {SWIMLANES.map((lane) => (
                  <div key={lane.id} className="contents">
                    <div className="sticky left-0 z-[1] flex items-start gap-3 border-y border-zinc-800 bg-zinc-950/98 p-4 backdrop-blur-sm">
                      <div
                        className="mt-0.5 flex flex-col gap-1.5 py-0.5 pt-1"
                        aria-hidden
                      >
                        <span className="block h-[3px] w-5 shrink-0 rounded-full bg-cnn-red" />
                        <span className="block h-[3px] w-5 shrink-0 rounded-full bg-cnn-red" />
                        <span className="block h-[3px] w-5 shrink-0 rounded-full bg-cnn-red" />
                      </div>
                      <h3 className="text-left text-[13px] font-semibold leading-snug tracking-tight text-zinc-100">
                        {lane.label}
                      </h3>
                    </div>

                    {QUARTERS.map((quarter) => {
                      const cards = roadmapData[lane.id][quarter];
                      return (
                        <div
                          key={`${lane.id}-${quarter}`}
                          className="border-y border-zinc-800 bg-zinc-950/20 px-3 py-3"
                        >
                          <div className="flex flex-col gap-2.5">
                            {cards.map((card, idx) => (
                              <RoadmapCard key={`${lane.id}-${quarter}-${idx}`} card={card} />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <section className="mt-10 rounded-lg border border-zinc-800/80 bg-surface/50 px-4 py-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Legend
              </h2>
              <p className="mt-1 text-xs text-zinc-500">
                Initiative stage along each card (not calendar dates).
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                {STATUS_ORDER.map((status) => (
                  <li key={status} className="flex items-center gap-2">
                    <StatusChip status={status} />
                    <span className="text-[11px] text-zinc-500">
                      {status === "DISCOVERY" && "Exploring scope & constraints"}
                      {status === "BUILD" && "In implementation"}
                      {status === "TEST" && "Validation / rollout prep"}
                      {status === "SCALE" && "Broader rollout & optimization"}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <footer className="mt-8 border-t border-zinc-800/80 pt-6 text-[11px] leading-relaxed text-zinc-500">
              <p>
                Draft for discussion · Content Engagement roadmap · Internal strategy artifact ·
                Last updated&nbsp;May&nbsp;2026
              </p>
              <p className="mt-1">
                Screenshots encouraged for decks; live URL replaces static slide handoffs once
                published.
              </p>
            </footer>
          </div>

          <aside
            className="top-28 w-full shrink-0 xl:sticky xl:max-w-sm xl:self-start"
            aria-labelledby="key-decisions-heading"
          >
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-5 shadow-[0_0_0_1px_rgba(204,0,0,0.06)] ring-1 ring-cnn-red/15">
              <h2 id="key-decisions-heading" className="text-sm font-semibold text-foreground">
                Key decisions needed
              </h2>
              <ol className="mt-4 list-decimal space-y-3 ps-5 text-[13px] leading-snug text-zinc-300 marker:text-cnn-red">
                {KEY_DECISIONS.map((decision, i) => (
                  <li key={i} className="ps-1">
                    {decision}
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
