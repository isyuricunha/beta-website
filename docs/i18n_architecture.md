# Internationalization (i18n) Architecture

**yuri-cunha-website** uses a **code-first, TypeScript-native** i18n system — no JSON files, no external translation services at runtime. All UI strings live in typed dictionary objects per locale.

---

## Overview

| Aspect | Implementation |
|--------|----------------|
| **Strategy** | Build-time dictionary lookup |
| **Source of Truth** | `src/i18n/locales/{locale}.ts` (6 files) |
| **Type Safety** | `Dictionary` type in `src/i18n/types.ts` |
| **Runtime Cost** | Zero — resolved at build/SSG time |
| **Locale Detection** | URL prefix (`/pt-br/`, `/ja/`, etc.) |
| **Default Locale** | `en` (no prefix: `/blog/`) |
| **Fallback** | EN content shown with `isFallback: true` flag |

---

## Locale Configuration

**File:** `src/i18n/config.ts`

```typescript
export const locales = ["en", "pt-br", "ja", "zh-cn", "de", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeMetadata: Record<Locale, { label: string; languageTag: string }> = {
  en: { label: "English", languageTag: "en" },
  "pt-br": { label: "Português", languageTag: "pt-BR" },
  ja: { label: "日本語", languageTag: "ja" },
  "zh-cn": { label: "中文", languageTag: "zh-CN" },
  de: { label: "Deutsch", languageTag: "de" },
  fr: { label: "Français", languageTag: "fr" },
};
```

- `label` — shown in LanguageSwitcher dropdown
- `languageTag` — used for `<html lang>` and `hreflang`

---

## Dictionary Structure

**File:** `src/i18n/types.ts` — single source of truth for all UI strings.

```typescript
export type Dictionary = {
  meta: { siteDescription: string };
  navigation: Record<Section, string>;  // blog, snippets, projects, about, contact
  common: {
    skipToContent: string;
    language: string;
    openLanguageMenu: string;
    latest: string;
    featured: string;
    viewAll: string;
    readMore: string;
    email: string;
    github: string;
    rss: string;
    website: string;
    externalLink: string;
    published: string;
    updated: string;
    availableInEnglish: string;
    backToBlog: string;
    backToSnippets: string;
    backToProjects: string;
    tableOfContents: string;
    onThisNote: string;
    copyCode: string;
    copied: string;
    footerNote: string;
    minuteRead: (minutes: number) => string;  // function for pluralization
  };
  projectStatuses: Record<ProjectStatus, string>;
  home: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    description: string;
    statement: string;
    statementHighlight: string;
    statementDetail: string;
    exploreTitle: string;
    exploreDescription: string;
  };
  pages: {
    blog: BlogPageDictionary;
    snippets: SnippetsPageDictionary;
    projects: ProjectsPageDictionary;
    about: AboutPageDictionary;
    contact: ContactPageDictionary;
  };
};
```

### Key Design Decisions

1. **Functions for pluralization** — `minuteRead(minutes)` handles locale-specific rules
2. **Nested page dictionaries** — co-locates strings with their page
3. **No flat keys** — `t('common.copyCode')` not needed; direct object access
4. **Discriminated unions** — `Section`, `ProjectStatus` ensure exhaustiveness

---

## Locale Dictionaries

Each locale file exports a `const` satisfying `Dictionary`:

**File:** `src/i18n/locales/en.ts` (canonical)
```typescript
import type { Dictionary } from "@/i18n/types";

export const en = {
  meta: { siteDescription: "..." },
  navigation: { blog: "Blog", snippets: "Snippets", ... },
  common: { ... },
  projectStatuses: { active: "Active", ... },
  home: { ... },
  pages: { ... },
} satisfies Dictionary;
```

**Other locales:** `pt-br.ts`, `ja.ts`, `zh-cn.ts`, `de.ts`, `fr.ts`

### Adding a New Locale

