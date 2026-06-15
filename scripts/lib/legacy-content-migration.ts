import { execFile } from "node:child_process";
import { constants as fsConstants } from "node:fs";
import {
  copyFile,
  mkdir,
  readFile,
  readdir,
  rmdir,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import matter from "gray-matter";

const execFileAsync = promisify(execFile);

const legacyCollections = ["blog", "snippet"] as const;
const targetLocales = ["en", "pt-br", "ja", "zh-cn", "de", "fr"] as const;

type LegacyCollection = (typeof legacyCollections)[number];
type TargetCollection = "blog" | "snippets";
type TargetLocale = (typeof targetLocales)[number];

type MigrationOptions = {
  sourceRepoRoot: string;
  destinationRepoRoot: string;
  apply: boolean;
  reportPath?: string;
};

type LegacyRecord = {
  collection: LegacyCollection;
  sourceLocale: string;
  targetLocale?: TargetLocale;
  sourceSlug: string;
  targetSlug: string;
  sourcePath: string;
  sourceRelativePath: string;
  destinationPath?: string;
  destinationRelativePath?: string;
  source: string;
  body: string;
  data: Record<string, unknown>;
};

type ManualReview = {
  sourcePath: string;
  destinationPath?: string | undefined;
  reasons: string[];
};

type LegacyLink = {
  sourcePath: string;
  line: number;
  kind: "link" | "image";
  value: string;
  suggestion?: string | undefined;
};

type AssetMigration = {
  sourcePath: string;
  destinationPath: string;
  oldReferences: string[];
  newReference: string;
  referencingFiles: string[];
  status:
    | "not-referenced"
    | "planned"
    | "copied"
    | "skipped-existing"
    | "missing";
};

type SnippetTaxonomy = {
  slug: string;
  category: string;
  stack: string[];
};

export type MigrationReport = {
  schemaVersion: 1;
  mode: "dry-run" | "apply";
  generatedAt: string;
  source: {
    repoPath: string;
    commit?: string | undefined;
    dirty: boolean;
    modifiedContentFiles: string[];
    modifiedSourceFilesMigrated: string[];
  };
  destination: {
    repoPath: string;
    reportPath: string;
  };
  totals: {
    found: number;
    eligible: number;
    planned: number;
    migrated: number;
    skippedSpanish: number;
    skippedExisting: number;
    skippedManualReview: number;
    warnings: number;
    errors: number;
  };
  plannedFiles: string[];
  migratedFiles: string[];
  skipped: {
    spanish: string[];
    existing: string[];
    manualReview: string[];
  };
  emptyDirectories: {
    eligibleForRemoval: string[];
    removed: string[];
    retained: string[];
  };
  calloutsConverted: Array<{
    sourcePath: string;
    destinationPath: string;
    count: number;
  }>;
  moreMarkersRemoved: Array<{
    sourcePath: string;
    destinationPath: string;
    count: number;
  }>;
  markdownHardBreaksNormalized: Array<{
    sourcePath: string;
    destinationPath: string;
    count: number;
  }>;
  assets: AssetMigration[];
  legacyLinks: LegacyLink[];
  slugCorrections: Array<{
    collection: TargetCollection;
    sourceSlug: string;
    targetSlug: string;
    sourcePath: string;
    destinationPath: string;
  }>;
  snippetTaxonomy: SnippetTaxonomy[];
  uncategorized: string[];
  needsManualReview: ManualReview[];
  warnings: string[];
  errors: string[];
};

const localeMap: Readonly<Record<string, TargetLocale | undefined>> = {
  en: "en",
  pt: "pt-br",
  ja: "ja",
  "zh-CN": "zh-cn",
  de: "de",
  fr: "fr",
  es: undefined,
};

export const snippetCategoryBySlug: Readonly<Record<string, string>> = {
  "bitwarden-remove-duplicates": "security",
  "cloudflare-worker-load-balancer-health-check": "infrastructure",
  "discord-ollama-bot": "automation",
  "mistral-agents-openwebui-pipe": "ai",
  "mkcd-bash-function": "linux",
  "remove-duplicated": "programming",
  "set-linux-cpu-governor-to-schedutil": "linux",
  "vscode-config": "tooling",
};

const stackRules: ReadonlyArray<{
  terms: string[];
  value: string;
}> = [
  { terms: ["cloudflare"], value: "Cloudflare" },
  { terms: ["worker", "workers"], value: "Cloudflare Workers" },
  { terms: ["bitwarden"], value: "Bitwarden" },
  { terms: ["discord"], value: "Discord" },
  { terms: ["ollama"], value: "Ollama" },
  { terms: ["mistral"], value: "Mistral" },
  { terms: ["openwebui", "open-webui"], value: "Open WebUI" },
  { terms: ["vscode", "vscodium", "vs-code"], value: "VS Code" },
  { terms: ["postgres", "postgresql"], value: "PostgreSQL" },
  { terms: ["sqlite"], value: "SQLite" },
  { terms: ["nginx"], value: "Nginx" },
  { terms: ["caddy"], value: "Caddy" },
  { terms: ["github"], value: "GitHub" },
  { terms: ["git"], value: "Git" },
  { terms: ["docker"], value: "Docker" },
  { terms: ["python"], value: "Python" },
  { terms: ["javascript", "js"], value: "JavaScript" },
  { terms: ["bash", "shell"], value: "Bash" },
  { terms: ["systemd"], value: "systemd" },
  { terms: ["linux", "ubuntu"], value: "Linux" },
];

const assetDefinitions = [
  {
    sourceRelativePath:
      "apps/web/public/images/blog/i-dont-care/lonely-in-park.jpg",
    destinationRelativePath:
      "public/images/blog/i-dont-care/lonely-in-park.jpg",
    oldReferences: [
      "https://yuricunha.com/static/images/blog/i-dont-care/lonely-in-park.jpg",
    ],
    newReference: "/images/blog/i-dont-care/lonely-in-park.jpg",
  },
  {
    sourceRelativePath:
      "apps/web/public/images/blog/sometimes-humans-just-need-to-sit-in-one-place-and-like-hurt/graphic.jpeg",
    destinationRelativePath:
      "public/images/blog/sometimes-humans-just-need-to-sit-in-one-place-and-like-hurt/graphic.jpeg",
    oldReferences: [
      "/static/images/blog/sometimes-humans-just-need-to-sit-in-one-place-and-like-hurt/graphic.jpeg",
    ],
    newReference:
      "/images/blog/sometimes-humans-just-need-to-sit-in-one-place-and-like-hurt/graphic.jpeg",
  },
] as const;

const knownManualReviewReasons: ReadonlyArray<{
  matches: (record: LegacyRecord) => boolean;
  reason: string;
}> = [
  {
    matches: (record) =>
      record.collection === "blog" &&
      record.sourceLocale === "ja" &&
      record.sourceSlug === "roadmap-front-end",
    reason:
      "The Japanese body contains a translation-tool response instead of the article.",
  },
  {
    matches: (record) =>
      record.collection === "blog" &&
      record.sourceLocale === "de" &&
      record.sourceSlug === "what-is-sql-server-and-sql",
    reason:
      "The German article contains malformed nested code fences that render content incorrectly.",
  },
  {
    matches: (record) =>
      record.collection === "snippet" &&
      record.sourceLocale === "ja" &&
      record.sourceSlug === "cloudflare-worker-load-balancer-health-check",
    reason:
      "The Japanese snippet contains repeated and nested code fences that require manual repair.",
  },
  {
    matches: (record) =>
      record.collection === "blog" && record.sourceSlug === "dAppling",
    reason: 'The legacy mixed-case slug was normalized to "dappling".',
  },
  {
    matches: (record) =>
      record.collection === "snippet" &&
      record.sourceLocale === "pt" &&
      record.sourceSlug === "linux-cpu-governor-schedutil",
    reason:
      'The Portuguese slug was aligned with "set-linux-cpu-governor-to-schedutil".',
  },
  {
    matches: (record) =>
      record.collection === "blog" && record.sourceSlug === "i-dont-care",
    reason:
      "The article references a legacy image path; verify the copied asset and rendered image.",
  },
  {
    matches: (record) =>
      record.collection === "blog" &&
      record.sourceSlug ===
        "sometimes-humans-just-need-to-sit-in-one-place-and-like-hurt",
    reason:
      "The article references a legacy image path; verify the copied asset and rendered image.",
  },
  {
    matches: (record) =>
      record.collection === "blog" &&
      record.sourceSlug === "echoes-of-a-conflicted-impostor",
    reason:
      "Review absolute links to the previous website and localized route behavior.",
  },
  {
    matches: (record) =>
      record.collection === "blog" &&
      record.sourceSlug === "reflections-on-solitude-and-superficiality",
    reason:
      "Review internal links and protocol-less URLs from the previous website.",
  },
];

function toPosixPath(value: string): string {
  return value.split(path.sep).join("/");
}

function targetCollectionFor(collection: LegacyCollection): TargetCollection {
  return collection === "blog" ? "blog" : "snippets";
}

export function normalizeLegacySlug(
  collection: LegacyCollection,
  locale: string,
  slug: string,
): string {
  if (collection === "blog" && slug === "dAppling") {
    return "dappling";
  }

  if (
    collection === "snippet" &&
    locale === "pt" &&
    slug === "linux-cpu-governor-schedutil"
  ) {
    return "set-linux-cpu-governor-to-schedutil";
  }

  return slug;
}

function unquoteYamlScalar(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

export function extractOriginalFrontmatterScalar(
  source: string,
  key: string,
): string | undefined {
  const frontmatterMatch = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!frontmatterMatch?.[1]) {
    return undefined;
  }

  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const valueMatch = frontmatterMatch[1].match(
    new RegExp(`^${escapedKey}:\\s*(.+?)\\s*$`, "m"),
  );

  return valueMatch?.[1] ? unquoteYamlScalar(valueMatch[1]) : undefined;
}

function datesRepresentSameInstant(left: string, right: string): boolean {
  const leftTime = new Date(left).getTime();
  const rightTime = new Date(right).getTime();

  return (
    !Number.isNaN(leftTime) &&
    !Number.isNaN(rightTime) &&
    leftTime === rightTime
  );
}

function ensureStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is string => typeof item === "string" && item.length > 0,
  );
}

