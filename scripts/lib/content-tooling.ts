import { mkdir, readdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import {
  defaultLocale,
  isLocale,
  nonDefaultLocales,
  type Locale,
} from "../../src/i18n/config";

export const contentCollections = ["blog", "snippets", "projects"] as const;

export type ContentCollection = (typeof contentCollections)[number];

export type ContentRecord = {
  collection: ContentCollection;
  slug: string;
  locale: Locale;
  filePath: string;
  data: Record<string, unknown>;
  content: string;
};

export type MissingTranslation = {
  collection: ContentCollection;
  slug: string;
  source: ContentRecord;
  targetLocale: Exclude<Locale, "en">;
  targetPath: string;
};

export type ValidationReport = {
  errors: string[];
  warnings: string[];
  records: ContentRecord[];
  missingTranslations: MissingTranslation[];
};

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const REQUIRED_FIELDS: Record<ContentCollection, string[]> = {
  blog: ["title", "description", "publishedDate", "locale"],
  snippets: [
    "title",
    "description",
    "publishedDate",
    "locale",
    "category",
  ],
  projects: ["name", "description", "locale", "status", "category"],
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidDate(value: unknown): boolean {
  if (!(typeof value === "string" || value instanceof Date)) {
    return false;
  }

  return !Number.isNaN(new Date(value).getTime());
}

function isDraft(record: ContentRecord): boolean {
  return record.data.draft === true;
}

function getRecordKey(
  collection: ContentCollection,
  slug: string,
  locale: Locale,
): string {
  return `${collection}:${slug}:${locale}`;
}

export function isValidSlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug);
}

export function humanizeSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => `${word[0]?.toUpperCase() ?? ""}${word.slice(1)}`)
    .join(" ");
}

export async function loadContentRecords(
  contentRoot: string,
): Promise<ContentRecord[]> {
  const records: ContentRecord[] = [];

  for (const collection of contentCollections) {
    const collectionRoot = path.join(contentRoot, collection);
    const slugEntries = await readdir(collectionRoot, { withFileTypes: true });

    for (const slugEntry of slugEntries) {
      if (!slugEntry.isDirectory()) {
        continue;
      }

      const slug = slugEntry.name;
      const entryRoot = path.join(collectionRoot, slug);
      const files = await readdir(entryRoot, { withFileTypes: true });

      for (const file of files) {
        if (!file.isFile() || path.extname(file.name) !== ".mdx") {
          continue;
        }

        const localeName = path.basename(file.name, ".mdx");
        if (!isLocale(localeName)) {
          records.push({
            collection,
            slug,
            locale: defaultLocale,
            filePath: path.join(entryRoot, file.name),
            data: { __invalidLocale: localeName },
            content: "",
          });
          continue;
        }

        const filePath = path.join(entryRoot, file.name);
        const source = await readFile(filePath, "utf8");
        const parsed = matter(source);

        records.push({
          collection,
          slug,
          locale: localeName,
          filePath,
          data: parsed.data,
          content: parsed.content,
        });
      }
    }
  }

  return records;
}

export function findMissingTranslations(
  records: ContentRecord[],
  contentRoot: string,
): MissingTranslation[] {
  const recordsByKey = new Map(
    records.map((record) => [
      getRecordKey(record.collection, record.slug, record.locale),
      record,
    ]),
  );
  const englishRecords = records.filter(
    (record) =>
      record.locale === defaultLocale &&
      record.data.__invalidLocale === undefined &&
      !isDraft(record),
  );

  return englishRecords.flatMap((source) =>
    nonDefaultLocales.flatMap((targetLocale) => {
      const key = getRecordKey(source.collection, source.slug, targetLocale);
      if (recordsByKey.has(key)) {
        return [];
      }

      return [
        {
          collection: source.collection,
          slug: source.slug,
          source,
          targetLocale,
          targetPath: path.join(
            contentRoot,
            source.collection,
            source.slug,
            `${targetLocale}.mdx`,
          ),
        },
      ];
    }),
  );
}

