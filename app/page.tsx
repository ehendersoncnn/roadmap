import { cookies } from "next/headers";
import { RoadmapActions } from "@/components/RoadmapActions";
import { RoadmapCard } from "@/components/RoadmapCard";
import { KeyDecisionsPanel } from "@/components/KeyDecisionsPanel";
import { StatusChip } from "@/components/StatusChip";
import { SwimlaneFilterBar } from "@/components/SwimlaneFilterBar";
import { ThemeToggle } from "@/components/ThemeToggle";
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
import { getRoadmapSourceUrl } from "@/lib/cms";
import {
  ROADMAP_HIDDEN_LANES_COOKIE,
  ROADMAP_RESOLVED_DECISIONS_COOKIE,
  parseRoadmapHiddenLanes,
  parseRoadmapResolvedDecisions,
} from "@/lib/preference-cookies";
import { THEME_COOKIE, themePreferenceFromCookie } from "@/lib/theme";

export default async function Home() {
  const cookieStore = await cookies();
  const theme = themePreferenceFromCookie(cookieStore.get(THEME_COOKIE)?.value);
  const initialIsDark = theme === "dark";

  const hiddenLaneIds = parseRoadmapHiddenLanes(
    cookieStore.get(ROADMAP_HIDDEN_LANES_COOKIE)?.value,
  );
  const hiddenSet = new Set(hiddenLaneIds);
  const visibleLanes = SWIMLANES.filter((l) => !hiddenSet.has(l.id));

  const resolvedDecisionIds = parseRoadmapResolvedDecisions(
    cookieStore.get(ROADMAP_RESOLVED_DECISIONS_COOKIE)?.value,
    KEY_DECISIONS,
  );

  const roadmapSourceUrl = getRoadmapSourceUrl();

  return (
    <div className="flex flex-1 flex-col bg-background text-foreground print:bg-white">
      <div className="mx-auto w-full max-w-[1760px] px-5 py-6 pb-12 lg:px-8">
        <header className="border-b border-zinc-200 pb-4 dark:border-zinc-800/90">
          <div className="flex flex-wrap items-start justify-between gap-3 gap-y-4">
            <div className="min-w-0 max-w-3xl flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cnn-red">
                CNN · Content Engagement
              </p>
              <h1 className="mt-1.5 text-[1.625rem] font-semibold leading-tight tracking-tight lg:text-[1.875rem]">
                Product roadmap
              </h1>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                Q2&nbsp;2026–Q1&nbsp;2027 — Catch-Up phased delivery (Phase&nbsp;1 → Phase&nbsp;1.5
                → Phase&nbsp;2) with Content Engagement platform alignment. Slide-first layout tuned
                for 1920×1080 framing.
              </p>
            </div>
            <div className="no-print flex flex-wrap items-center justify-end gap-2">
              <RoadmapActions externalSourceUrl={roadmapSourceUrl} />
              <ThemeToggle initialIsDark={initialIsDark} />
            </div>
          </div>
        </header>

        <section
          className="relative mt-5 overflow-hidden rounded-lg border border-zinc-200 bg-gradient-to-br from-zinc-100 to-background pl-4 pr-4 py-3 shadow-[inset_4px_0_0_0_#cc0000] dark:border-zinc-800 dark:from-zinc-900/80 dark:to-background"
          aria-labelledby="strategic-shift-heading"
        >
          <h2
            id="strategic-shift-heading"
            className="text-xs font-semibold text-foreground"
          >
            Strategic shift
          </h2>
          <p className="mt-0.5 text-base font-semibold tracking-tight text-zinc-950 dark:text-white">
            {STRATEGIC_SHIFT.headline}
          </p>
          <p className="mt-1.5 max-w-4xl text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            {STRATEGIC_SHIFT.body}
          </p>
        </section>

        <div className="mt-6 flex flex-col gap-8 xl:flex-row xl:items-start xl:gap-10">
          <div className="min-w-0 flex-1">
            <SwimlaneFilterBar hiddenLaneIds={hiddenLaneIds} />

            <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white/95 pb-1 shadow-inner shadow-black/10 [-ms-overflow-style:none] [scrollbar-width:thin] dark:border-zinc-800/90 dark:bg-zinc-950/40 dark:shadow-black/20">
              <div
                className="grid min-w-[980px] grid-cols-[minmax(11rem,13rem)_repeat(4,minmax(10.25rem,1fr))] divide-x divide-zinc-200 dark:divide-zinc-800/70"
                aria-label="Roadmap by swimlane and quarter"
              >
                <div className="sticky left-0 z-[1] border-r border-zinc-200 bg-zinc-50/95 p-3 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/95" />

                {QUARTERS.map((quarter) => (
                  <div
                    key={quarter}
                    className="border-b border-zinc-300 px-3 pt-3 pb-2 dark:border-zinc-700/90"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-cnn-red">
                      {QUARTER_LABELS[quarter]}
                    </p>
                    <p className="mt-0.5 text-[10px] text-muted">
                      {getQuarterRangeLabel(quarter)}
                    </p>
                    <p className="mt-1.5 text-[11px] leading-snug text-zinc-700 dark:text-zinc-300">
                      {QUARTER_NARRATIVE[quarter]}
                    </p>
                  </div>
                ))}

                {visibleLanes.map((lane) => (
                  <div key={lane.id} className="contents">
                    <div className="sticky left-0 z-[1] flex items-start gap-2.5 border-y border-zinc-200 bg-zinc-50/98 px-3 py-2.5 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/98">
                      <div
                        className="mt-0.5 flex flex-col gap-1 py-0.5 pt-0.5"
                        aria-hidden
                      >
                        <span className="block h-[3px] w-[18px] shrink-0 rounded-full bg-cnn-red" />
                        <span className="block h-[3px] w-[18px] shrink-0 rounded-full bg-cnn-red" />
                        <span className="block h-[3px] w-[18px] shrink-0 rounded-full bg-cnn-red" />
                      </div>
                      <h3 className="text-left text-[12px] font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-100">
                        {lane.label}
                      </h3>
                    </div>

                    {QUARTERS.map((quarter) => {
                      const cards = roadmapData[lane.id][quarter];
                      return (
                        <div
                          key={`${lane.id}-${quarter}`}
                          className="border-y border-zinc-200 bg-zinc-50/70 px-2 py-2 dark:border-zinc-800 dark:bg-zinc-950/20"
                        >
                          <div className="flex flex-col gap-2">
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

            <section className="mt-6 rounded-lg border border-zinc-200 bg-surface/60 px-3 py-3 dark:border-zinc-800/80 dark:bg-surface/50">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                Legend
              </h2>
              <p className="mt-0.5 text-[11px] text-zinc-600 dark:text-zinc-500">
                Initiative stage shown on cards (not a calendar timeline).
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                {STATUS_ORDER.map((status) => (
                  <li key={status} className="flex items-center gap-2">
                    <StatusChip status={status} />
                    <span className="text-[10px] text-zinc-600 dark:text-zinc-500">
                      {status === "DISCOVERY" && "Exploring scope & constraints"}
                      {status === "BUILD" && "In implementation"}
                      {status === "TEST" && "Validation / rollout prep"}
                      {status === "SCALE" && "Broader rollout & optimization"}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <footer className="mt-6 border-t border-zinc-200 pt-5 text-[10px] leading-relaxed text-zinc-600 dark:border-zinc-800/80 dark:text-zinc-500">
              <p>
                Draft for discussion · Content Engagement roadmap · Internal · Last updated May
                2026
              </p>
              <p className="mt-1">
                Card copy + key decisions prepared for PM review (Steph Garrett, Ericka Henderson);
                confirm before leadership readout.
              </p>
              <p className="mt-1">
                16:9 slide capture: set the browser to{" "}
                <code className="rounded bg-zinc-200/80 px-1 text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300">
                  1920×1080
                </code>{" "}
                (Responsive / device mode), load this page, then save a visible-area screenshot. Use
                full-page capture if the grid scrolls past one viewport. Use{" "}
                <span className="font-medium">Print / PDF</span> for a paper-style export.
              </p>
              <p className="mt-1">
                Optional CMS / Notion link: set{" "}
                <code className="rounded bg-zinc-200/80 px-1 text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300">
                  NEXT_PUBLIC_ROADMAP_SOURCE_URL
                </code>{" "}
                to an https URL (Notion page, Google Doc, headless studio, etc.).
              </p>
            </footer>
          </div>

          <aside
            className="top-24 w-full shrink-0 xl:sticky xl:max-w-sm xl:self-start"
            aria-labelledby="key-decisions-heading"
          >
            <KeyDecisionsPanel
              decisions={KEY_DECISIONS}
              resolvedIds={resolvedDecisionIds}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
