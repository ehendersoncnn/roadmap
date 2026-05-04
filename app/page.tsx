import { RoadmapCard } from "@/components/RoadmapCard";
import { QUARTERS, SWIMLANES, roadmapData } from "@/lib/roadmap-data";

export default function Home() {
  const preview =
    roadmapData[SWIMLANES[0].id][QUARTERS[0]][0] ?? null;

  return (
    <div className="flex flex-1 flex-col bg-background px-6 py-10">
      <header className="mx-auto w-full max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cnn-red">
          CNN · Content Engagement
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          Roadmap foundation
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Phase 1 UI primitives and data are live. The full quarter grid, banner,
          and sidebar ship in Phase 2.
        </p>
      </header>
      <main className="mx-auto mt-10 w-full max-w-3xl">
        {preview ? (
          <div className="max-w-md">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
              Sample card
            </p>
            <RoadmapCard card={preview} />
          </div>
        ) : null}
      </main>
    </div>
  );
}
