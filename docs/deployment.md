# Deployment Guide

## Overview

| Environment | URL | Branch | Auto-Deploy |
|-------------|-----|--------|-------------|
| Production | https://yuricunha.com | `main` | ✅ Yes |
| Preview | https://*.vercel.app | PRs | ✅ Yes |
| Local | http://localhost:4321 | — | Manual |

**Platform:** Vercel (Static)
**Build Command:** `pnpm build`
**Output Directory:** `dist/`
**Node Version:** 24.x

---

## Vercel Configuration

### `vercel.json`

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "framework": "astro",
  "installCommand": "pnpm install",
  "devCommand": "pnpm dev",
  "git": {
    "deploymentEnabled": {
      "main": true,
      "develop": false
    }
  }
}
```

### Project Settings (Vercel Dashboard)

| Setting | Value |
|---------|-------|
| Framework Preset | Astro |
| Build Command | `pnpm build` |
| Output Directory | `dist` |
| Install Command | `pnpm install` |
| Node.js Version | 24.x |
| Environment Variables | See below |

---

## Environment Variables

### Production (Vercel Dashboard → Settings → Environment Variables)

| Variable | Value | Description |
|----------|-------|-------------|
| `NODE_VERSION` | `24` | Pinned Node version |
| `PNPM_VERSION` | `11.4.0` | Pinned pnpm version |

### Optional: Translation Adapter

| Variable | Value | Description |
|----------|-------|-------------|
| `CONTENT_TRANSLATION_COMMAND` | `npx my-translator-cli` | CLI for auto-translation |
| `CONTENT_TRANSLATION_ARGS` | `["--model", "gpt-4o"]` | JSON array of args |

> Only needed if using `pnpm content:translate` in CI.

---

## Build Process

### Local Build Verification

```bash
# Clean install
pnpm install --frozen-lockfile

# Type-check + build
pnpm build

# Verify output
ls dist/
# Should contain: index.html, blog/, snippets/, projects/, _astro/, etc.
```

### Build Steps (Automated on Vercel)

1. **Install** — `pnpm install --frozen-lockfile`
2. **Type-check** — `astro check` (TypeScript + Astro diagnostics)
3. **Content sync** — Astro content collections loaded
4. **Static generation** — All pages pre-rendered
5. **Asset optimization** — Fonts, CSS, JS minified
6. **Sitemap generation** — `sitemap-index.xml` + locale variants
7. **Output** — `dist/` folder uploaded to Vercel CDN

### Build Time

| Metric | Typical |
|--------|---------|
| Install | ~30s |
| Type-check | ~10s |
| Build | ~20-30s |
| Total | ~1-2 min |

---

## Deployment Workflow

### Production Deploy

```bash
# 1. Ensure main is up to date
git checkout main
git pull origin main

# 2. Verify locally
pnpm build

# 3. Push (triggers Vercel deploy)
git push origin main
```

### Preview Deploy (PR)

1. Open PR against `main`
2. Vercel creates preview deployment
3. URL posted as PR comment
4. Review, then merge

### Rollback

**Vercel Dashboard → Deployments → Click "..." → Promote to Production**

Or:
```bash
vercel rollback [deployment-url]
```

---

## Domain Configuration

### Primary Domain: `yuricunha.com`

**Vercel Dashboard → Settings → Domains**

| Domain | Type | Redirect |
|--------|------|----------|
| `yuricunha.com` | Primary | — |
| `www.yuricunha.com` | Alias | → `yuricunha.com` |

### DNS (Managed at Registrar)

| Record | Value |
|--------|-------|
| A | `76.76.21.21` (Vercel) |
| CNAME `www` | `cname.vercel-dns.com` |

### SSL

- Automatic via Vercel (Let's Encrypt)
- HSTS enabled via `vercel.json` headers (if configured)

---

## Performance

### Static Output Benefits

- **Zero server execution** — HTML served from CDN edge
- **Instant TTFB** — No SSR, no cold starts
- **Global cache** — Vercel Edge Network (35+ regions)
- **Brotli/Gzip** — Automatic compression

### Cache Headers (Vercel Default)

| Asset | Cache-Control |
|-------|---------------|
| HTML | `public, max-age=0, must-revalidate` |
| JS/CSS | `public, max-age=31536000, immutable` |
| Fonts | `public, max-age=31536000, immutable` |
| Images | `public, max-age=31536000, immutable` |

### Core Web Vitals Targets

| Metric | Target | Achieved |
|--------|--------|----------|
| LCP | < 2.5s | ✅ ~0.8s |
| FID | < 100ms | ✅ ~10ms |
| CLS | < 0.1 | ✅ ~0 |
| TTFB | < 200ms | ✅ ~50ms |

---

## Monitoring & Observability

### Vercel Analytics (Optional)

```bash
# Enable in Vercel Dashboard → Analytics
# Or add to package.json:
# "@vercel/analytics": "^1.x"
```

### Speed Insights

- Vercel Dashboard → Speed Insights
- Real-user metrics (CrUX)

### Logs

- Vercel Dashboard → Functions → Logs (for any edge functions)
- Build logs in deployment details

---

## CI/CD Integration (Optional)

### GitHub Actions Example

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 11.4.0
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm check
      - run: pnpm build
```