1. Add to `locales` array in `config.ts`
2. Add metadata to `localeMetadata`
3. Create `src/i18n/locales/{locale}.ts` copying EN structure
4. Translate all strings
5. Add to `dictionaries` registry in `src/i18n/index.ts`
6. Update `astro.config.ts` i18n config
7. Update sitemap i18n config
8. Run `pnpm build` — TypeScript catches missing keys

---

## Dictionary Access

**File:** `src/i18n/index.ts`

```typescript
const dictionaries: Record<Locale, Dictionary> = {
  en,
  "pt-br": ptBr,
  ja,
  "zh-cn": zhCn,
  de,
  fr,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
```

### Usage in Components

```astro
---
import { getDictionary } from "@/i18n";
import { type Locale } from "@/i18n/config";

interface Props { locale: Locale; }
const { locale } = Astro.props;
const dict = getDictionary(locale);
---

<h1>{dict.home.title}</h1>
<p>{dict.common.minuteRead(5)}</p>  <!-- "5 min read" -->
```

- No runtime lookup overhead
- Full TypeScript autocomplete
- Build-time error if key missing

---

## Routing & URL Structure

**File:** `src/lib/routes.ts`

```typescript
export function getLocaleFromPathname(pathname: string): Locale {
  const firstSegment = new URL(pathname, SITE_ORIGIN).pathname.split("/")[1];
  return firstSegment && isLocale(firstSegment) ? firstSegment : defaultLocale;
}

export function stripLocalePrefix(pathname: string): string { ... }

export function getLocalizedPath(pathname: string, targetLocale: Locale): string {
  const unprefixed = stripLocalePrefix(pathname);
  return targetLocale === defaultLocale
    ? unprefixed
    : `/${targetLocale}${unprefixed}`;
}

export function getSectionPath(locale: Locale, section: Section): string {
  return getLocalizedPath(`/${section}/`, locale);
}
```

### URL Patterns

| Page | EN (default) | Other Locales |
|------|--------------|---------------|
| Home | `/` | `/pt-br/`, `/ja/`, `/zh-cn/`, `/de/`, `/fr/` |
| Blog index | `/blog/` | `/pt-br/blog/`, `/ja/blog/`, ... |
| Blog post | `/blog/my-post/` | `/pt-br/blog/my-post/`, ... |
| Snippets | `/snippets/` | `/pt-br/snippets/`, ... |
| Projects | `/projects/` | `/pt-br/projects/`, ... |
| About | `/about/` | `/pt-br/about/`, ... |
| Contact | `/contact/` | `/pt-br/contact/`, ... |

### Astro i18n Config

**File:** `astro.config.ts`

```typescript
i18n: {
  locales: ["en", "pt-br", "ja", "zh-cn", "de", "fr"],
  defaultLocale: "en",
  routing: {
    prefixDefaultLocale: false,  // EN has no prefix
  },
}
```

---

## Content Fallback Logic

**File:** `src/lib/content.ts` — `getLocalizedListing()`

```typescript
const localizedEntry = translations.get(locale);
const fallbackEntry = translations.get(defaultLocale);
const entry = localizedEntry ?? fallbackEntry;

return {
  entry,
  isFallback: !localizedEntry,  // true if showing EN instead
  entryLocale: parseContentId(entry.id).locale,
  slug,
};
```

### Behavior

| Scenario | Result |
|----------|--------|
| Locale file exists | Shows localized content, `isFallback: false` |
| Locale missing, EN exists | Shows EN content, `isFallback: true` |
| Neither exists | Entry excluded from listing |

### UI Indicators

- **LanguageSwitcher** — unavailable locales shown disabled (`aria-disabled`)
- **Content pages** — `availableInEnglish` string shown when `isFallback`
- **hreflang** — only generated for existing locales (via sitemap config)

---

## Adding UI Strings

### Checklist for New Strings

1. Add key to `Dictionary` type in `src/i18n/types.ts`
2. Add to `en.ts` (canonical)
3. Add to all 5 other locale files
4. Use in component via `dict.namespace.key`
5. Run `pnpm build` — verifies all locales compile

### Example: Adding a "Newsletter" CTA

**1. types.ts**
```typescript
common: {
  // ... existing
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    subscribe: string;
    privacy: string;
  };
}
```

