# Architecture — Content Engagement Roadmap

## Runtime model

- **Framework:** Next.js App Router (`app/`)
- **UI:** React Server Components (no client state needed for static roadmap view). `RoadmapCard` uses `"use client"` for hover interaction only.
- **Styling:** Tailwind CSS v4 with PostCSS
- **Data:** All roadmap content is co-located in `lib/roadmap-data.ts` — no database or API required

## Repository layout

| Path | Role |
| ---- | ---- |
| `app/page.tsx` | Main roadmap page — layout, header, grid, footer |
| `app/layout.tsx` | Root layout, fonts, metadata |
| `app/globals.css` | Tailwind base import |
| `components/RoadmapCard.tsx` | Individual card with hover state |
| `components/StatusChip.tsx` | DISCOVERY / BUILD / TEST / SCALE chips + color config |
| `lib/roadmap-data.ts` | All editable data: swimlanes, quarters, cards, key decisions |
| `public/` | Static assets (favicon, etc.) |
| `docs/` | PRD, architecture, tasks, tech spec |

## Data model

All content lives in `lib/roadmap-data.ts`:

```
SWIMLANES[]         → lane id + display label
QUARTERS[]          → quarter column keys
QUARTER_MONTHS{}    → month labels per quarter
QUARTER_NARRATIVE{} → one-liner narrative per quarter
roadmapData{}       → swimlaneId → quarter → RoadmapCard[]
KEY_DECISIONS[]     → sidebar decision list
```

`RoadmapCard` type:
```ts
{ statuses: Status[]; label: string }
// Status = "DISCOVERY" | "BUILD" | "TEST" | "SCALE"
```

## Deployment

- Vercel (recommended) — zero config for Next.js App Router
- Static export possible if no server features are added

## Scaling approach

- If card count grows significantly, consider virtualizing swimlane rows
- If multiple roadmap views are needed, extract a `RoadmapGrid` component and pass filtered data
- CMS integration (e.g., Notion API or a headless CMS) could replace `roadmap-data.ts` if non-technical editing becomes a priority