function dedent(value: string): string {
  const lines = value.replace(/^\r?\n/, "").replace(/\r?\n\s*$/, "").split(/\r?\n/);
  const indentation = lines
    .filter((line) => line.trim().length > 0)
    .map((line) => line.match(/^\s*/)?.[0].length ?? 0);
  const minimum = indentation.length > 0 ? Math.min(...indentation) : 0;

  return lines.map((line) => line.slice(minimum)).join("\n");
}

export function convertLegacyCallouts(body: string): {
  body: string;
  count: number;
  hasUnsupportedCallout: boolean;
} {
  let count = 0;
  const converted = body.replace(
    /<Callout\s+type=(["'])([^"']+)\1\s*>([\s\S]*?)<\/Callout>/g,
    (_match, _quote: string, type: string, content: string) => {
      count += 1;
      return `<blockquote data-callout="${type}">\n${dedent(content)}\n</blockquote>`;
    },
  );

  return {
    body: converted,
    count,
    hasUnsupportedCallout: /<\/?Callout\b/.test(converted),
  };
}

export function removeLegacyMoreMarkers(body: string): {
  body: string;
  count: number;
} {
  let count = 0;
  const converted = body.replace(
    /^\s*\{\/\*\s*more\s*\*\/\}\s*(?:\r?\n)?/gm,
    () => {
      count += 1;
      return "";
    },
  );

  return { body: converted, count };
}

export function normalizeMarkdownHardBreaks(body: string): {
  body: string;
  count: number;
} {
  const lines = body.split(/\r?\n/);
  let count = 0;
  let fence:
    | {
        character: string;
        length: number;
      }
    | undefined;

  const converted = lines.map((line) => {
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);
    if (fenceMatch?.[1]) {
      const marker = fenceMatch[1];
      if (!fence) {
        fence = { character: marker[0]!, length: marker.length };
      } else if (
        marker[0] === fence.character &&
        marker.length >= fence.length
      ) {
        fence = undefined;
      }
      return line;
    }

    if (!fence && /\S {2,}$/.test(line)) {
      count += 1;
      return line.replace(/ {2,}$/, "<br />");
    }

    return line;
  });

  return { body: converted.join("\n"), count };
}

export function inferSnippetTaxonomy(
  slug: string,
  title: string,
  tags: string[],
): SnippetTaxonomy {
  const category = snippetCategoryBySlug[slug] ?? "uncategorized";
  const searchable = [slug, title, ...tags].join(" ").toLowerCase();
  const stack: string[] = [];

  for (const rule of stackRules) {
    if (
      rule.terms.some((term) => {
        const pattern = new RegExp(
          `(^|[^a-z0-9])${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z0-9]|$)`,
        );
        return pattern.test(searchable);
      }) &&
      !stack.includes(rule.value)
    ) {
      stack.push(rule.value);
    }
  }

  return { slug, category, stack };
}

function getLinkSuggestion(value: string): string | undefined {
  if (value === "https://yuricunha.com" || value === "https://yuricunha.com/") {
    return "Review whether this should use the site root route.";
  }

  if (value.startsWith("https://yuricunha.com/blog/")) {
    return "Review whether this should use a locale-aware internal blog route.";
  }

  if (value === "https://yuricunha.com/blog") {
    return "Review whether this should use the locale-aware blog index route.";
  }

  if (value === "yuricunha.com" || value === "yuricunha.com/blog") {
    return "Add a protocol or replace with a locale-aware internal route.";
  }

  return undefined;
}

function scanLegacyLinks(
  record: LegacyRecord,
  body: string,
): LegacyLink[] {
  const findings: LegacyLink[] = [];
  const relevant = (value: string) =>
    value.startsWith("https://yuricunha.com") ||
    value.startsWith("http://yuricunha.com") ||
    value.startsWith("yuricunha.com") ||
    value.startsWith("/static/");

  for (const [index, line] of body.split(/\r?\n/).entries()) {
    for (const match of line.matchAll(/(!?)\[[^\]]*\]\(([^)]+)\)/g)) {
      const value = match[2];
      if (!value || !relevant(value)) {
        continue;
      }

      findings.push({
        sourcePath: record.sourceRelativePath,
        line: index + 1,
        kind: match[1] === "!" ? "image" : "link",
        value,
        suggestion:
          assetDefinitions.find((asset) =>
            asset.oldReferences.some((reference) => reference === value),
          )?.newReference ?? getLinkSuggestion(value),
      });
    }

    const sourceMatch = line.match(/\bsrc=["']([^"']+)["']/);
    const value = sourceMatch?.[1];
    if (value && relevant(value)) {
      findings.push({
        sourcePath: record.sourceRelativePath,
        line: index + 1,
        kind: "image",
        value,
        suggestion:
          assetDefinitions.find((asset) =>
            asset.oldReferences.some((reference) => reference === value),
          )?.newReference,
      });
    }
  }

  return findings;
}