### Required Secrets (if using GitHub Actions for deploy)

| Secret | Value |
|--------|-------|
| `VERCEL_TOKEN` | From Vercel account settings |
| `VERCEL_ORG_ID` | Vercel org ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |

---

## Troubleshooting

### Build Fails

| Error | Cause | Fix |
|-------|-------|-----|
| `node: not found` | Wrong Node version | Set `NODE_VERSION=24` in Vercel |
| `pnpm: command not found` | pnpm not installed | Set `PNPM_VERSION=11.4.0` |
| `astro check` errors | TypeScript errors | Run `pnpm check` locally first |
| Content validation fails | Invalid frontmatter | Run `pnpm content:check` |
| Out of memory | Large build | Add `NODE_OPTIONS=--max-old-space-size=4096` |

### Deploy Fails

| Issue | Fix |
|-------|-----|
| 404 on locale pages | Check `astro.config.ts` i18n config matches locales |
| Missing hreflang | Verify sitemap i18n config |
| Fonts not loading | Check `public/` fonts + `astro.config.ts` font config |
| CSS broken | Verify `global.css` + Tailwind v4 syntax |

### Runtime Issues

| Issue | Fix |
|-------|-----|
| Language switcher wrong URL | Check `getLocalizedPath()` in `routes.ts` |
| Content not translated | Check `getLocalizedListing()` fallback logic |
| `availableInEnglish` showing | Expected when `isFallback: true` |

---

## Security Headers

Configure in `vercel.json` (optional):

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

> Note: Astro static output + Vercel already provides good defaults.

---

## Cost Estimation

| Tier | Monthly Cost | Includes |
|------|--------------|----------|
| Hobby | Free | 100GB bandwidth, unlimited personal projects |
| Pro | $20/mo | 1TB bandwidth, team, analytics, password protection |
| Enterprise | Custom | SLA, dedicated support, advanced security |

**Current usage:** Well within Hobby tier (static site, low traffic).

---

## Checklist: Pre-Deploy

- [ ] `pnpm build` passes locally
- [ ] `pnpm check` passes (0 errors)
- [ ] `pnpm content:check` passes
- [ ] All locales have content (or accepted fallback)
- [ ] No `console.error` in build output
- [ ] Preview deployment tested
- [ ] Domain DNS correct
- [ ] SSL active

---

## Rollback Procedure

1. **Vercel Dashboard** → Deployments
2. Find last working deployment
3. Click `...` → **Promote to Production**
4. Verify at `yuricunha.com`
5. If needed: `git revert` bad commit + push

---

## Migration Notes

### From Netlify/Other

1. Update `vercel.json` build settings
2. Point domain to Vercel nameservers
3. Remove old platform config
4. Test preview deploy

### From SSR to Static

This project uses `output: "static"` — no server needed. If migrating from SSR:

1. Remove `getServerSideProps` / `getStaticProps` equivalents
2. Move dynamic logic to client or build-time
3. Verify all pages generate at build

---

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Astro Deploy:** https://docs.astro.build/en/guides/deploy/
- **Issues:** GitHub Issues on this repo