# Product Requirements Document — Content Engagement Roadmap

## Summary

A single-page visual roadmap for CNN's Content Engagement team, covering Q2 2026 through Q1 2027. The page serves as an internal strategy artifact — shareable as a URL, screenshot-able as a 16:9 slide, and editable without engineering involvement.

## Goals

- Communicate the strategic shift from "Features Squad" to "Content Engagement" as a unified platform capability
- Make Catch-Up's phased rollout legible to product, engineering, and editorial leadership
- Surface key decisions needed from stakeholders in a sidebar panel
- Replace static PowerPoint decks with a living, version-controlled page

## Users & Personas

- **Steph Garrett (PM)** — primary author; needs to update cards and labels without touching code
- **Ericka Henderson** — co-author; will review and tune quarter sequencing and labels before presenting
- **CNN Leadership** — audience; expects executive-readout quality, dark slide aesthetic, clean hierarchy

## Scope

### In scope

- Dark-themed roadmap with CNN red accent
- Quarter columns: Q2 2026, Q3 2026, Q4 2026, Q1 2027
- Five swimlanes: Catch-Up Core, Catch-Up Expansion, Features Destination, Interactives + A/V Integration, Content Engagement Systems
- Status chips: DISCOVERY, BUILD, TEST, SCALE
- Strategic Shift banner
- Key Decisions Needed sidebar
- Legend + footer with draft attribution
- Hover states on cards
- Screenshot-ready 16:9 desktop layout

### Out of scope

- Authentication or user accounts
- Editable UI (all edits via code in `lib/roadmap-data.ts`)
- External data fetching or CMS integration (future consideration)
- Mobile-first responsive design (desktop/slide priority)

## User Stories

- As Steph, I want to update a card label by editing one file so I don't need to ask engineering for help.
- As Ericka, I want to tune quarter sequencing quickly before a presentation.
- As a CNN leader, I want to screenshot the page and drop it into a deck without additional formatting work.

## Success Metrics

- Replaces manual PowerPoint updates for roadmap discussions
- Accurate representation of the Catch-Up Phase 1 → Phase 1.5 → Phase 2 sequencing
- Can be shared as a link instead of an attached file

## Open Questions

1. Should the roadmap support multiple views (e.g., filtered by swimlane)?
2. Should Key Decisions have a "resolved" state?
3. Will this roadmap be hosted internally or on a public Vercel URL?

---

*Last updated: May 2026 · Draft for discussion*
