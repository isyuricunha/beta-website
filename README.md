# Yuri Cunha Personal Website

A static personal archive built with Astro, TypeScript, MDX, Astro Content
Collections, Astro i18n routing, Tailwind CSS, Shiki, RSS, and Sitemap.

The site is intentionally small. It has no React runtime, database, CMS,
authentication, server functions, or visitor-side translation.

## Requirements

- Node.js 24
- pnpm 11

## Development

```bash
pnpm install
pnpm dev
```

Run the full local validation:

```bash
pnpm check
pnpm test
pnpm build
```

## Content

English is the source locale. Translations are ordinary MDX files stored beside
the source:

```txt
src/content/blog/example/en.mdx
src/content/blog/example/pt-br.mdx
src/content/blog/example/ja.mdx
```

Create source files with:

```bash
pnpm content:new:post my-post
pnpm content:new:snippet useful-command
```

Validate frontmatter, locale filenames, translation links, dates, and missing
translations:

```bash
pnpm content:check
STRICT_I18N=true pnpm content:check
```

Non-strict validation reports missing translations and exits successfully.
Strict validation fails when a published English entry is missing any of
`pt-br`, `ja`, `zh-cn`, `de`, or `fr`.

## Translation Adapter

`pnpm content:translate` reports missing translations when no adapter is
configured. To generate files, configure an external local command:

```bash
CONTENT_TRANSLATION_COMMAND=/path/to/translator \
CONTENT_TRANSLATION_ARGS='["--format","mdx"]' \
pnpm content:translate
```

The command receives one JSON object on stdin:

```json
{
  "collection": "blog",
  "slug": "example",
  "sourceLocale": "en",
  "targetLocale": "ja",
  "sourcePath": "/absolute/path/en.mdx",
  "sourceContent": "---\n..."
}
```

It must write a complete MDX document to stdout. Existing translations are
never overwritten.

## Deployment

Vercel detects Astro automatically and deploys the static `dist` output without
an adapter or serverless functions.

- Framework preset: Astro
- Install command: `pnpm install`
- Build command: `pnpm build`
- Output directory: `dist`
- Node.js: `24.x`

The canonical production URL is https://breaking.yuricunha.com/.

## Structure

```txt
src/components/       Astro UI and content components
src/content/          Grouped MDX source and translations
src/i18n/             Locale metadata and typed UI dictionaries
src/layouts/          Shared document layout
src/lib/              Content and route helpers
src/pages/            Static and generated routes
scripts/              Content authoring and validation tools
tests/                Node test runner suites
```

Implementation follows the official
[Astro documentation](https://docs.astro.build/),
[Tailwind Astro guide](https://tailwindcss.com/docs/installation/framework-guides/astro),
and [Vercel Astro documentation](https://vercel.com/docs/frameworks/frontend/astro).
