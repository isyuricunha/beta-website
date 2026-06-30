# Architecture Overview

**yuri-cunha-website** — A multilingual Astro 6.x personal website with content collections, i18n routing, and code-first TypeScript dictionaries.

---

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Astro | 6.4.6 |
| Language | TypeScript | 6.0.3 |
| Styling | Tailwind CSS | 4.3.1 (Vite plugin) |
| Content | Astro Content Collections | Built-in |
| i18n | Custom (TypeScript dictionaries) | — |
| Syntax Highlighting | Shiki | Built-in (astro) |
| Deployment | Static (Vercel) | `vercel.json` |
| Package Manager | pnpm | 11.4.0 |
| Runtime | Node.js | 24.x |

---

## Project Structure

```
beta-website/
├── astro.config.ts                 # Astro config + i18n, fonts, markdown, Vite/Tailwind
├── src/
│   ├── content.config.ts           # Content collections: blog, snippets, projects
│   ├── content/                    # MDX content (per-locale)
│   │   ├── blog/                   # Blog posts (6 locales each)
│   │   ├── snippets/               # Code snippets / technical notes (6 locales)
│   │   └── projects/               # Project entries (6 locales)
│   ├── i18n/
│   │   ├── config.ts               # Locale list, metadata, helpers
│   │   ├── types.ts                # Dictionary type (strict, Discriminated Unions)
│   │   ├── index.ts                # Dictionary registry + getDictionary()
│   │   └── locales/                # 6 locale dictionaries (en, pt-br, ja, zh-cn, de, fr)
│   ├── lib/
│   │   ├── routes.ts               # Locale-aware path helpers
│   │   ├── content.ts              # Collection queries + fallback logic
│   │   ├── content-utils.ts        # ID parsing, reading time (CJK-aware)
│   │   ├── code-blocks.ts          # Shiki language labels
│   │   └── project-utils.ts        # Taxonomy helpers
│   ├── components/
│   │   ├── pages/                  # Page-level components (HomePage, BlogPostPage, etc.)
│   │   ├── LanguageSwitcher.astro  # Locale picker with fallback UI
│   │   ├── SiteHeader.astro        # Nav + locale switcher
│   │   ├── SiteFooter.astro
│   │   ├── Prose.astro             # Prose typography (h2–h6, code, tables)
│   │   ├── CodeBlockTools.astro    # Copy button + language label (client script)
│   │   ├── TableOfContents.astro
│   │   └── ... (SeoHead, Tag, LogoMark, etc.)
│   ├── layouts/
│   │   └── BaseLayout.astro        # HTML shell, fonts, SEO, header/footer
│   ├── pages/
│   │   ├── index.astro             # / (EN default)
│   │   ├── [locale]/index.astro    # /{locale}/ (5 non-default locales)
│   │   ├── [locale]/[section]/index.astro  # /{locale}/blog/, /snippets/, etc.
│   │   ├── blog/[slug].astro       # /blog/:slug (EN)
│   │   ├── [locale]/blog/[slug].astro      # /{locale}/blog/:slug
│   │   ├── snippets/[slug].astro   # /snippets/:slug (EN)
│   │   ├── [locale]/snippets/[slug].astro  # /{locale}/snippets/:slug
│   │   ├── projects/[slug].astro   # /projects/:slug (EN)
│   │   └── [locale]/projects/[slug].astro  # /{locale}/projects/:slug
│   └── styles/
│       └── global.css              # Tailwind v4 + CSS custom properties
├── scripts/
│   ├── translate-content.ts        # CLI: generate missing translations via adapter
│   ├── check-content.ts            # Validate content structure across locales
│   ├── migrate-legacy-content.ts   # One-time migration from legacy format
│   ├── new-post.ts                 # Scaffold new blog post
│   └── new-snippet.ts              # Scaffold new snippet
└── dist/                           # Static build output
```

---

## i18n Architecture

### Locale Configuration (`src/i18n/config.ts`)

```typescript
export const locales = ["en", "pt-br", "ja", "zh-cn", "de", "fr"] as const;
export const defaultLocale: Locale = "en";
```

- **EN is the canonical locale** — no prefix (`/blog/foo/`)
- **Non-default locales** prefixed: `/pt-br/blog/foo/`, `/ja/blog/foo/`
- `localeMetadata` maps to human labels + `languageTag` for `<html lang>`

### Dictionary System (`src/i18n/`)

| File | Purpose |
|------|---------|
| `types.ts` | `Dictionary` type with discriminated unions for pages, project statuses, navigation |
| `locales/*.ts` | One file per locale, satisfies `Dictionary` (compile-time checked) |
| `index.ts` | `getDictionary(locale)` — runtime lookup |

