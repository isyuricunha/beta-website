# Getting Started

## Prerequisites

- **Node.js 24.x** (see `.nvmrc`)
- **pnpm 11.4.0** (see `package.json#packageManager`)
- Git

## Quick Start

```bash
# Clone
git clone https://github.com/isyuricunha/beta-website.git
cd beta-website

# Install dependencies
pnpm install

# Start dev server
pnpm dev
# → http://localhost:4321
```

## Available Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Astro dev server with HMR |
| `pnpm build` | Type-check + production static build |
| `pnpm preview` | Serve `dist/` locally for verification |
| `pnpm check` | Run `astro check` + content validation |
| `pnpm lint` | Type-check only (`astro check`) |
| `pnpm test` | Run Playwright tests (not yet implemented) |

## Project Structure Overview

```
src/
├── content/              # MDX content (blog, snippets, projects)
├── i18n/                 # Translation dictionaries (6 locales)
├── components/           # Astro components (pages, UI, layout)
├── layouts/              # BaseLayout (HTML shell)
├── pages/                # File-based routing (i18n-aware)
├── lib/                  # Utilities (routing, content queries, etc.)
└── styles/
    └── global.css        # Tailwind v4 + design tokens
```

## First Build Verification

```bash
pnpm build
# Should complete with: "318 page(s) built in XX.XXs"
```

Output goes to `dist/` — ready for static hosting.

## Development Workflow

1. **Content changes** — Edit MDX in `src/content/`, auto-reload works
2. **UI copy changes** — Edit `src/i18n/locales/{locale}.ts`, hot-reload works
3. **Component changes** — Edit `.astro`/`.ts` files, HMR works
4. **Style changes** — Edit `global.css` or component `<style>`, HMR works

## Adding Content

### New Blog Post

```bash
pnpm content:new:post
# Prompts for slug, creates 6 locale files with frontmatter template
```

### New Snippet

```bash
pnpm content:new:snippet
# Prompts for slug + category, creates 6 locale files
```

### Manual Content Creation

Create `src/content/blog/my-post/en.mdx`:

```mdx
---
title: "My Post Title"
description: "Short description for SEO/social"
publishedDate: 2025-01-15
updatedDate: 2025-01-16  # optional
locale: en
tags: ["tag1", "tag2"]
draft: false
featured: false
includeInRss: true
showTableOfContents: true
---

Content here...
```

Then create translations in `pt-br.mdx`, `ja.mdx`, etc. with `locale` matching filename.

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `CONTENT_TRANSLATION_COMMAND` | CLI for auto-translation | No (for `content:translate`) |
| `CONTENT_TRANSLATION_ARGS` | JSON args array for above | No |

Create `.env` from `.env.example` if needed.

## IDE Setup (VS Code)

Recommended extensions:
- **Astro** (official)
- **Tailwind CSS IntelliSense**
- **TypeScript** (built-in)

Settings (`.vscode/settings.json`):
```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "astro.enableExperimentalContentIntellisense": true
}
```

## Common Issues

| Issue | Fix |
|-------|-----|
| `node: not found` | Run `nvm use` or use Node 24.x |
| `pnpm: command not found` | `corepack enable && corepack prepare pnpm@11.4.0 --activate` |
| Build fails on types | Run `pnpm check` to see full diagnostics |
| Content not showing | Check `draft: false`, `publishedDate` in past, locale matches filename |
| Translation fallback not working | Verify `getLocalizedListing()` logic in `src/lib/content.ts` |

## Next Steps

- Read [Architecture Overview](ARCHITECTURE.md) for deep dive
- Read [Content Authoring Guide](CONTENT_AUTHORING.md) for writing content
- Read [i18n Guide](I18N.md) for translation workflow
- Read [Deployment Guide](DEPLOYMENT.md) for production deploy