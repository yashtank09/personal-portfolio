# Angular 22 verification

Verified locally on Windows with Node 24.21.0, Angular 22.1.6, CLI/build/SSR 22.1.8, TypeScript 6.0.3, and Edge/Chrome.

- Clean npm ci installation succeeds; npm audit reports zero vulnerabilities.
- ESLint 10 and Angular template checks pass.
- Five Angular/Vitest test files, ten meaningful tests pass.
- Production prerender generates 13 routes (12 public content routes plus 404), followed by the sitemap, robots, and static 404 export.
- Initial browser bundle approximately 311 kB raw / 87 kB estimated compressed, with separately loaded feature chunks. No legacy UI frameworks, remote fonts, or icon libraries ship.
- 72 responsive checks: every public route at 320, 390, 768, 1024, 1440, and 1920px. No horizontal overflow.
- All 12 public routes contain meaningful content, heading, and canonical metadata with JavaScript disabled.
- axe WCAG 2 A/AA and 2.1 AA checks pass in light mode at 320/1440px and in dark mode across all public routes.
- 59 internal links and fragment targets checked; original PDF download path works.
- Menu open/close, Escape/focus recovery, lazy project navigation, page metadata transitions, persisted theme, OS theme changes, and reduced motion pass.
- No hydration exceptions, browser console errors, or third-party requests without analytics consent.
- JSON-LD parses and contains the consistent Person identity; project and page schema types are checked. Search-engine rich-result eligibility is separate from syntax validation.
- 404 response/status, noindex, sitemap contents, and robots verified.

## Local mobile Lighthouse

Performance **98**, Accessibility **100**, Best Practices **100**, SEO **100**, measured on the compressed production homepage. This was an ordinary Lighthouse mobile lab audit; no audit-specific app behavior or disabled application features were used.

These scores are not hosted measurements or guarantees of Google rankings. Recheck the HTTPS deployment and monitor actual field data after release.

## Evidence

Ignored local artifacts are in qa/: verification.json, lighthouse-mobile.json, desktop and mobile screenshots. Source-controlled verification scripts and Angular specs reproduce the checks.

## Launch inputs

Add actual project screenshots when available. The site has honest placeholders and conceptual diagrams. Blog content remains empty until genuine articles are authored. Review the existing PDF resume and editorial project descriptions before deployment. Configure the deployment target/DNS and perform the Search Console actions documented in README.
