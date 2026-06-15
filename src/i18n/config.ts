export const locales = ["en", "pt-br", "ja", "zh-cn", "de", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const nonDefaultLocales = locales.filter(
  (locale): locale is Exclude<Locale, "en"> => locale !== defaultLocale,
);

export const localeMetadata: Record<
  Locale,
  { label: string; languageTag: string }
> = {
  en: { label: "English", languageTag: "en" },
  "pt-br": { label: "Português", languageTag: "pt-BR" },
  ja: { label: "日本語", languageTag: "ja" },
  "zh-cn": { label: "中文", languageTag: "zh-CN" },
  de: { label: "Deutsch", languageTag: "de" },
  fr: { label: "Français", languageTag: "fr" },
  es: { label: "Español", languageTag: "es" },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleStaticPaths() {
  return nonDefaultLocales.map((locale) => ({
    params: { locale },
    props: { locale },
  }));
}