**Key type features:**
- `navigation: Record<Section, string>` — Section keys are typed (`blog | snippets | projects | about | contact`)
- `projectStatuses: Record<ProjectStatus, string>` — `active | maintained | paused | archived | completed | experimental`
- `common.minuteRead: (minutes: number) => string` — locale-aware pluralization function
- All strings typed, no `any`

### Routing (`src/lib/routes.ts`)

```typescript
getLocaleFromPathname(pathname)    // → Locale from URL
stripLocalePrefix(pathname)        // → path without locale prefix
getLocalizedPath(pathname, locale) // → localized URL for LanguageSwitcher
getSectionPath(locale, section)    // → /{locale}/blog/ etc.
```

Used by `LanguageSwitcher.astro`, `SiteHeader.astro`, and page components.

### Content Fallback Strategy (`src/lib/content.ts`)

```typescript
getLocalizedListing(collection, locale)
```

1. Group entries by `slug` (from `slug/locale` ID format)
2. For each slug: prefer `locale` entry, fallback to `en`
3. Return `{ entry, isFallback, entryLocale, slug }[]` sorted by date desc
4. Drafts hidden in production (`import.meta.env.PROD`)

### Content ID Format

Astro content entry IDs: `slug/locale` (e.g., `hello-world/pt-br`)

Parsed by `parseContentId()` in `content-utils.ts`.

---

## Content Collections (`src/content.config.ts`)

### Schema Summary

| Collection | Loader | Key Fields |
|------------|--------|------------|
| `blog` | `glob(pattern: **/*.{md,mdx})` | `title`, `description`, `publishedDate`, `updatedDate?`, `locale`, `tags[]`, `draft`, `featured`, `includeInRss`, `showTableOfContents`, `canonicalSourceLocale?`, `translation?` |
| `snippets` | `glob(...)` | Same as blog + `category`, `stack[]`, `level?` (beginner\|intermediate\|advanced) |
| `projects` | `glob(...)` | `name`, `description`, `locale`, `status` (enum), `category`, `tags[]`, `stack[]`, `homepageUrl?`, `repositoryUrl?`, `externalUrl?`, `featured`, `draft`, `startDate?`, `endDate?`, `canonicalSourceLocale?`, `translation?` |

### Translation Metadata

```typescript
translation: {
  sourceLocale: "en"      // default
  generatedAt?: Date      // ISO timestamp
  generator?: string      // e.g. "deepl-cli", "gpt-4o"
}
```

Enables tracking human vs. machine translations.

---

## Page Generation Strategy

### Static Routes (getStaticPaths)

| Route | Paths Generated |
|-------|-----------------|
| `/` | EN only (`index.astro`) |
| `/{locale}/` | 5 non-default locales |
| `/{locale}/{section}/` | 5 locales × 5 sections (blog, snippets, projects, about, contact) |
| `/blog/[slug]` | EN entries only |
| `/{locale}/blog/[slug]` | All published entries per locale (with fallback) |
| `/snippets/[slug]` | EN entries only |
| `/{locale}/snippets/[slug]` | All published per locale |
| `/projects/[slug]` | EN entries only |
| `/{locale}/projects/[slug]` | All published per locale |

> **Note:** Non-default locale pages use `getLocalizedListing()` → automatic EN fallback when translation missing.

---

## Styling System

### Tailwind CSS v4 (via `@tailwindcss/vite`)

- **No config file** — uses CSS-first config in `global.css`
- **Custom properties** for colors, spacing, radii, fonts
- **Dark-mode only** (`color-scheme: dark` on `<html>`)

### Fonts (Astro Assets + Fontsource)

| Variable | Font | Weights | Source |
|----------|------|---------|--------|
| `--font-inter` | Inter | 100–900 | Fontsource (local WOFF2) |
| `--font-jetbrains-mono` | JetBrains Mono | 100–800 variable | Fontsource (local WOFF2) |

Preloaded via `<Font cssVariable="--font-inter" preload />` in `BaseLayout.astro`.

### Prose Typography (`Prose.astro`)

Scoped `.prose` styles for MDX content:
- `h2`–`h6` with scroll-margin, custom sizes/colors
- `h4` — muted color, smaller
- `h5`/`h6` — JetBrains Mono, uppercase, letter-spaced
- Code blocks enhanced by `CodeBlockTools.astro` (client-side copy button)
- Tables, blockquotes, HR, lists styled

---

## Client-Side Interactivity

