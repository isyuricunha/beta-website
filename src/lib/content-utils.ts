import { isLocale, type Locale } from "@/i18n/config";

export type ParsedContentId = {
  slug: string;
  locale: Locale;
};

export function parseContentId(id: string): ParsedContentId {
  const normalizedId = id.replace(/\.(md|mdx)$/, "");
  const parts = normalizedId.split("/").filter(Boolean);

  if (parts.length !== 2) {
    throw new Error(`Invalid content entry ID "${id}". Expected "slug/locale".`);
  }

  const [slug, locale] = parts;

  if (!slug || !locale || !isLocale(locale)) {
    throw new Error(`Invalid locale in content entry ID "${id}".`);
  }

  return { slug, locale };
}

export function estimateReadingMinutes(
  body: string,
  locale: Locale,
): number {
  const content = body
    .replace(/^---[\s\S]*?---/, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`[\]()!-]/g, " ");

  if (locale === "ja" || locale === "zh-cn") {
    const characters = content.replace(/\s/g, "").length;
    return Math.max(1, Math.ceil(characters / 400));
  }

  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}
