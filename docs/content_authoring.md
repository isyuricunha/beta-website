# Content Authoring Guide

This guide covers writing, structuring, and managing content for all three collections: **Blog**, **Snippets**, and **Projects**.

---

## Content Structure

Each collection entry is a **folder** with one `.mdx` file per locale:

```
src/content/blog/my-post/
├── en.mdx          # Required (canonical)
├── pt-br.mdx       # Optional
├── ja.mdx          # Optional
├── zh-cn.mdx       # Optional
├── de.mdx          # Optional
└── fr.mdx          # Optional
```

**File naming:** `{locale}.mdx` — locale must match folder name in `src/i18n/config.ts`

---

## Frontmatter Reference

### Blog Posts (`blog`)

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `title` | string | ✅ | — | Post title (used in `<title>`, OG, listings) |
| `description` | string | ✅ | — | SEO meta description, social preview |
| `publishedDate` | ISO date | ✅ | — | Publication date (sorting, RSS, sitemap) |
| `updatedDate` | ISO date | ❌ | — | Last modification date (shown in UI) |
| `locale` | `en\|pt-br\|ja\|zh-cn\|de\|fr` | ✅ | — | Must match filename |
| `tags` | string[] | ❌ | `[]` | Topic tags (displayed, filterable) |
| `draft` | boolean | ❌ | `false` | `true` = hidden in production |
| `featured` | boolean | ❌ | `false` | Highlighted on home page |
| `includeInRss` | boolean | ❌ | `true` | Include in `/rss.xml` |
| `showTableOfContents` | boolean | ❌ | `false` | Show ToC component |
| `canonicalSourceLocale` | locale | ❌ | — | If translated, source locale |
| `translation` | object | ❌ | — | Translation metadata |

**Translation metadata:**
```yaml
translation:
  sourceLocale: "en"
  generatedAt: "2025-01-15T10:30:00Z"
  generator: "deepl-cli"  # or "gpt-4o", "human", etc.
```

### Snippets (`snippets`)

*Inherits all blog fields, plus:*

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `category` | string | ✅ | — | Grouping (e.g. "bash", "docker", "vscode") |
| `stack` | string[] | ❌ | `[]` | Tech tags (e.g. `["bash", "linux"]`) |
| `level` | enum | ❌ | — | `beginner \| intermediate \| advanced` |

### Projects (`projects`)

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `name` | string | ✅ | — | Project name |
| `description` | string | ✅ | — | Short description |
| `locale` | locale | ✅ | — | Must match filename |
| `status` | enum | ✅ | — | `active \| maintained \| paused \| archived \| completed \| experimental` |
| `category` | string | ✅ | — | Grouping (e.g. "translation", "tool", "infrastructure") |
| `tags` | string[] | ❌ | `[]` | Additional tags |
| `stack` | string[] | ❌ | `[]` | Tech stack |
| `homepageUrl` | URL | ❌ | — | Project website |
| `repositoryUrl` | URL | ❌ | — | Source code (GitHub, etc.) |
| `externalUrl` | URL | ❌ | — | Other relevant link |
| `featured` | boolean | ❌ | `false` | Highlight on projects page |
| `draft` | boolean | ❌ | `false` | Hidden in production |
| `startDate` | ISO date | ❌ | — | Project start |
| `endDate` | ISO date | ❌ | — | Project end (if archived/completed) |
| `canonicalSourceLocale` | locale | ❌ | — | If translated |
| `translation` | object | ❌ | — | Translation metadata |

---

## Writing Content

### MDX Features

All `.mdx` files support:

- **Standard Markdown** — headings, lists, links, images, tables, blockquotes
- **Code blocks** with syntax highlighting (Shiki, `github-dark-default` theme)
- **Components** — import and use Astro components inline
- **Frontmatter variables** — `{frontmatter.title}` etc.
- **HTML** — raw HTML when needed

### Code Blocks

```markdown
```bash
# Comment
command --flag value
```

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

```diff
- old line
+ new line
```
```

