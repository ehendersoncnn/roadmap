/**
 * Import roadmap cards from roadmap-cards.csv (project root) and regenerate
 * only the `roadmapData` export in lib/roadmap-data.ts.
 */
import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";
import type {
  QuarterKey,
  RoadmapCardData,
  Status,
  SwimlaneId,
} from "../lib/roadmap-data";
import {
  QUARTER_LABELS,
  QUARTERS,
  SWIMLANES,
} from "../lib/roadmap-data";

const VALID_STATUSES: ReadonlySet<string> = new Set([
  "DISCOVERY",
  "BUILD",
  "TEST",
  "SCALE",
]);

const ROOT = path.resolve(__dirname, "..");
const CSV_PATH = path.join(ROOT, "roadmap-cards.csv");
const DATA_TS_PATH = path.join(ROOT, "lib", "roadmap-data.ts");

function pickCell(
  row: Record<string, string>,
  ...canonical: string[]
): string {
  const keys = Object.keys(row);
  for (const name of canonical) {
    const found = keys.find(
      (k) => k.trim().toLowerCase() === name.trim().toLowerCase(),
    );
    if (found === undefined) continue;
    const v = row[found];
    if (v === undefined || v === null) return "";
    return String(v);
  }
  return "";
}

function resolveSwimlane(raw: string): SwimlaneId | null {
  const t = raw.trim();
  if (!t) return null;
  for (const lane of SWIMLANES) {
    if (lane.id === t) return lane.id;
    if (lane.label.toLowerCase() === t.toLowerCase()) return lane.id;
  }
  return null;
}

function resolveQuarter(raw: string): QuarterKey | null {
  const t = raw.trim();
  if (!t) return null;
  const compact = t.replace(/\s+/g, " ").trim();
  for (const q of QUARTERS) {
    if (q === t || q === compact) return q;
    if (QUARTER_LABELS[q].toLowerCase() === t.toLowerCase()) return q;
    if (
      QUARTER_LABELS[q].replace(/\s+/g, " ").toLowerCase() ===
      compact.toLowerCase()
    ) {
      return q;
    }
  }
  return null;
}

function normalizeStatus(raw: string): Status | null {
  const s = raw.trim().toUpperCase();
  if (!s) return null;
  if (VALID_STATUSES.has(s)) return s as Status;
  return null;
}

/** Find index of matching `}` for `{` at openBrace, skipping string literals. */
function findClosingBrace(src: string, openBrace: number): number {
  let i = openBrace + 1;
  let depth = 1;
  const len = src.length;

  while (i < len && depth > 0) {
    const c = src[i];
    if (c === '"' || c === "'") {
      const q = c;
      i++;
      while (i < len) {
        if (src[i] === "\\") {
          i += 2;
          continue;
        }
        if (src[i] === q) {
          i++;
          break;
        }
        i++;
      }
      continue;
    }
    if (c === "{") {
      depth++;
      i++;
      continue;
    }
    if (c === "}") {
      depth--;
      if (depth === 0) {
        return i;
      }
      i++;
      continue;
    }
    i++;
  }
  if (depth !== 0) {
    throw new Error("Unbalanced braces while parsing roadmap-data.ts");
  }
  return i - 1;
}

function findRoadmapDataReplaceRange(content: string): { start: number; end: number } {
  const marker = "export const roadmapData";
  const declStart = content.indexOf(marker);
  if (declStart === -1) {
    throw new Error(`Missing ${marker} in lib/roadmap-data.ts`);
  }
  const eqBrace = content.indexOf("= {", declStart);
  if (eqBrace === -1) {
    throw new Error("Could not find '= {' after roadmapData declaration");
  }
  const openBrace = content.indexOf("{", eqBrace);
  if (openBrace === -1) {
    throw new Error("Could not find opening brace for roadmapData object");
  }
  const closeBrace = findClosingBrace(content, openBrace);

  let end = closeBrace + 1;
  while (end < content.length && /\s/.test(content[end]!)) {
    end++;
  }
  if (content[end] === ";") {
    end++;
  }
  while (end < content.length && (content[end] === "\r" || content[end] === "\n")) {
    if (content.slice(end, end + 2) === "\r\n") {
      end += 2;
      break;
    }
    if (content[end] === "\n") {
      end++;
      break;
    }
    end++;
  }
  return { start: declStart, end };
}