function replaceLegacyAssetReferences(body: string): string {
  let converted = body;
  for (const asset of assetDefinitions) {
    for (const oldReference of asset.oldReferences) {
      converted = converted.replaceAll(oldReference, asset.newReference);
    }
  }
  return converted;
}

function addManualReview(
  reviews: Map<string, ManualReview>,
  record: LegacyRecord,
  reason: string,
): void {
  const existing = reviews.get(record.sourceRelativePath) ?? {
    sourcePath: record.sourceRelativePath,
    destinationPath: record.destinationRelativePath,
    reasons: [] as string[],
  };

  if (!existing.reasons.includes(reason)) {
    existing.reasons.push(reason);
  }
  reviews.set(record.sourceRelativePath, existing);
}

async function pathExists(filePath: string): Promise<boolean> {
  try {
    await stat(filePath);
    return true;
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return false;
    }
    throw error;
  }
}

async function getDirectEmptyDirectories(
  destinationRepoRoot: string,
): Promise<string[]> {
  const emptyDirectories: string[] = [];

  for (const collection of ["blog", "snippets"] as const) {
    const collectionRoot = path.join(
      destinationRepoRoot,
      "src",
      "content",
      collection,
    );
    const entries = await readdir(collectionRoot, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }

      const entryPath = path.join(collectionRoot, entry.name);
      if ((await readdir(entryPath)).length === 0) {
        emptyDirectories.push(entryPath);
      }
    }
  }

  return emptyDirectories.sort();
}