**Features:**
- Language detection → copy button with label
- Line highlighting: ` ```ts {2,4-5} `
- Filename: ` ```ts:filename.ts `
- Copy button uses `dict.common.copyCode` / `dict.common.copied`

### Headings

**Important:** Do **not** include a top-level `# H1` in content body.

- Page title rendered by layout from `frontmatter.title`
- Use `## H2` for major sections
- Use `### H3` for subsections
- `#### H4`, `##### H5`, `###### H6` supported (styled in `Prose.astro`)

### Images

```markdown
![Alt text](/path/to/image.png)
![Alt text](https://example.com/image.png)
```

- Local images: place in `public/` → reference as `/image.png`
- Remote images: allowed but not optimized at build

### Tables

```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

Styled via `Prose.astro` (responsive, bordered).

### Blockquotes

```markdown
> This is a quote.
> Can span multiple lines.
```

### Callouts / Admonitions (Custom)

Not built-in — use blockquote + custom class or component:

```markdown
> **Note:** This is important.
{.callout .callout-note}
```

Or create a component: `src/components/Callout.astro`

---

## Scaffolding New Content

### Blog Post

```bash
pnpm content:new:post
```

Prompts for slug (e.g. `my-new-post`), creates 6 locale files:

```mdx
---
title: ""
description: ""
publishedDate: 2025-01-15
updatedDate: 2025-01-15
locale: en
tags: []
draft: true
featured: false
includeInRss: true
showTableOfContents: false
---

## Introduction

Content here...
```

### Snippet

```bash
pnpm content:new:snippet
```

Prompts for slug + category, creates 6 locale files:

```mdx
---
title: ""
description: ""
publishedDate: 2025-01-15
updatedDate: 2025-01-15
locale: en
tags: []
draft: true
featured: false
category: "bash"
stack: []
level: "beginner"
---

## Overview

Brief description.

## Code

```bash
command --flag
```

## Explanation

Details...
```

---

## Translation Workflow

### Manual Translation

1. Copy `en.mdx` → `{locale}.mdx`
2. Update `locale:` in frontmatter
3. Translate `title`, `description`, body content
4. Keep `publishedDate` same (or adjust if re-publishing)
5. Set `canonicalSourceLocale: "en"` and `translation.generator: "human"`

### Automated Translation

Requires external CLI tool. Configure:

```bash
export CONTENT_TRANSLATION_COMMAND="npx my-translator-cli"
export CONTENT_TRANSLATION_ARGS='["--model", "gpt-4o"]'
pnpm content:translate
```

**Adapter interface (stdin → stdout):**

```json
// Input (stdin)
{
  "collection": "blog",
  "slug": "my-post",
  "sourceLocale": "en",
  "targetLocale": "pt-br",
  "sourcePath": "src/content/blog/my-post/en.mdx",
  "sourceContent": "---\ntitle: Hello\n---\nBody..."
}
```

```mdx
// Output (stdout) — must include locale in frontmatter
---
title: Olá
locale: pt-br
...
---
Corpo...
```

### Translation Metadata

Always set for translated entries:

```yaml
canonicalSourceLocale: "en"
translation:
  sourceLocale: "en"
  generatedAt: "2025-01-15T14:30:00Z"
  generator: "deepl-cli"
