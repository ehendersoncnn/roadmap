/*
 * Editorial: confirm card labels + key decisions with Steph Garrett (PM) and Ericka Henderson
 * before leadership readouts (see page footer status line).
 */

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
    "Catch-Up Phase 1 — Core playback, instrumentation, and baseline editorial workflow.",
  "q3-2026":
    "Catch-Up Phase 1.5 — Wider surfaces, cleaner handoffs, hardened rollout discipline.",
  "q4-2026":
    "Bridge into Phase 2 — Operational lessons in; align funding and sequencing for platform scale.",
  "q1-2027":
    "Phase 2 — Content Engagement as one platform posture across Catch-Up, destinations, and systems.",
};

/** Ordered statuses for legend and consistent display. */
export const STATUS_ORDER: Status[] = ["DISCOVERY", "BUILD", "TEST", "SCALE"];

/** Banner copy for the roadmap header region. */
export const STRATEGIC_SHIFT = {
  headline: "From Features Squad to Content Engagement",
  body: "Catch-Up anchored the first wave. Sequencing Phase 1 → Phase 1.5 → Phase 2 keeps editorial, product, and engineering on one narrative—and one platform path.",
};

export type KeyDecisionItem = {
  /** Stable slug for persisted “resolved” state (cookies). */
  id: string;
  text: string;
};

export const KEY_DECISIONS: KeyDecisionItem[] = [
  {
    id: "dec-phase1-exit",
    text: "Confirm Catch-Up Phase 1 exit criteria vs. Phase 1.5 scope adds (owners + dates).",
  },
  {
    id: "dec-catchup-surfaces",
    text: "Align Catch-Up expansion surfaces: where editorial control and templates must reach parity.",
  },
  {
    id: "dec-features-dest",
    text: "Features destination strategy: hero modules, rails, and cross-linking governance.",
  },
  {
    id: "dec-av-vs-reliability",
    text: "Prioritize Interactives + A/V backlog vs. platform reliability / incident targets.",
  },
  {
    id: "dec-ce-staffing",
    text: "Staffing model for Content Engagement Systems (shared platform vs. embedded squads).",
  },
  {
    id: "dec-readout-cadence",
    text: "Executive readout cadence: monthly roadmap vs. quarterly steering.",
  },
];

export const roadmapData: Record<
  SwimlaneId,
  Record<QuarterKey, RoadmapCardData[]>
> = {
  "catch-up-core": {
    "q2-2026": [
      {
        statuses: ["BUILD", "TEST"],
        label: "Phase 1 — Core Catch-Up player with baseline analytics",
      },
      {
        statuses: ["DISCOVERY"],
        label: "Editorial workflow audit — Catch-Up intake through publish",
      },
    ],
    "q3-2026": [
      {
        statuses: ["TEST", "SCALE"],
        label: "Phase 1.5 reliability — budgets, perf guardrails, incidents",
      },
    ],
    "q4-2026": [
      {
        statuses: ["BUILD"],
        label: "Reliability — caching + fallback content paths",
      },
    ],
    "q1-2027": [
      {
        statuses: ["DISCOVERY", "BUILD"],
        label: "Phase 2 — modular player + shared services concepts",
      },
    ],
  },
  "catch-up-expansion": {
    "q2-2026": [
      {
        statuses: ["DISCOVERY", "BUILD"],
        label: "Inventory expansion — eligible shows, clips, packages",
      },
    ],
    "q3-2026": [
      {
        statuses: ["BUILD", "TEST"],
        label: "Packaging templates v2 — breaking + evergreen throughput",
      },
      {
        statuses: ["SCALE"],
        label: "Gradual traffic ramp with experiment flags and kill switches",
      },
    ],
    "q4-2026": [
      {
        statuses: ["TEST"],
        label: "Cross-brand reuse — patterns without stack forks",
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