async function readGitState(sourceRepoRoot: string): Promise<{
  commit?: string;
  modifiedContentFiles: string[];
  warning?: string;
}> {
  try {
    const [{ stdout: commitOutput }, { stdout: statusOutput }] =
      await Promise.all([
        execFileAsync("git", ["rev-parse", "HEAD"], { cwd: sourceRepoRoot }),
        execFileAsync(
          "git",
          ["status", "--porcelain=v1", "--untracked-files=all"],
          { cwd: sourceRepoRoot },
        ),
      ]);
    const modifiedContentFiles = statusOutput
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => line.slice(3))
      .filter(
        (filePath) =>
          filePath.startsWith("apps/web/src/content/blog/") ||
          filePath.startsWith("apps/web/src/content/snippet/"),
      )
      .sort();

    return {
      commit: commitOutput.trim(),
      modifiedContentFiles,
    };
  } catch (error) {
    return {
      modifiedContentFiles: [],
      warning: `Could not inspect the legacy repository Git state: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
}

async function readLegacyRecords(
  sourceRepoRoot: string,
  destinationRepoRoot: string,
  report: MigrationReport,
): Promise<LegacyRecord[]> {
  const records: LegacyRecord[] = [];

  for (const collection of legacyCollections) {
    const collectionRoot = path.join(
      sourceRepoRoot,
      "apps",
      "web",
      "src",
      "content",
      collection,
    );
    const localeEntries = await readdir(collectionRoot, {
      withFileTypes: true,
    });

    for (const localeEntry of localeEntries.sort((left, right) =>
      left.name.localeCompare(right.name),
    )) {
      if (!localeEntry.isDirectory()) {
        continue;
      }

      const sourceLocale = localeEntry.name;
      const targetLocale = localeMap[sourceLocale];
      const localeRoot = path.join(collectionRoot, sourceLocale);
      const files = await readdir(localeRoot, { withFileTypes: true });

      for (const file of files.sort((left, right) =>
        left.name.localeCompare(right.name),
      )) {
        if (!file.isFile() || path.extname(file.name) !== ".mdx") {
          continue;
        }

        const sourcePath = path.join(localeRoot, file.name);
        const sourceRelativePath = toPosixPath(
          path.relative(sourceRepoRoot, sourcePath),
        );
        report.totals.found += 1;

        if (!targetLocale) {
          report.skipped.spanish.push(sourceRelativePath);
          continue;
        }

        const sourceSlug = path.basename(file.name, ".mdx");
        const targetSlug = normalizeLegacySlug(
          collection,
          sourceLocale,
          sourceSlug,
        );
        const targetCollection = targetCollectionFor(collection);
        const destinationPath = path.join(
          destinationRepoRoot,
          "src",
          "content",
          targetCollection,
          targetSlug,
          `${targetLocale}.mdx`,
        );
        const destinationRelativePath = toPosixPath(
          path.relative(destinationRepoRoot, destinationPath),
        );
        const source = await readFile(sourcePath, "utf8");

        let parsed: matter.GrayMatterFile<string>;
        try {
          parsed = matter(source);
        } catch (error) {
          report.errors.push(
            `${sourceRelativePath}: invalid frontmatter: ${
              error instanceof Error ? error.message : String(error)
            }`,
          );
          continue;
        }

        records.push({
          collection,
          sourceLocale,
          targetLocale,
          sourceSlug,
          targetSlug,
          sourcePath,
          sourceRelativePath,
          destinationPath,
          destinationRelativePath,
          source,
          body: parsed.content,
          data: parsed.data,
        });
      }
    }
  }

  report.totals.eligible = records.length;
  report.totals.skippedSpanish = report.skipped.spanish.length;
  return records;
}

function validateRequiredString(
  record: LegacyRecord,
  field: string,
  report: MigrationReport,
): string | undefined {
  const value = record.data[field];
  if (typeof value !== "string" || value.trim().length === 0) {
    report.errors.push(
      `${record.sourceRelativePath}: missing required string frontmatter "${field}".`,
    );
    return undefined;
  }

  return value;
}

function transformRecord(
  record: LegacyRecord,
  englishSnippetRecords: Map<string, LegacyRecord>,
  report: MigrationReport,
): string | undefined {
  const title = validateRequiredString(record, "title", report);
  const description = validateRequiredString(
    record,
    record.collection === "blog" ? "summary" : "description",
    report,
  );
  const publishedDate = extractOriginalFrontmatterScalar(record.source, "date");

  if (!title || !description || !publishedDate) {
    if (!publishedDate) {
      report.errors.push(
        `${record.sourceRelativePath}: missing original "date" scalar.`,
      );
    }
    return undefined;
  }

  if (Number.isNaN(new Date(publishedDate).getTime())) {
    report.errors.push(
      `${record.sourceRelativePath}: invalid original date "${publishedDate}".`,
    );
    return undefined;
  }

  const tags = ensureStringArray(record.data.tags);
  if (
    record.collection === "blog" &&
    typeof record.data.category === "string" &&
    record.data.category.length > 0 &&
    !tags.includes(record.data.category)
  ) {
    tags.push(record.data.category);
    report.warnings.push(
      `${record.sourceRelativePath}: preserved legacy category "${record.data.category}" as a tag.`,
    );
  }

  let body = record.body;
  const callouts = convertLegacyCallouts(body);
  body = callouts.body;
  if (callouts.hasUnsupportedCallout) {
    report.errors.push(
      `${record.sourceRelativePath}: contains an unsupported Callout shape that could not be converted safely.`,
    );
    return undefined;
  }
  if (callouts.count > 0) {
    report.calloutsConverted.push({
      sourcePath: record.sourceRelativePath,
      destinationPath: record.destinationRelativePath!,
      count: callouts.count,
    });
  }

  if (record.collection === "snippet") {
    const moreMarkers = removeLegacyMoreMarkers(body);
    body = moreMarkers.body;
    if (moreMarkers.count > 0) {
      report.moreMarkersRemoved.push({
        sourcePath: record.sourceRelativePath,
        destinationPath: record.destinationRelativePath!,
        count: moreMarkers.count,
      });
    }
  }

  const hardBreaks = normalizeMarkdownHardBreaks(body);
  body = hardBreaks.body;
  if (hardBreaks.count > 0) {
    report.markdownHardBreaksNormalized.push({
      sourcePath: record.sourceRelativePath,
      destinationPath: record.destinationRelativePath!,
      count: hardBreaks.count,
    });
  }

  body = replaceLegacyAssetReferences(body);

  const outputData: Record<string, unknown> = {
    title,
    description,
    publishedDate,
    locale: record.targetLocale,
    tags,
    draft: false,
    featured:
      typeof record.data.featured === "boolean"
        ? record.data.featured
        : false,
  };

  if (record.collection === "blog") {
    const modifiedTime = extractOriginalFrontmatterScalar(
      record.source,
      "modifiedTime",
    );
    if (
      modifiedTime &&
      !datesRepresentSameInstant(publishedDate, modifiedTime)
    ) {
      outputData.updatedDate = modifiedTime;
    }
  } else {
    const englishRecord =
      englishSnippetRecords.get(record.targetSlug) ?? record;
    const taxonomy = inferSnippetTaxonomy(
      record.targetSlug,
      validateRequiredString(englishRecord, "title", report) ?? title,
      ensureStringArray(englishRecord.data.tags),
    );
    outputData.category = taxonomy.category;
    outputData.stack = taxonomy.stack;

    if (taxonomy.category === "uncategorized") {
      if (!report.uncategorized.includes(record.targetSlug)) {
        report.uncategorized.push(record.targetSlug);
      }
      report.warnings.push(
        `${record.sourceRelativePath}: no explicit category mapping; using "uncategorized".`,
      );
    }
  }

  if (record.targetLocale !== "en") {
    outputData.canonicalSourceLocale = "en";
    outputData.translation = { sourceLocale: "en" };
  }

  return matter.stringify(body, outputData);
}

async function prepareAssets(
  records: LegacyRecord[],
  sourceRepoRoot: string,
  destinationRepoRoot: string,
): Promise<AssetMigration[]> {
  return Promise.all(
    assetDefinitions.map(async (asset) => {
      const referencingFiles = records
        .filter((record) =>
          asset.oldReferences.some((reference) =>
            record.body.includes(reference),
          ),
        )
        .map((record) => record.sourceRelativePath)
        .sort();
      const sourcePath = path.join(sourceRepoRoot, asset.sourceRelativePath);
      const destinationPath = path.join(
        destinationRepoRoot,
        asset.destinationRelativePath,
      );
      let status: AssetMigration["status"] = "not-referenced";

      if (referencingFiles.length > 0) {
        if (!(await pathExists(sourcePath))) {
          status = "missing";
        } else if (await pathExists(destinationPath)) {
          status = "skipped-existing";
        } else {
          status = "planned";
        }
      }

      return {
        sourcePath: toPosixPath(path.relative(sourceRepoRoot, sourcePath)),
        destinationPath: toPosixPath(
          path.relative(destinationRepoRoot, destinationPath),
        ),
        oldReferences: [...asset.oldReferences],
        newReference: asset.newReference,
        referencingFiles,
        status,
      };
    }),
  );
}

function buildSnippetTaxonomy(records: LegacyRecord[]): SnippetTaxonomy[] {
  return records
    .filter(
      (record) =>
        record.collection === "snippet" && record.targetLocale === "en",
    )
    .map((record) =>
      inferSnippetTaxonomy(
        record.targetSlug,
        typeof record.data.title === "string" ? record.data.title : "",
        ensureStringArray(record.data.tags),
      ),
    )
    .sort((left, right) => left.slug.localeCompare(right.slug));
}

function createEmptyReport(
  options: MigrationOptions,
  reportPath: string,
): MigrationReport {
  return {
    schemaVersion: 1,
    mode: options.apply ? "apply" : "dry-run",
    generatedAt: new Date().toISOString(),
    source: {
      repoPath:
        toPosixPath(
          path.relative(options.destinationRepoRoot, options.sourceRepoRoot),
        ) || ".",
      dirty: false,
      modifiedContentFiles: [],
      modifiedSourceFilesMigrated: [],
    },
    destination: {
      repoPath: ".",
      reportPath: toPosixPath(
        path.relative(options.destinationRepoRoot, reportPath),
      ),
    },
    totals: {
      found: 0,
      eligible: 0,
      planned: 0,
      migrated: 0,
      skippedSpanish: 0,
      skippedExisting: 0,
      skippedManualReview: 0,
      warnings: 0,
      errors: 0,
    },
    plannedFiles: [],
    migratedFiles: [],
    skipped: {
      spanish: [],
      existing: [],
      manualReview: [],
    },
    emptyDirectories: {
      eligibleForRemoval: [],
      removed: [],
      retained: [],
    },
    calloutsConverted: [],
    moreMarkersRemoved: [],
    markdownHardBreaksNormalized: [],
    assets: [],
    legacyLinks: [],
    slugCorrections: [],
    snippetTaxonomy: [],
    uncategorized: [],
    needsManualReview: [],
    warnings: [],
    errors: [],
  };
}

export async function runLegacyContentMigration(
  options: MigrationOptions,
): Promise<MigrationReport> {
  const sourceRepoRoot = path.resolve(options.sourceRepoRoot);
  const destinationRepoRoot = path.resolve(options.destinationRepoRoot);
  const reportPath = path.resolve(
    options.reportPath ??
      path.join(destinationRepoRoot, "migration-report.json"),
  );
  const normalizedOptions = {
    ...options,
    sourceRepoRoot,
    destinationRepoRoot,
  };
  const report = createEmptyReport(normalizedOptions, reportPath);

  const gitState = await readGitState(sourceRepoRoot);
  report.source.commit = gitState.commit;
  report.source.modifiedContentFiles = gitState.modifiedContentFiles;
  report.source.dirty = gitState.modifiedContentFiles.length > 0;
  if (gitState.warning) {
    report.warnings.push(gitState.warning);
  }

  report.emptyDirectories.eligibleForRemoval = (
    await getDirectEmptyDirectories(destinationRepoRoot)
  ).map((directory) =>
    toPosixPath(path.relative(destinationRepoRoot, directory)),
  );

  const records = await readLegacyRecords(
    sourceRepoRoot,
    destinationRepoRoot,
    report,
  );
  report.snippetTaxonomy = buildSnippetTaxonomy(records);
  report.assets = await prepareAssets(
    records,
    sourceRepoRoot,
    destinationRepoRoot,
  );

  const missingAssets = report.assets.filter(
    (asset) => asset.status === "missing",
  );
  for (const asset of missingAssets) {
    report.warnings.push(
      `${asset.sourcePath}: referenced asset is missing and was not copied.`,
    );
  }

  const reviews = new Map<string, ManualReview>();
  const targetKeys = new Set<string>();
  const englishSnippetRecords = new Map(
    records
      .filter(
        (record) =>
          record.collection === "snippet" && record.targetLocale === "en",
      )
      .map((record) => [record.targetSlug, record]),
  );
  const outputs = new Map<string, string>();

  for (const record of records) {
    for (const reviewRule of knownManualReviewReasons) {
      if (reviewRule.matches(record)) {
        addManualReview(reviews, record, reviewRule.reason);
      }
    }

    report.legacyLinks.push(...scanLegacyLinks(record, record.body));

    if (record.sourceSlug !== record.targetSlug) {
      report.slugCorrections.push({
        collection: targetCollectionFor(record.collection),
        sourceSlug: record.sourceSlug,
        targetSlug: record.targetSlug,
        sourcePath: record.sourceRelativePath,
        destinationPath: record.destinationRelativePath!,
      });
    }

    const targetKey = `${targetCollectionFor(record.collection)}:${record.targetSlug}:${record.targetLocale}`;
    if (targetKeys.has(targetKey)) {
      report.errors.push(
        `${record.sourceRelativePath}: multiple legacy files resolve to "${record.destinationRelativePath}".`,
      );
      continue;
    }
    targetKeys.add(targetKey);

    if (await pathExists(record.destinationPath!)) {
      report.skipped.existing.push(record.destinationRelativePath!);
      continue;
    }

    const output = transformRecord(record, englishSnippetRecords, report);
    if (!output) {
      report.skipped.manualReview.push(record.sourceRelativePath);
      addManualReview(
        reviews,
        record,
        "Automatic conversion failed; do not migrate without manual repair.",
      );
      continue;
    }

    report.plannedFiles.push(record.destinationRelativePath!);
    outputs.set(record.destinationPath!, output);
  }

  report.needsManualReview = [...reviews.values()].sort((left, right) =>
    left.sourcePath.localeCompare(right.sourcePath),
  );
  report.source.modifiedSourceFilesMigrated =
    report.source.modifiedContentFiles.filter((sourcePath) =>
      records.some(
        (record) =>
          record.sourceRelativePath === sourcePath &&
          outputs.has(record.destinationPath!),
      ),
    );

  report.totals.planned = report.plannedFiles.length;
  report.totals.skippedExisting = report.skipped.existing.length;
  report.totals.skippedManualReview = report.skipped.manualReview.length;

  if (options.apply && report.errors.length === 0) {
    if (await pathExists(reportPath)) {
      report.errors.push(
        `${toPosixPath(path.relative(destinationRepoRoot, reportPath))}: report already exists; refusing to overwrite it.`,
      );
    } else {
      for (const relativeDirectory of report.emptyDirectories
        .eligibleForRemoval) {
        const directory = path.join(destinationRepoRoot, relativeDirectory);
        try {
          await rmdir(directory);
          report.emptyDirectories.removed.push(relativeDirectory);
        } catch (error) {
          report.emptyDirectories.retained.push(relativeDirectory);
          report.warnings.push(
            `${relativeDirectory}: empty-directory cleanup skipped because it is no longer empty or could not be removed: ${
              error instanceof Error ? error.message : String(error)
            }`,
          );
        }
      }

      for (const [destinationPath, output] of outputs) {
        await mkdir(path.dirname(destinationPath), { recursive: true });
        await writeFile(destinationPath, output, {
          encoding: "utf8",
          flag: "wx",
        });
        report.migratedFiles.push(
          toPosixPath(path.relative(destinationRepoRoot, destinationPath)),
        );
      }

      for (const asset of report.assets) {
        if (asset.status !== "planned") {
          continue;
        }

        const sourcePath = path.join(sourceRepoRoot, asset.sourcePath);
        const destinationPath = path.join(
          destinationRepoRoot,
          asset.destinationPath,
        );
        await mkdir(path.dirname(destinationPath), { recursive: true });
        await copyFile(
          sourcePath,
          destinationPath,
          fsConstants.COPYFILE_EXCL,
        );

        const [sourceStats, destinationStats] = await Promise.all([
          stat(sourcePath),
          stat(destinationPath),
        ]);
        if (sourceStats.size !== destinationStats.size) {
          throw new Error(
            `${asset.destinationPath}: copied asset size does not match its source.`,
          );
        }
        asset.status = "copied";
      }

      report.totals.migrated = report.migratedFiles.length;
      report.totals.warnings = report.warnings.length;
      report.totals.errors = report.errors.length;
      await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, {
        encoding: "utf8",
        flag: "wx",
      });
    }
  }

  report.totals.warnings = report.warnings.length;
  report.totals.errors = report.errors.length;
  return report;
}

export function formatMigrationSummary(report: MigrationReport): string {
  const lines = [
    `Mode: ${report.mode}`,
    `Found: ${report.totals.found}`,
    `Eligible: ${report.totals.eligible}`,
    `Planned: ${report.totals.planned}`,
    `Migrated: ${report.totals.migrated}`,
    `Skipped Spanish: ${report.totals.skippedSpanish}`,
    `Skipped existing: ${report.totals.skippedExisting}`,
    `Needs manual review: ${report.needsManualReview.length}`,
    `Callout files converted: ${report.calloutsConverted.length}`,
    `Legacy marker files cleaned: ${report.moreMarkersRemoved.length}`,
    `Assets copied: ${report.assets.filter((asset) => asset.status === "copied").length}`,
    `Warnings: ${report.totals.warnings}`,
    `Errors: ${report.totals.errors}`,
  ];

  if (report.mode === "dry-run") {
    lines.push("Dry-run completed without writing files.");
  } else if (report.totals.errors === 0) {
    lines.push(`Report: ${report.destination.reportPath}`);
  }

  return lines.join("\n");
}