```

Enables:
- "Available in English" badge (`dict.common.availableInEnglish`)
- Attribution in UI
- Filtering human vs. machine translations

---

## Content Validation

### Schema Validation (Build-Time)

Zod schemas in `src/content.config.ts` validate:
- Required fields present
- Types correct (dates, URLs, enums)
- Locale matches filename
- Enum values valid

Run:
```bash
pnpm build  # includes validation
pnpm check  # validation only
```

### Content Consistency Check

```bash
pnpm content:check
```

Checks:
- All published EN entries have at least one translation
- Frontmatter consistency across locales
- No duplicate slugs
- Draft entries not linked

### Reading Time

Auto-calculated from body (excludes frontmatter, code blocks, HTML tags):

- **Latin scripts:** ~220 words/min
- **Japanese/Chinese:** ~400 chars/min

```typescript
estimateReadingMinutes(body, locale)  // in content-utils.ts
```

Displayed via `dict.common.minuteRead(minutes)`.

---

## Publishing Checklist

Before setting `draft: false`:

- [ ] `title` — clear, descriptive, < 60 chars for SEO
- [ ] `description` — 150-160 chars, includes keywords
- [ ] `publishedDate` — today or past date
- [ ] `tags` — 3-5 relevant, consistent with existing
- [ ] `category` (snippets) — matches existing or new with intent
- [ ] `status` (projects) — accurate
- [ ] Code blocks tested, copyable
- [ ] Links valid (internal + external)
- [ ] Images optimized (WebP, < 200KB)
- [ ] Table of Contents enabled if > 3 H2 sections
- [ ] Translations complete (or `canonicalSourceLocale` set)

---

## Content Organization Tips

### Blog

- Use `tags` for cross-cutting topics ("privacy", "automation", "self-hosting")
- `featured: true` for cornerstone posts (max 3-5)
- `showTableOfContents: true` for long posts (> 5 min read)
- Series: use consistent tag + "Part N" in title

### Snippets

- `category` = primary grouping (bash, docker, vscode, git, etc.)
- `stack` = specific technologies
- `level` = helps readers filter
- Keep focused: one task, one snippet

### Projects

- `status` — be honest (experimental, paused, archived)
- `category` — portfolio grouping
- `stack` — technologies used
- URLs — prefer `repositoryUrl` + `homepageUrl`

---

## Common Patterns

### Series Post

```yaml
tags: ["series:my-series", "topic1", "topic2"]
```

### Translated Post

```yaml
canonicalSourceLocale: "en"
translation:
  sourceLocale: "en"
  generatedAt: "2025-01-15T14:30:00Z"
  generator: "human"
```

### Updated Post

```yaml
publishedDate: "2024-06-01"
updatedDate: "2025-01-15"  # Triggers "Updated" badge
```

### Draft (Work in Progress)

```yaml
draft: true
publishedDate: "2025-01-15"  # Still required
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Invalid locale" error | Filename locale ≠ frontmatter locale — match them |
| Post not appearing | `draft: true` in production, or `publishedDate` in future |
| Wrong reading time | Check `estimateReadingMinutes` logic for CJK |
| Translation not showing | Missing `canonicalSourceLocale` or `availableLocales` not passed |
| Build fails on types | Run `pnpm check` for full TypeScript errors |
| Code block not highlighted | Language tag must match Shiki grammar (e.g. `bash`, not `sh`) |

---

## Quick Reference

### Blog Frontmatter Template

```yaml
---
title: ""
description: ""
publishedDate: 2025-01-15
updatedDate: 2025-01-15
locale: en
tags: []
draft: true
featured: false
includeInRss: true
showTableOfContents: false
canonicalSourceLocale: en
translation:
  sourceLocale: en
  generatedAt: 2025-01-15T00:00:00Z
  generator: human
---
```

### Snippet Frontmatter Template

```yaml
---
title: ""
description: ""
publishedDate: 2025-01-15
updatedDate: 2025-01-15
locale: en
tags: []
draft: true
featured: false
category: ""
stack: []
level: "beginner"
canonicalSourceLocale: en
translation:
  sourceLocale: en
  generatedAt: 2025-01-15T00:00:00Z
  generator: human
---
```

### Project Frontmatter Template

```yaml
---
name: ""
description: ""
locale: en
status: "experimental"
category: ""
tags: []
stack: []
homepageUrl: ""
repositoryUrl: ""
externalUrl: ""
featured: false
draft: true
startDate: 2025-01-15
endDate: ""
canonicalSourceLocale: en
translation:
  sourceLocale: en
  generatedAt: 2025-01-15T00:00:00Z
  generator: human
---
```