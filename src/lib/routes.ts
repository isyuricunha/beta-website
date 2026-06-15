import {
  defaultLocale,
  isLocale,
  type Locale,
} from "@/i18n/config";
import type { Section } from "@/i18n/types";

const SITE_ORIGIN = "https://yuricunha.com";

export function getLocaleFromPathname(pathname: string): Locale {
  const firstSegment = new URL(pathname, SITE_ORIGIN).pathname.split("/")[1];
  return firstSegment && isLocale(firstSegment) ? firstSegment : defaultLocale;
}

export function stripLocalePrefix(pathname: string): string {
  const url = new URL(pathname, SITE_ORIGIN);
  const segments = url.pathname.split("/").filter(Boolean);

  if (segments[0] && isLocale(segments[0])) {
    segments.shift();
  }

  const unprefixedPath = `/${segments.join("/")}`;
  return unprefixedPath === "/" ? "/" : `${unprefixedPath}/`;
}

export function getLocalizedPath(
  pathname: string,
  targetLocale: Locale,
): string {
  const url = new URL(pathname, SITE_ORIGIN);
  const unprefixedPath = stripLocalePrefix(url.pathname);
  const localizedPath =
    targetLocale === defaultLocale
      ? unprefixedPath
      : `/${targetLocale}${unprefixedPath}`;

  return `${localizedPath}${url.search}${url.hash}`;
}

export function getSectionPath(locale: Locale, section: Section): string {
  return getLocalizedPath(`/${section}/`, locale);
}