**2. en.ts**
```typescript
common: {
  // ...
  newsletter: {
    title: "Stay Updated",
    description: "Get new posts delivered to your inbox.",
    placeholder: "your@email.com",
    subscribe: "Subscribe",
    privacy: "No spam. Unsubscribe anytime.",
  },
}
```

**3. pt-br.ts** (etc.)
```typescript
common: {
  // ...
  newsletter: {
    title: "Fique Atualizado",
    description: "Receba novos posts no seu email.",
    placeholder: "seu@email.com",
    subscribe: "Inscrever",
    privacy: "Sem spam. Cancele quando quiser.",
  },
}
```

**4. Component**
```astro
---
const { locale } = Astro.props;
const dict = getDictionary(locale);
---
<section>
  <h2>{dict.common.newsletter.title}</h2>
  <p>{dict.common.newsletter.description}</p>
  <form>
    <input placeholder={dict.common.newsletter.placeholder} />
    <button>{dict.common.newsletter.subscribe}</button>
    <small>{dict.common.newsletter.privacy}</small>
  </form>
</section>
```

---

## Sitemap & hreflang

**File:** `astro.config.ts` — sitemap integration

```typescript
sitemap({
  i18n: {
    defaultLocale: "en",
    locales: {
      en: "en",
      "pt-br": "pt-BR",
      ja: "ja",
      "zh-cn": "zh-CN",
      de: "de",
      fr: "fr",
    },
  },
})
```

Generates:
- `<url><loc>https://yuricunha.com/blog/post/</loc><xhtml:link rel="alternate" hreflang="en" href="..."/><xhtml:link rel="alternate" hreflang="pt-BR" href="..."/>...</url>`
- Only includes locales where content actually exists

---

## Language Switcher Component

**File:** `src/components/LanguageSwitcher.astro`

```astro
---
import { localeMetadata, locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { getLocalizedPath } from "@/lib/routes";

interface Props {
  locale: Locale;
  pathname: string;
  dictionary: Dictionary;
  availableLocales?: readonly Locale[];
}

const { locale, pathname, dictionary, availableLocales = locales } = Astro.props;
---

<details class="language-switcher">
  <summary>
    <span class="sr-only">{dictionary.common.openLanguageMenu}: </span>
    <span>{locale.toUpperCase()}</span>
    <svg aria-hidden="true" viewBox="0 0 16 16">...</svg>
  </summary>
  <div class="language-menu">
    <p>{dictionary.common.language}</p>
    <ul>
      {locales.map((targetLocale) => {
        const isAvailable = availableLocales.includes(targetLocale);
        const isCurrent = targetLocale === locale;
        return (
          <li>
            {isAvailable ? (
              <a
                href={getLocalizedPath(pathname, targetLocale)}
                lang={localeMetadata[targetLocale].languageTag}
                aria-current={isCurrent ? "page" : undefined}
              >
                <span>{localeMetadata[targetLocale].label}</span>
                <small>{targetLocale}</small>
              </a>
            ) : (
              <span class="unavailable" aria-disabled="true">
                <span>{localeMetadata[targetLocale].label}</span>
                <small>{targetLocale}</small>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  </div>
</details>
```

### Features

- `<details>`/`<summary>` — native dropdown, no JS required
- `getLocalizedPath()` — preserves current page when switching locale
- `availableLocales` — content-aware (passed from page props)
- Unavailable locales shown but disabled (`aria-disabled`)
- `lang` attribute on links for accessibility
- Fully styled in component `<style>` block

---

## SEO Integration

**File:** `src/components/SeoHead.astro`