| Component | Purpose | Hydration |
|-----------|---------|-----------|
| `CodeBlockTools.astro` | Copy code button, language label | `<script>` + `astro:page-load` |
| `LanguageSwitcher.astro` | `<details>` dropdown (CSS-only) | None (pure HTML/CSS) |
| `TableOfContents.astro` | Client-side scroll spy | `<script>` (IntersectionObserver) |
| `ShimmerText.astro` | Animated gradient text | CSS animation |
| `ClientRouter` | View transitions (Astro) | Built-in |

---

## Scripts & Automation

| Command | Description |
|---------|-------------|
| `pnpm dev` | Astro dev server |
| `pnpm build` | `astro check && astro build` (type-check + static build) |
| `pnpm preview` | Preview `dist/` locally |
| `pnpm check` | Type-check + content validation |
| `pnpm lint` | `astro check` only |
| `pnpm content:new:post` | Scaffold blog post (all 6 locales) |
| `pnpm content:new:snippet` | Scaffold snippet (all 6 locales) |
| `pnpm content:translate` | Generate missing translations via adapter (requires `CONTENT_TRANSLATION_COMMAND`) |
| `pnpm content:check` | Validate content structure, frontmatter, cross-locale consistency |
| `pnpm migrate:legacy-content[:dry]` | One-time legacy → collections migration |

### Translation Adapter Interface (`scripts/translate-content.ts`)

Expects a CLI tool reading JSON from stdin, writing translated MDX to stdout:

```json
// stdin
{
  "collection": "blog",
  "slug": "hello-world",
  "sourceLocale": "en",
  "targetLocale": "pt-br",
  "sourcePath": "src/content/blog/hello-world/en.mdx",
  "sourceContent": "---\ntitle: Hello\n---\nBody..."
}
```

```mdx
// stdout (must have locale in frontmatter)
---
title: Olá
locale: pt-br
...
---
Corpo...
```

Set via env:
```bash
CONTENT_TRANSLATION_COMMAND="npx my-translator-cli"
CONTENT_TRANSLATION_ARGS='["--model", "gpt-4o"]'
pnpm content:translate
```

---

## Deployment

### Vercel (`vercel.json`)

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "framework": "astro",
  "installCommand": "pnpm install"
}
```

- Static output (`output: "static"` in astro.config.ts)
- `vercel.json` ensures correct build command
- No server-side rendering

### Build Validation

```bash
pnpm build  # runs astro check + astro build
```

Checks:
- TypeScript types (`astro check`)
- Content schema validation
- All pages generate without errors
- Static assets copied

---

## Conventions & Patterns

### Adding a New Locale

1. Add to `locales` array in `src/i18n/config.ts`
2. Add `localeMetadata` entry
3. Create `src/i18n/locales/{locale}.ts` satisfying `Dictionary`
4. Add to `dictionaries` in `src/i18n/index.ts`
5. Run `pnpm content:new:post` / `pnpm content:new:snippet` to scaffold content
6. Update `getLocaleStaticPaths()` if needed (auto-derived from `nonDefaultLocales`)

### Adding a Content Section

1. Add to `sections` in `src/i18n/types.ts`
2. Add navigation label to all 6 locale dictionaries
3. Add page dictionary section in `types.ts` + all locales
4. Create page component in `src/components/pages/`
5. Add routes in `src/pages/[locale]/[section]/index.astro`
6. Update `getSectionPath()` if custom routing needed

### Content Authoring

- Frontmatter validated by Zod schemas in `content.config.ts`
- `draft: true` hides from production builds
- `canonicalSourceLocale` + `translation` metadata for translated entries
- Reading time auto-calculated (CJK-aware in `estimateReadingMinutes()`)

---

## Performance Notes

- **Static generation** — all pages pre-rendered at build
- **Zero JS by default** — only interactive components hydrate
- **Fonts self-hosted** — WOFF2 via Fontsource, preloaded
- **CSS custom properties** — no runtime theme switching overhead
- **View Transitions** — `ClientRouter` for SPA-like navigation
- **Image optimization** — Astro Assets (if used in content)

---

## Key Files Quick Reference

| Task | File |
|------|------|
| Add locale | `src/i18n/config.ts`, `src/i18n/locales/*.ts`, `src/i18n/index.ts` |
| Edit UI copy | `src/i18n/locales/{locale}.ts` |
| Change navigation | `src/i18n/types.ts` (sections) + all locale files |
| Adjust prose styles | `src/components/Prose.astro` |
| Modify code block UI | `src/components/CodeBlockTools.astro` |
| Change routing | `src/lib/routes.ts` |
| Query content | `src/lib/content.ts` |
| Add collection field | `src/content.config.ts` + all locale content files |
| Scaffold content | `scripts/new-post.ts`, `scripts/new-snippet.ts` |