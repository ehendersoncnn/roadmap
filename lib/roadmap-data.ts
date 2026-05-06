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
        statuses: ["DISCOVERY", "BUILD"],
        label: "Finalize Phase 1 MVP spec",
      },
      {
        statuses: ["BUILD", "TEST"],
        label: "Mobile Web MVP experiment path",
      },
      {
        statuses: ["DISCOVERY"],
        label: "Lock Updated/New/Seen/Lifecycle semantics",
      },
      {
        statuses: ["DISCOVERY"],
        label: "Define pilot workflow and programming guardrails",
      }
    ],
    "q3-2026": [
      {
        statuses: ["TEST", "SCALE"],
        label: "Read out Phase 1 results",
      },
      {
        statuses: ["BUILD"],
        label: "Improve MVP based on results",
      },
      {
        statuses: ["BUILD"],
        label: "Strengthen package lifecycle and refresh rules",
      }
    ],
    "q4-2026": [
      {
        statuses: ["SCALE"],
        label: "Expand validated Catch-Up patterns",
      },
      {
        statuses: ["BUILD"],
        label: "Improve return/re-entry behavior",
      }
    ],
    "q1-2027": [
      {
        statuses: ["SCALE"],
        label: "Multi-surface Catch-Up system",
      },
      {
        statuses: ["SCALE"],
        label: "Package types: daily, storyline, tentpole, franchise, subscriber",
      }
    ]
  },
  "catch-up-expansion": {
    "q2-2026": [
      {
        statuses: ["DISCOVERY"],
        label: "Identify App expansion dependencies",
      },
      {
        statuses: ["DISCOVERY"],
        label: "Define Phase 1.5 topic card criteria",
      }
    ],
    "q3-2026": [
      {
        statuses: ["DISCOVERY", "BUILD"],
        label: "Begin App expansion planning",
      },
      {
        statuses: ["DISCOVERY"],
        label: "Define durable state needs",
      },
      {
        statuses: ["DISCOVERY"],
        label: "Test expanded package types: AM, topical, tentpole",
      }
    ],
    "q4-2026": [
      {
        statuses: ["DISCOVERY", "TEST"],
        label: "MVP subscriber feature set",
      },
      {
        statuses: ["DISCOVERY", "TEST"],
        label: "Storyline navigation for complex stories",
      },
      {
        statuses: ["DISCOVERY", "TEST"],
        label: "Direct A/V inside module/viewer",
      }
    ],
    "q1-2027": [
      {
        statuses: ["SCALE"],
        label: "App + Mobile Web parity plan",
      },
      {
        statuses: ["BUILD", "SCALE"],
        label: "Subscriber-aware saved progress and re-entry",
      },
      {
        statuses: ["SCALE"],
        label: "Storyline Catch-Up if Q4 test works",
      }
    ]
  },
  "features-destination": {
    "q2-2026": [
      {
        statuses: ["DISCOVERY"],
        label: "Reframe Features work under Content Engagement",
      },
      {
        statuses: ["DISCOVERY"],
        label: "Identify what Features commitments continue, slow, or move",
      }
    ],
    "q3-2026": [
      {
        statuses: ["DISCOVERY"],
        label: "Define Features Destination opportunity",
      },
      {
        statuses: ["DISCOVERY"],
        label: "Map franchises and tentpoles into package model",
      }
    ],
    "q4-2026": [
      {
        statuses: ["DISCOVERY", "TEST"],
        label: "Prototype Features Destination concept",
      },
      {
        statuses: ["DISCOVERY"],
        label: "Define programming model and success metrics",
      }
    ],
    "q1-2027": [
      {
        statuses: ["TEST", "SCALE"],
        label: "Features Destination pilot or rollout recommendation",
      },
      {
        statuses: ["SCALE"],
        label: "Use Catch-Up as an entry point into Features content",
      }
    ]
  },
  "interactives-av": {
    "q2-2026": [
      {
        statuses: ["DISCOVERY"],
        label: "Inventory interactive workflow and distribution gaps",
      },
      {
        statuses: ["DISCOVERY"],
        label: "Explore audio clip / multimodal Catch-Up variants",
      }
    ],
    "q3-2026": [
      {
        statuses: ["DISCOVERY"],
        label: "Define 'Interactive Asset' or CMS wrapper concept",
      },
      {
        statuses: ["DISCOVERY"],
        label: "Define CTA vs direct presentation rules",
      }
    ],
    "q4-2026": [
      {
        statuses: ["TEST"],
        label: "First interactive integration pilot",
      },
      {
        statuses: ["TEST"],
        label: "Short clips / loops / audio snippets in Catch-Up contexts",
      }
    ],
    "q1-2027": [
      {
        statuses: ["SCALE"],
        label: "Standard interactive metadata and distribution model",
      },
      {
        statuses: ["SCALE"],
        label: "Interactives eligible for search, recirculation, personalization, subscriber packaging",
      }
    ]
  },
  "content-engagement-systems": {
    "q2-2026": [
      {
        statuses: ["DISCOVERY"],
        label: "Define Content Engagement remit",
      },
      {
        statuses: ["DISCOVERY"],
        label: "Auto-hydration spike for card metadata",
      },
      {
        statuses: ["DISCOVERY"],
        label: "Measurement framework for habit, completion proxy, CTA opens",
      }
    ],
    "q3-2026": [
      {
        statuses: ["BUILD"],
        label: "Auto-hydration v1",
      },
      {
        statuses: ["BUILD"],
        label: "Pilot review/publish workflow",
      },
      {
        statuses: ["DISCOVERY"],
        label: "Dashboard requirements for package health",
      }
    ],
    "q4-2026": [
      {
        statuses: ["BUILD"],
        label: "Meaningful update thresholds",
      },
      {
        statuses: ["BUILD"],
        label: "Durable state requirements",
      },
      {
        statuses: ["DISCOVERY"],
        label: "AI/ML-assisted curation as Phase 2 accelerator",
      }
    ],
    "q1-2027": [
      {
        statuses: ["SCALE"],
        label: "Standard package schema",
      },
      {
        statuses: ["SCALE"],
        label: "Standard newness/freshness language",
      },
      {
        statuses: ["SCALE"],
        label: "2027 investment proposal for Content Engagement",
      },
      {
        statuses: ["SCALE"],
        label: "Test for Steph",
      }
    ]
  }
};