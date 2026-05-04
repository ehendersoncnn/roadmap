# Content Engagement Roadmap

A Next.js visual roadmap for CNN's Content Engagement team — Q2 2026 through Q1 2027.

Built by **Steph Garrett + Ericka Henderson** · Draft for discussion

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the roadmap.

---

## How to Edit the Roadmap

All roadmap content lives in one file:

```
lib/roadmap-data.ts
```

### Editing roadmap cards
Each card has a `statuses` array and a `label`. Find the swimlane and quarter you want to update inside `roadmapData`:

```ts
"catchup-core": {
  "Q2 2026": [
    { statuses: ["DISCOVERY", "BUILD"], label: "Finalize Phase 1 MVP spec" },
    // add or remove cards here
  ],
```

### Editing swimlane labels
Update the `SWIMLANES` array near the top of `lib/roadmap-data.ts`.

### Editing quarter columns
Update `QUARTERS` and `QUARTER_MONTHS` / `QUARTER_NARRATIVE` in the same file.

### Editing the Key Decisions sidebar
Update the `KEY_DECISIONS` array in `lib/roadmap-data.ts`.

---

## File Structure

```
app/
  page.tsx              # Main roadmap page
  layout.tsx            # Root layout + metadata
  globals.css           # Tailwind base styles
components/
  RoadmapCard.tsx       # Individual roadmap card with hover state
  StatusChip.tsx        # DISCOVERY / BUILD / TEST / SCALE chips
lib/
  roadmap-data.ts       # ALL editable roadmap content lives here
docs/
  prd.md                # Product requirements
  architecture.md       # Technical architecture
  tasks.md              # Task checklist
  tech-spec.md          # Stack and tech spec
```

---

## Status Colors

| Status | Color |
|--------|-------|
| DISCOVERY | Gray |
| BUILD | Blue |
| TEST | Gold/Amber |
| SCALE | Green |

---

## Deployment

Deploy to [Vercel](https://vercel.com) — push to `main` and connect the repo. The page is a static React Server Component with no external data dependencies, so builds are fast and predictable.
