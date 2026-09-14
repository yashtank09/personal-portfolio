# Yash Tank — Angular 22 portfolio

A native Angular 22 professional portfolio for **yashtank.co.in**. Standalone components, Signals for UI preferences, zoneless change detection, lazy routes, official build-time prerendering, and client hydration. No React, Next.js, NgRx, UI framework, contact backend, or animation library.

## Run locally

Use **Node 24.21.0**, pinned in `.nvmrc`, or another officially compatible runtime: Node ^22.22.3, ^24.15.0, or >=26. Angular core is 22.1.6, CLI/build/SSR 22.1.8, TypeScript 6.0.3, RxJS 7.8.2.

```sh
npm ci
npm start
```

Development: http://localhost:4200.

On the current Windows workspace, an isolated compatible runtime is available without changing the system Node installation. In PowerShell, first run:

```powershell
. .\scripts\use-local-node.ps1
npm start
```

This optional helper depends on the ignored runtime in `tmp/angular-tools`. It is not needed on other machines with a supported Node version. The previously installed system Node 24.13.0 is too old for Angular 22.

## Build and verify

```sh
npm run lint
npm test
npm run build:prod
npm run preview
# In another terminal, using the same compatible Node runtime:
npm run verify
```

- Production output: `dist/personal-portfolio/browser/`.
- Production preview: http://localhost:4300.
- `npm run build`, `npm run build:prod`, and `npm run prerender` perform the same static build.
- `npm test` runs meaningful Angular/Vitest tests: route navigation, project rendering, canonical normalization, metadata transitions, schema, and theme preferences.
- `npm run verify` uses installed Microsoft Edge by default. On Linux/CI: install Playwright Chromium and set `BROWSER_CHANNEL=chromium`.
- Browser checks cover public routes without JavaScript, widths 320/390/768/1024/1440/1920, axe WCAG A/AA checks, mobile navigation, theme persistence/system preference, canonical metadata, JSON-LD, sitemap, robots, internal links, console errors, and 404.
- Screenshots and test reports are saved in ignored `qa/`.
- Preview serves real 404 responses, directory redirects, gzip, asset caching, and correct MIME types. It binds to localhost and is not a public production server.

## Architecture

```text
src/app/
  core/
    data/        # Typed JSON content: identity, projects, pages, published articles
    content.ts   # Models and shared pure helpers
    seo.ts       # Title, description, canonical, social metadata, JSON-LD
    theme.ts     # System / light / dark preference
    analytics.ts # Optional consent-controlled adapter
  shared/
    header/ footer/ page-header/ cta/
    project-card/ diagram/ screenshot/
    timeline/ toolkit/ education-list/ code-block/
  features/
    home/ about/ experience/ skills/
    projects/ project-detail/ resume/ education/
    contact/ blog/ article/ not-found/
  app.routes.ts
  app.config.ts
  app.config.server.ts
```

Each feature is lazy-loaded. UI styles are scoped to components; the global stylesheet contains only tokens, base styling, utilities, responsive containers, and motion/print rules. The application uses `inject()`, `signal()`, `computed()`, `effect()`, OnPush, and modern template control flow where useful. Browser-only work runs after rendering; public content and metadata render on the server during the static build.

## Public routes

- `/`
- `/about/`
- `/experience/`
- `/skills/`
- `/projects/`
- `/projects/trade-journal/`
- `/projects/sievex/`
- `/projects/instasend/` — preserved and explicitly exploratory
- `/resume/` — readable HTML plus PDF
- `/education/`
- `/contact/`
- `/blog/` — no invented publications
- `/404/` — prerendered, noindex; also exported to `404.html`

Future articles become `/blog/<slug>/` automatically. Unknown URLs render the recovery page. Existing no-trailing-slash URLs continue working; the canonical form uses trailing slashes.

## Editing content

- Identity, experience, technologies: `src/app/core/data/profile.json`.
- Projects, repository links, features, architecture, and considerations: `projects.json`.
- Page titles/descriptions: `pages.json`.
- Published articles: `articles.json`.
- Education and source-backed Coursera certificates: `core/content.ts`.
- Replace the existing PDF at `public/assets/resume/yash-tank-resume-september-2026.pdf` to preserve old download links. If you change the filename, also update the profile configuration and provide a redirect from the old URL.

### Project screenshots

No fabricated screenshots or metrics appear. Add actual product captures under `public/projects/`, then set a project's optional `screenshots` array:

```json
{
  "src": "/projects/trade-journal/dashboard.webp",
  "alt": "Trade Journal analytics view showing ...",
  "width": 1440,
  "height": 900
}
```

Use accurate alt text, real dimensions, and optimized WebP/AVIF where appropriate. The reusable screenshot component uses NgOptimizedImage and lazy loading. Conceptual pipeline diagrams are semantic HTML, explicitly labeled, and responsive.

