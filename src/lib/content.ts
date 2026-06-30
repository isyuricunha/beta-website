import {
  getCollection,
  type CollectionEntry,
  type CollectionKey,
} from "astro:content";

import { defaultLocale, type Locale } from "@/i18n/config";
import { parseContentId } from "@/lib/content-utils";

export type SiteCollection = Extract<
  CollectionKey,
  "blog" | "snippets" | "projects"
>;

export type LocalizedEntry<C extends SiteCollection> = {
  entry: CollectionEntry<C>;
  isFallback: boolean;
  entryLocale: Locale;
  slug: string;
};

function isDraft<C extends SiteCollection>(entry: CollectionEntry<C>): boolean {
  return entry.data.draft;
}

export async function getPublishableEntries<C extends SiteCollection>(
  collection: C,
): Promise<CollectionEntry<C>[]> {
  const entries = await getCollection(collection);
  return import.meta.env.PROD
    ? entries.filter((entry) => !isDraft(entry))
    : entries;
}

export async function getLocalizedListing<C extends SiteCollection>(
  collection: C,
  locale: Locale,
): Promise<LocalizedEntry<C>[]> {
  const entries = await getPublishableEntries(collection);
  const entriesBySlug = new Map<
    string,
    Map<Locale, CollectionEntry<C>>
  >();

  for (const entry of entries) {
    const parsed = parseContentId(entry.id);
    const translations =
      entriesBySlug.get(parsed.slug) ?? new Map<Locale, CollectionEntry<C>>();
    translations.set(parsed.locale, entry);
    entriesBySlug.set(parsed.slug, translations);
  }

  return [...entriesBySlug.entries()]
    .flatMap(([slug, translations]) => {
      const localizedEntry = translations.get(locale);
      const fallbackEntry = translations.get(defaultLocale);
      const entry = localizedEntry ?? fallbackEntry;

      if (!entry) {
        return [];
      }

      const entryLocale = parseContentId(entry.id).locale;
      return [
        {
          entry,
          isFallback: !localizedEntry,
          entryLocale,
          slug,
        },
      ];
    })
    .sort((left, right) => getEntryDate(right.entry) - getEntryDate(left.entry));
}

export async function getAvailableLocales(
  collection: SiteCollection,
  slug: string,
): Promise<Locale[]> {
  const entries = await getPublishableEntries(collection);

  return entries
    .map((entry) => parseContentId(entry.id))
    .filter((parsed) => parsed.slug === slug)
    .map((parsed) => parsed.locale);
}

export function getEntryDate(
  entry: CollectionEntry<SiteCollection>,
): number {
  if ("publishedDate" in entry.data) {
    return entry.data.publishedDate.getTime();
  }

  return entry.data.startDate?.getTime() ?? 0;
}

export function getContentPath(
  collection: SiteCollection,
  slug: string,
  locale: Locale,
): string {
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  return `${prefix}/${collection}/${slug}/`;
}

export async function getRelatedPosts(
  locale: Locale,
  currentSlug: string,
  currentTags: string[],
  limit = 3,
): Promise<LocalizedEntry<"blog">[]> {
  if (!currentTags.length) return [];

  const allPosts = await getLocalizedListing("blog", locale);

  // Score posts by shared tags
  const scored = allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      ...p,
      score: p.entry.data.tags.filter((tag) => currentTags.includes(tag)).length,
    }))
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score || getEntryDate(b.entry) - getEntryDate(a.entry));

  return scored.slice(0, limit);
}

export async function getAdjacentPosts(
  locale: Locale,
  currentSlug: string,
): Promise<{ prev: LocalizedEntry<"blog"> | null; next: LocalizedEntry<"blog"> | null }> {
  const allPosts = await getLocalizedListing("blog", locale);
  const currentIndex = allPosts.findIndex((p) => p.slug === currentSlug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  // Posts are sorted by date descending (newest first)
  // Previous = older post (higher index)
  // Next = newer post (lower index)
  const prev = currentIndex + 1 < allPosts.length ? allPosts[currentIndex + 1] ?? null : null;
  const next = currentIndex - 1 >= 0 ? allPosts[currentIndex - 1] ?? null : null;

  return { prev, next };
}