function formatRoadmapData(
  data: Record<SwimlaneId, Record<QuarterKey, RoadmapCardData[]>>,
): string {
  const laneBlocks: string[] = [];
  for (const lane of SWIMLANES) {
    const quarterLines: string[] = [];
    for (const q of QUARTERS) {
      const cards = data[lane.id][q];
      const cardBlocks = cards.map((card) => {
        const st = card.statuses.map((s) => `"${s}"`).join(", ");
        return (
          `      {\n` +
          `        statuses: [${st}],\n` +
          `        label: ${JSON.stringify(card.label)},\n` +
          `      }`
        );
      });
      const inner = cardBlocks.length ? `${cardBlocks.join(",\n")}` : "";
      quarterLines.push(`    ${JSON.stringify(q)}: [\n${inner}\n    ]`);
    }
    laneBlocks.push(
      `  ${JSON.stringify(lane.id)}: {\n${quarterLines.join(",\n")}\n  }`,
    );
  }

  return (
    `export const roadmapData: Record<\n` +
    `  SwimlaneId,\n` +
    `  Record<QuarterKey, RoadmapCardData[]>\n` +
    `> = {\n` +
    `${laneBlocks.join(",\n")}\n` +
    `};`
  );
}

function main(): void {
  if (!fs.existsSync(CSV_PATH)) {
    console.error(
      "roadmap-cards.csv not found in project root. Export your spreadsheet as CSV and place it here.",
    );
    process.exit(1);
  }

  const raw = fs.readFileSync(CSV_PATH, "utf8");
  const records = parse(raw, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
  }) as Record<string, string>[];

  const grid = {} as Record<SwimlaneId, Record<QuarterKey, RoadmapCardData[]>>;
  for (const lane of SWIMLANES) {
    grid[lane.id] = {} as Record<QuarterKey, RoadmapCardData[]>;
    for (const q of QUARTERS) {
      grid[lane.id][q] = [];
    }
  }

  let cardCount = 0;
  const lanesWithCards = new Set<SwimlaneId>();

  for (let i = 0; i < records.length; i++) {
    const row = records[i]!;
    const rowNum = i + 2;

    const swimRaw = pickCell(row, "Swimlane");
    const quarterRaw = pickCell(row, "Quarter");
    const s1 = pickCell(row, "Status 1");
    const s2 = pickCell(row, "Status 2");
    const label = pickCell(row, "Card Label").trim();

    if (!label) continue;

    const laneId = resolveSwimlane(swimRaw);
    if (!laneId) {
      console.warn(
        `[row ${rowNum}] Unrecognized Swimlane: ${JSON.stringify(swimRaw)} — skipping row`,
      );
      continue;
    }

    const quarter = resolveQuarter(quarterRaw);
    if (!quarter) {
      console.warn(
        `[row ${rowNum}] Unrecognized Quarter: ${JSON.stringify(quarterRaw)} — skipping row`,
      );
      continue;
    }

    const statuses: Status[] = [];
    for (const raw of [s1, s2]) {
      const t = raw.trim();
      if (!t) continue;
      const norm = normalizeStatus(t);
      if (norm) {
        statuses.push(norm);
      } else {
        console.warn(
          `[row ${rowNum}] Invalid Status: ${JSON.stringify(t)} — skipping that status`,
        );
      }
    }

    if (statuses.length === 0) {
      console.warn(
        `[row ${rowNum}] No valid statuses for card — skipping row (${JSON.stringify(label)})`,
      );
      continue;
    }

    grid[laneId][quarter].push({ statuses, label });
    cardCount++;
    lanesWithCards.add(laneId);
  }

  let fileContent = fs.readFileSync(DATA_TS_PATH, "utf8");
  const { start, end } = findRoadmapDataReplaceRange(fileContent);
  const newBlock = formatRoadmapData(grid);
  fileContent = fileContent.slice(0, start) + newBlock + fileContent.slice(end);
  fs.writeFileSync(DATA_TS_PATH, fileContent, "utf8");

  const y = lanesWithCards.size;
  console.log(
    `✓ roadmap-data.ts updated — ${cardCount} cards imported across ${y} swimlanes`,
  );
}

main();