```astro
---
import { getDictionary } from "@/i18n";
import { localeMetadata, type Locale } from "@/i18n/config";
import { getLocalizedPath, getSectionPath } from "@/lib/routes";

interface Props {
  title: string;
  description: string;
  locale: Locale;
  pathname: string;
  availableLocales?: readonly Locale[];
  type?: "website" | "article";
  publishedTime?: Date;
  updatedTime?: Date;
  tags?: string[];
}

const { locale, pathname, availableLocales, type, publishedTime, updatedTime, tags } = Astro.props;
const dict = getDictionary(locale);
---

<meta name="description" content={description} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:type" content={type ?? "website"} />
<meta property="og:locale" content={localeMetadata[locale].languageTag} />
<link rel="canonical" href={new URL(pathname, SITE_ORIGIN).href} />

{availableLocales &&
  availableLocales.map((altLocale) => (
    <link
      rel="alternate"
      hreflang={localeMetadata[altLocale].languageTag}
      href={new URL(getLocalizedPath(pathname, altLocale), SITE_ORIGIN).href}
    />
  ))}
<link rel="alternate" hreflang="x-default" href={new URL(getLocalizedPath(pathname, "en"), SITE_ORIGIN).href} />
```

### Output Example (EN blog post)

```html
<meta property="og:locale" content="en" />
<link rel="canonical" href="https://yuricunha.com/blog/my-post/" />
<link rel="alternate" hreflang="en" href="https://yuricunha.com/blog/my-post/" />
<link rel="alternate" hreflang="pt-BR" href="https://yuricunha.com/pt-br/blog/my-post/" />
<link rel="alternate" hreflang="ja" href="https://yuricunha.com/ja/blog/my-post/" />
<link rel="alternate" hreflang="zh-CN" href="https://yuricunha.com/zh-cn/blog/my-post/" />
<link rel="alternate" hreflang="de" href="https://yuricunha.com/de/blog/my-post/" />
<link rel="alternate" hreflang="fr" href="https://yuricunha.com/fr/blog/my-post/" />
<link rel="alternate" hreflang="x-default" href="https://yuricunha.com/blog/my-post/" />
```

---

## Testing i18n

### Build-Time Validation

```bash
pnpm build
```

Catches:
- Missing keys in any locale (TypeScript error)
- Invalid locale codes
- Type mismatches

### Runtime Checks (Dev)

```bash
pnpm dev
```

Visit:
- `/` (EN)
- `/pt-br/`
- `/ja/`
- `/zh-cn/`
- `/de/`
- `/fr/`

Verify:
- UI strings translated
- Language switcher works
- Content fallback shows EN with indicator
- hreflang tags present in `<head>`

### Content Coverage Report

```bash
pnpm content:check
```

Shows missing translations per collection.

---

## Common Pitfalls

| Issue | Cause | Fix |
|-------|-------|-----|
| TS error: `Property 'x' missing in type` | New key not added to all locales | Add to all 6 locale files |
| Language switcher shows wrong URL | `pathname` not passed correctly | Ensure `pathname={Astro.url.pathname}` in layout |
| hreflang missing for locale | `availableLocales` not set | Pass `availableLocales` from page data |
| Fallback not working | `getLocalizedListing` not used | Use `getLocalizedListing()` not raw `getCollection()` |
| `minuteRead` shows wrong plural | Function not called with count | Use `dict.common.minuteRead(minutes)` not string |

---

## Migration from JSON-based i18n

If migrating from `packages/i18n/src/messages/*.json`:

1. Convert JSON → TS objects in `src/i18n/locales/`
2. Define `Dictionary` type matching structure
3. Update `getDictionary()` to import TS modules
4. Update components to use `dict.namespace.key`
5. Remove old `@isyuricunha/i18n` dependency
6. Run `pnpm build` to verify

---

## Quick Reference

| File | Purpose |
|------|---------|
| `src/i18n/config.ts` | Locale list, metadata, helpers |
| `src/i18n/types.ts` | `Dictionary` type definition |
| `src/i18n/index.ts` | Registry + `getDictionary()` |
| `src/i18n/locales/*.ts` | 6 locale dictionaries |
| `src/lib/routes.ts` | URL helpers (locale-aware) |
| `src/lib/content.ts` | Content queries + fallback |
| `src/components/LanguageSwitcher.astro` | Locale picker UI |
| `src/components/SeoHead.astro` | hreflang, canonical, og:locale |
| `astro.config.ts` | Astro i18n + sitemap config |