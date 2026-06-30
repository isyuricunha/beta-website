# Documentation Index

Welcome to the **yuri-cunha-website** documentation. This folder contains comprehensive guides for developing, authoring, translating, and deploying this multilingual Astro website.

---

## Guides

| Document | Description | Audience |
|----------|-------------|----------|
| [Getting Started](getting_started.md) | Quick setup, commands, project structure | All developers |
| [Architecture Overview](architecture.md) | Deep dive: i18n, content collections, routing, styling | Developers, architects |
| [Content Authoring](content_authoring.md) | Writing blog posts, snippets, projects; frontmatter schemas | Content authors |
| [i18n Architecture](i18n_architecture.md) | Dictionary system, routing, fallback, locale management | Developers |
| [Internationalization Guide](i18n.md) | Translation workflows, adding locales, quality checklist | Translators, developers |
| [Deployment](deployment.md) | Vercel setup, CI/CD, monitoring, troubleshooting | DevOps, developers |

---

## Quick Navigation

### New to the Project?
→ Start with **[Getting Started](getting_started.md)**

### Writing Content?
→ **[Content Authoring](content_authoring.md)** — schemas, templates, publishing checklist

### Translating?
→ **[Internationalization Guide](i18n.md)** — workflows, adding locales, glossary

### Understanding the Codebase?
→ **[Architecture Overview](architecture.md)** — i18n, routing, collections, components

### Deep Dive on i18n System?
→ **[i18n Architecture](i18n_architecture.md)** — dictionaries, fallback, SEO, LanguageSwitcher

### Deploying?
→ **[Deployment](deployment.md)** — Vercel, CI/CD, performance, rollback

---

## Project at a Glance

| Aspect | Detail |
|--------|--------|
| **Framework** | Astro 6.x (static output) |
| **Language** | TypeScript 6.x (strict) |
| **Styling** | Tailwind CSS 4.x (CSS-first) |
| **Content** | Astro Content Collections (MDX) |
| **i18n** | Custom TS dictionaries (6 locales) |
| **Locales** | `en`, `pt-br`, `ja`, `zh-cn`, `de`, `fr` |
| **Deployment** | Vercel (static) |
| **Package Manager** | pnpm 11.4.0 |
| **Node** | 24.x |

---

## Key Directories

```
src/
├── content/           # MDX content (blog, snippets, projects)
├── i18n/              # Translation dictionaries (6 locales)
├── components/        # Astro components
├── layouts/           # BaseLayout (HTML shell)
├── pages/             # File-based routing
├── lib/               # Utilities (routing, content, code-blocks)
└── styles/
    └── global.css     # Tailwind v4 + design tokens
```

---

## Common Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Dev server with HMR |
| `pnpm build` | Type-check + production build |
| `pnpm preview` | Preview `dist/` locally |
| `pnpm check` | TypeScript + content validation |
| `pnpm content:new:post` | Scaffold blog post (6 locales) |
| `pnpm content:new:snippet` | Scaffold snippet (6 locales) |
| `pnpm content:translate` | Auto-translate missing content |
| `pnpm content:check` | Validate content consistency |

---

## Contributing to Docs

Docs are in `/docs` as Markdown files. To update:

1. Edit relevant `.md` file
2. Keep tone consistent (concise, technical, actionable)
3. Update this index if adding new guides
4. Verify links work

---

## Related Resources

- **Astro Docs:** https://docs.astro.build
- **Tailwind CSS v4:** https://tailwindcss.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **Content Collections:** https://docs.astro.build/en/guides/content-collections/
- **i18n Routing:** https://docs.astro.build/en/guides/internationalization/

---

*Last updated: 2025*