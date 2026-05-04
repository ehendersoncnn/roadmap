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
Update the `KEY_DECISIONS` array in `lib/roadmap-data.ts`. Each item is `{ id: "stable-slug", text: "…" }` — keep ids stable so “resolved” checkboxes persist in the browser cookie.

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

**Repository:** [github.com/ehendersoncnn/roadmap](https://github.com/ehendersoncnn/roadmap) (`main`).

### 1. GitHub

```bash
git push origin main
```

### 2. Vercel (first-time)

1. Open [vercel.com/new](https://vercel.com/new) and **Import** the GitHub repo **`ehendersoncnn/roadmap`**.
2. Framework preset: **Next.js** — project root `.`, build `npm run build`, output default.
3. **Environment variables** (optional):

   | Name | Purpose |
   | ----- | ------- |
   | `NEXT_PUBLIC_ROADMAP_SOURCE_URL` | HTTPS link for the **CMS / Notion** button (Notion, Google Doc, headless studio). |

4. Deploy. Copy the **Production** deployment URL from the project dashboard (custom domain optional).

No `vercel.json` required for standard Next.js on Vercel.

### 3. Share with CNN leadership

Send the production (or appropriately protected preview) URL from Vercel. If the roadmap should not be public, turn on **[Deployment Protection](https://vercel.com/docs/security/deployment-protection)** or restrict repo / team access before sharing.