The About monogram is deliberate; no generated or stock person is used. Original photo and certificate assets are preserved in the ignored Angular 16 archive rather than shipped unused.

### Publishing an article

The article collection is empty because no authored articles were supplied. Add only reviewed, genuinely published content:

```json
{
  "slug": "your-real-article-slug",
  "title": "Your reviewed article title",
  "description": "A concise description of the article.",
  "publishedAt": "YYYY-MM-DD",
  "sections": [
    {
      "id": "introduction",
      "title": "Introduction",
      "paragraphs": ["Your actual article content."],
      "code": "Optional Java code",
      "diagram": ["Optional first step", "Optional second step"]
    }
  ]
}
```

Use the actual publication date. Rebuild to generate the route, sitemap entry, Article schema, and social metadata. The article template supports a table of contents, safe interpolated code highlighting, diagrams, reading time, author, date, and related articles. Do not add the example unchanged. Content is rendered as text, not trusted raw HTML.

## Identity, SEO, and privacy

- Central Person entity: Yash Tank, Software Engineer; linked to the original GitHub and LinkedIn URLs.
- WebSite, ProfilePage, BreadcrumbList, SoftwareSourceCode, and Article (when articles exist) schemas.
- Unique titles/descriptions, canonical links, OpenGraph and Twitter large-image cards.
- `sitemap.xml` is generated from the same page/project/article data used by Angular. No invented modification dates.
- `robots.txt` allows public routes. Unknown pages use noindex.
- The social card is original typography-based artwork at `public/og-image.png`, not a fabricated product screenshot.
- Phone numbers are not rendered in website contact content. Review the existing PDF's contact details before public release.
- No frontend secrets, Mailgun integration, or simulated contact form. Email and verified profile links provide contact.
- The existing public GA measurement ID is retained in the analytics adapter, but analytics is off by default. Footer consent loads Google Analytics only if enabled; visitors can disable it. Do not put sensitive data in route paths or analytics events.
- Static source content is public by design. Never put credentials in environment files or public assets.

## Deployment

### GitHub Pages

The manual `Deploy Angular portfolio to Pages` workflow builds, tests, and publishes `dist/personal-portfolio/browser`. Enable Pages → GitHub Actions, configure `yashtank.co.in`, configure DNS for the appropriate Pages host, and enable HTTPS. `CNAME` and `.nojekyll` are included.

The former setup had two competing push-based deployment workflows, including a separate `yashtank09.github.io` repository. Automatic cross-repository publishing is replaced by validation; deployment is explicit. If the live domain must remain on that separate repository, transfer the generated browser output through its established release process or adapt the manual workflow to that target. Do not run two publishers against the same site.

### Other static hosting

Publish only `dist/personal-portfolio/browser/`. Do not publish the repository root, `tmp/`, or build internals. No server process or environment secret is required.

Configure:

- HTTPS and one canonical hostname (redirect www to the chosen apex).
- Directory index serving and redirects from extensionless non-slash paths to slash URLs.
- Serve `404.html` with status 404 for unknown URLs. Do not rewrite every unknown path to the homepage.
- Long immutable caching for hashed JS/CSS; revalidate HTML, sitemap, and robots.
- Compression and standard security headers.
- Preserve the existing PDF path or add a redirect if it changes.

No public deployment was performed by this implementation.

## Manual Google Search Console actions

1. Verify ownership of the domain property for yashtank.co.in (DNS verification, if not already done).
2. After deployment, submit `https://yashtank.co.in/sitemap.xml`.
3. Inspect the homepage, About, résumé, and two principal case studies; test live URLs and request indexing where appropriate.
4. Check Page indexing for canonical/redirect mistakes and investigate unexpected exclusions.
5. Check Core Web Vitals once field data accumulates. Local Lighthouse results are lab measurements, not a guarantee of search rankings.
6. Test representative structured data using Google's Rich Results Test or Schema Markup Validator. Valid Person/SoftwareSourceCode markup does not guarantee a rich result.

## Migration record

See [the original audit and decision](docs/MODERNIZATION.md). The previous Angular 16 source, original assets, lockfile, and configuration are preserved locally in ignored `tmp/angular16-before-modernization/`; the earlier Next.js attempt remains separately archived. Neither is part of the active app, Git changes, or deployment. The active source has no obsolete NgModules, legacy polyfills, unused UI libraries, commented-out contact implementation, or abandoned global CSS.

## Verification results

See [docs/VALIDATION.md](docs/VALIDATION.md) for the checked routes, accessibility coverage, bundle sizes, and Lighthouse scores. Regenerate the social card with `node scripts/generate-social-card.mjs` before rebuilding.