export async function validateContentRoot(
  contentRoot: string,
  strictI18n: boolean,
): Promise<ValidationReport> {
  const errors: string[] = [];
  const warnings: string[] = [];
  const records = await loadContentRecords(contentRoot);
  const recordsByKey = new Map<string, ContentRecord>();
  const slugKeys = new Map<string, string>();

  for (const record of records) {
    const relativePath = path.relative(contentRoot, record.filePath);
    const invalidLocale = record.data.__invalidLocale;

    if (typeof invalidLocale === "string") {
      errors.push(`${relativePath}: unsupported locale filename "${invalidLocale}".`);
      continue;
    }

    if (!isValidSlug(record.slug)) {
      errors.push(`${relativePath}: slug directory must use kebab-case.`);
    }

    const slugKey = `${record.collection}:${record.slug.toLowerCase()}`;
    const existingSlug = slugKeys.get(slugKey);
    if (existingSlug && existingSlug !== record.slug) {
      errors.push(
        `${record.collection}: duplicate case-insensitive slugs "${existingSlug}" and "${record.slug}".`,
      );
    }
    slugKeys.set(slugKey, record.slug);

    const key = getRecordKey(record.collection, record.slug, record.locale);
    if (recordsByKey.has(key)) {
      errors.push(`${relativePath}: duplicate collection, slug, and locale.`);
    }
    recordsByKey.set(key, record);

    for (const field of REQUIRED_FIELDS[record.collection]) {
      if (!(field in record.data) || record.data[field] === "") {
        errors.push(`${relativePath}: missing required frontmatter "${field}".`);
      }
    }

    if (record.data.locale !== record.locale) {
      errors.push(
        `${relativePath}: frontmatter locale must match filename "${record.locale}".`,
      );
    }

    for (const dateField of [
      "publishedDate",
      "updatedDate",
      "startDate",
      "endDate",
    ]) {
      const value = record.data[dateField];
      if (value !== undefined && !isValidDate(value)) {
        errors.push(`${relativePath}: "${dateField}" is not a valid date.`);
      }
    }
  }

  const groups = new Map<string, ContentRecord[]>();
  for (const record of records.filter(
    (item) => item.data.__invalidLocale === undefined,
  )) {
    const key = `${record.collection}:${record.slug}`;
    const group = groups.get(key) ?? [];
    group.push(record);
    groups.set(key, group);
  }

  for (const [key, group] of groups) {
    const englishSource = group.find((record) => record.locale === defaultLocale);
    if (!englishSource) {
      errors.push(`${key}: translated content exists without an English source.`);
      continue;
    }

    const availableLocales = new Set(group.map((record) => record.locale));
    for (const record of group) {
      const translation = record.data.translation;
      const canonicalSourceLocale = record.data.canonicalSourceLocale;

      if (
        canonicalSourceLocale !== undefined &&
        (typeof canonicalSourceLocale !== "string" ||
          !isLocale(canonicalSourceLocale) ||
          !availableLocales.has(canonicalSourceLocale))
      ) {
        errors.push(
          `${path.relative(contentRoot, record.filePath)}: canonical source locale does not resolve to a sibling translation.`,
        );
      }

      if (translation !== undefined) {
        if (!isRecord(translation)) {
          errors.push(
            `${path.relative(contentRoot, record.filePath)}: translation metadata must be an object.`,
          );
          continue;
        }

        const sourceLocale = translation.sourceLocale;
        if (
          typeof sourceLocale !== "string" ||
          !isLocale(sourceLocale) ||
          !availableLocales.has(sourceLocale)
        ) {
          errors.push(
            `${path.relative(contentRoot, record.filePath)}: translation source locale does not resolve to a sibling file.`,
          );
        }
      }
    }
  }

  const missingTranslations = findMissingTranslations(records, contentRoot);
  for (const missing of missingTranslations) {
    const message = `${missing.collection}/${missing.slug}: missing ${missing.targetLocale}.mdx`;
    if (strictI18n) {
      errors.push(message);
    } else {
      warnings.push(message);
    }
  }

  return { errors, warnings, records, missingTranslations };
}

export async function createEnglishEntry(
  contentRoot: string,
  collection: "blog" | "snippets",
  slug: string,
  content: string,
): Promise<string> {
  if (!isValidSlug(slug)) {
    throw new Error("Slug must contain lowercase letters, numbers, and hyphens.");
  }

  const entryRoot = path.join(contentRoot, collection, slug);
  const filePath = path.join(entryRoot, "en.mdx");
  await mkdir(entryRoot, { recursive: true });

  let fileExists = true;
  try {
    await readFile(filePath, "utf8");
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      fileExists = false;
    } else {
      throw error;
    }
  }

  if (fileExists) {
    throw new Error(`${path.relative(process.cwd(), filePath)} already exists.`);
  }

  await writeFile(filePath, content, "utf8");
  return filePath;
}

export async function writeTranslationAtomically(
  targetPath: string,
  content: string,
): Promise<void> {
  const parsed = matter(content);
  if (!isRecord(parsed.data) || typeof parsed.data.locale !== "string") {
    throw new Error("Translated output must contain a locale in frontmatter.");
  }

  await mkdir(path.dirname(targetPath), { recursive: true });
  const temporaryPath = `${targetPath}.tmp`;
  await writeFile(temporaryPath, content, "utf8");
  await rename(temporaryPath, targetPath);
}
