export type Status = "DISCOVERY" | "BUILD" | "TEST" | "SCALE";

export type RoadmapCardData = {
  statuses: Status[];
  label: string;
};

export const SWIMLANES = [
  { id: "catch-up-core", label: "Catch-Up Core" },
  { id: "catch-up-expansion", label: "Catch-Up Expansion" },
  { id: "features-destination", label: "Features Destination" },
  { id: "interactives-av", label: "Interactives + A/V Integration" },
  { id: "content-engagement-systems", label: "Content Engagement Systems" },
] as const;

export type SwimlaneId = (typeof SWIMLANES)[number]["id"];

export const QUARTERS = [
  "q2-2026",
  "q3-2026",
  "q4-2026",
  "q1-2027",
] as const;

export type QuarterKey = (typeof QUARTERS)[number];

export const QUARTER_LABELS: Record<QuarterKey, string> = {
  "q2-2026": "Q2 2026",
  "q3-2026": "Q3 2026",
  "q4-2026": "Q4 2026",
  "q1-2027": "Q1 2027",
};

export const QUARTER_MONTHS: Record<QuarterKey, string> = {
  "q2-2026": "Apr–Jun",
  "q3-2026": "Jul–Sep",
  "q4-2026": "Oct–Dec",
  "q1-2027": "Jan–Mar",
};

/** e.g. "Apr–Jun 2026" — for quarter header sublabels. */
export function getQuarterRangeLabel(key: QuarterKey): string {
  const year = key === "q1-2027" ? "2027" : "2026";
  return `${QUARTER_MONTHS[key]} ${year}`;
}

export const QUARTER_NARRATIVE: Record<QuarterKey, string> = {
  "q2-2026":
    "Phase 1 — Ship core Catch-Up experiences, instrumentation, and baseline editorial workflow.",
  "q3-2026":
    "Phase 1.5 — Expand destinations, tighten handoffs, and harden rollout operations.",
  "q4-2026":
    "Bridge — Consolidate lessons learned; align investments ahead of unified platform scale.",
  "q1-2027":
    "Phase 2 — Content Engagement as a cohesive platform capability across squads.",
};

/** Ordered statuses for legend and consistent display. */
export const STATUS_ORDER: Status[] = ["DISCOVERY", "BUILD", "TEST", "SCALE"];

/** Banner copy for the roadmap header region. */
export const STRATEGIC_SHIFT = {
  headline: "From Features Squad to Content Engagement",
  body: "Catch-Up anchored our first wave; Phase 1 → 1.5 → 2 sequences delivery so editorial, product, and engineering share one narrative—and one platform path.",
};

export const KEY_DECISIONS: string[] = [
  "Confirm Catch-Up Phase 1 exit criteria vs. Phase 1.5 scope additions (ownership + timelines).",
  "Align on expansion surfaces for Catch-Up (where editorial control and templates must parity).",
  "Decide destination strategy for Features: hero modules, rails, and cross-linking governance.",
  "Prioritize Interactives + A/V integration backlog against platform reliability targets.",
  "Staffing model for Content Engagement Systems (shared platform vs. embedded squads).",
  "Executive readout cadence—monthly roadmap review vs. quarterly steering.",
];

export const roadmapData: Record<
  SwimlaneId,
  Record<QuarterKey, RoadmapCardData[]>
> = {
  "catch-up-core": {
    "q2-2026": [
      {
        statuses: ["BUILD", "TEST"],
        label: "Phase 1 core player rollout with baseline analytics hooks",
      },
      {
        statuses: ["DISCOVERY"],
        label: "Editorial workflow audit — intake to publish for Catch-Up",
      },
    ],
    "q3-2026": [
      {
        statuses: ["TEST", "SCALE"],
        label: "Phase 1.5 hardening: error budgets, perf guardrails, incident playbooks",
      },
    ],
    "q4-2026": [
      {
        statuses: ["BUILD"],
        label: "Reliability program: cache strategy + fallback content paths",
      },
    ],
    "q1-2027": [
      {
        statuses: ["DISCOVERY", "BUILD"],
        label: "Phase 2 core architecture options — modular player + shared services",
      },
    ],
  },
  "catch-up-expansion": {
    "q2-2026": [
      {
        statuses: ["DISCOVERY", "BUILD"],
        label: "Inventory expansion plan — eligible shows, clips, and packages",
      },
    ],
    "q3-2026": [
      {
        statuses: ["BUILD", "TEST"],
        label: "Editorial templates v2 — faster packaging for breaking and evergreen",
      },
      {
        statuses: ["SCALE"],
        label: "Gradual traffic ramp with experiment flags and kill switches",
      },
    ],
    "q4-2026": [
      {
        statuses: ["TEST"],
        label: "Cross-brand learnings — reuse patterns without forking stack",
      },
    ],
    "q1-2027": [
      {
        statuses: ["SCALE"],
        label: "National scale levers — CDN tuning, prefetch, and cost controls",
      },
    ],
  },
  "features-destination": {
    "q2-2026": [
      {
        statuses: ["DISCOVERY"],
        label: "Destination IA — Catch-Up homes, hubs, and SEO guardrails",
      },
    ],
    "q3-2026": [
      {
        statuses: ["BUILD"],
        label: "Rails + recirc modules aligned to Phase 1.5 editorial ops",
      },
    ],
    "q4-2026": [
      {
        statuses: ["BUILD", "TEST"],
        label: "Experimentation framework for layout variants and engagement KPIs",
      },
    ],
    "q1-2027": [
      {
        statuses: ["TEST", "SCALE"],
        label: "Unified destination patterns across primary news surfaces",
      },
    ],
  },
  "interactives-av": {
    "q2-2026": [
      {
        statuses: ["DISCOVERY", "BUILD"],
        label: "A/V pipeline assessment — live, clips, and graphics touchpoints",
      },
    ],
    "q3-2026": [
      {
        statuses: ["BUILD", "TEST"],
        label: "Interactives embed standards + safe defaults inside Catch-Up",
      },
    ],
    "q4-2026": [
      {
        statuses: ["TEST", "SCALE"],
        label: "Joint QA rubric for rich media + accessibility checkpoints",
      },
    ],
    "q1-2027": [
      {
        statuses: ["SCALE"],
        label: "Shared media contracts for Phase 2 platform consumers",
      },
    ],
  },
  "content-engagement-systems": {
    "q2-2026": [
      {
        statuses: ["DISCOVERY"],
        label: "Platform map — identity, entitlements, notifications, and edge cases",
      },
    ],
    "q3-2026": [
      {
        statuses: ["BUILD"],
        label: "Shared design system tokens for engagement components",
      },
    ],
    "q4-2026": [
      {
        statuses: ["BUILD", "TEST"],
        label: "Observability baseline — SLOs, tracing, and product-level dashboards",
      },
    ],
    "q1-2027": [
      {
        statuses: ["BUILD", "SCALE"],
        label: "Content Engagement API boundaries — internal SLAs and deprecation policy",
      },
    ],
  },
};
