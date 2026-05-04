# Technical Specification

## Stack (current)

| Layer | Technology | Version (see `package.json`) |
| ----- | ---------- | ---------------------------- |
| Runtime | Node.js | LTS recommended for local dev |
| Framework | Next.js | 16.x |
| UI | React / React DOM | 19.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Lint | ESLint + eslint-config-next | 9.x / aligned with Next |

## Local development

```bash
npm install
npm run dev
```

Other package managers: `pnpm dev`, `yarn dev`, `bun dev` as supported by your environment.

## Scripts

| Command | Purpose |
| ------- | ------- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Run production server after build |
| `npm run lint` | ESLint |

## Environment

| Variable | Where | Purpose |
| -------- | ----- | ------- |
| `NEXT_PUBLIC_ROADMAP_SOURCE_URL` | Vercel / `.env.local` | Optional HTTPS URL for **CMS / Notion** outbound link |
| _(browser cookies)_ | — | Theme, swimlane visibility, resolved decisions (`roadmap-*` cookies); set by the app |

- No secrets or server-only vars are required for the default roadmap build.
- Do not commit secrets; use Vercel project settings or `.env.local` (gitignored).

## Conventions

- Prefer App Router file conventions; consult `node_modules/next/dist/docs/` when APIs change (see root `AGENTS.md`).
- Co-locate route-specific components under `app/` or extract shared UI under a dedicated folder as the codebase grows.

## Testing & quality

- _Add testing stack and commands (e.g. Vitest, Playwright) when introduced._

---

*Bump versions and sections when dependencies or deployment targets change.*
