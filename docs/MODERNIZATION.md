# Angular 22 modernization audit and plan

## Repository findings (before implementation)

- Angular 16.2, NgModules, eager routing, Angular Universal with nine prerendered routes. Existing source includes Home, About, Education, Experience, Projects, Contact, and three permanent case-study URLs.
- Shared title/navigation/footer modules and mutable content services add indirection for static information. Scaffold tests coexist with legacy components and commented-out contact code.
- Bootstrap, PrimeNG, PrimeIcons, Bootstrap Icons, Font Awesome (two deliveries), Devicon and remote fonts overlap. Existing production emits skipped Bootstrap selector warnings. Global and feature CSS overlap, with old design-token aliases and recurring animations.
- Useful SEO exists (canonical URLs, metadata, Person/WebSite); sitemap and route metadata are manually duplicated. No HTML resume, skills route, or blog architecture.
- Source-backed content: DataCrops and Epitome history; two degrees; Python/Django Coursera certificates; Trade Journal, Sievex, and exploratory InstaSend. Keep original URLs and PDF path.
- Contact code mixes Formspree with an unused Mailgun API-key client. Remove credential-bearing browser integration; retain reliable email/profile links. No message will be sent as a test.
- Existing Google Analytics ID is G-CEHSKKC17B. Preserve it in public configuration behind an optional, consent-controlled adapter; never load tracking by default.
- Several large/duplicate certificate and illustration assets are unused. Original material will be kept in an ignored local archive; only intentional assets enter the new build.

## Decision

Create a fresh standalone Angular 22 architecture in the same repository and migrate the content carefully. This is a clean architecture rebuild, not an in-place major-version upgrade. Do not use any React or Next.js code/runtime. Preserve the current Angular source in tmp/angular16-before-modernization before replacing the active tree.

## Implementation sequence

1. Verify registry releases and official compatibility; use Angular core 22.1.6, CLI/build/SSR 22.1.8, TypeScript 6.0.3, RxJS 7.8.x, and Node 24.21.0.
2. Establish standalone, zoneless application; core/shared/features organization; lazy routes; official static prerender with hydration.
3. Migrate typed professional content and real assets; create scoped CSS components with shared design tokens.
4. Build Home/About/Experience/Skills/Projects/case studies/Resume/Contact/Education/Blog/404, preserving InstaSend's exploratory status and existing links.
5. Centralize route manifest, SEO, JSON-LD, and build-generated sitemap/robots. No invented publications; an empty typed article collection drives future article URLs.
6. Test production HTML, hydrated navigation, page metadata, components, themes, 404, internal links, image loading, axe accessibility, responsive widths, and Lighthouse.
7. Update CI/deployment documentation and remove obsolete code from the active application. Keep private configuration out of public assets.

Official references: https://angular.dev/reference/versions and https://angular.dev/guide/ssr.

## Completed implementation

The clean rebuild now uses Angular core 22.1.6 with CLI/build/SSR 22.1.8, TypeScript 6.0.3, RxJS 7.8.2, and the pinned Node 24.21.0 runtime. All content routes are lazily loaded and prerendered, with hydration and zoneless change detection.

UI changes: restrained green/neutral light and dark themes; system typography; compact sticky navigation; mobile disclosure menu; architecture-led project cards; readable case studies; reusable timeline/toolkit; HTML resume; empty writing section; email-first contact; accessible 404 recovery. Original portfolio identity, jobs, reported impact, education, certificates, project URLs, and resume download path remain source-backed.

SEO changes: one content manifest drives route information and generated discovery files; centralized canonical/social tags and Person/WebSite/ProfilePage/SoftwareSourceCode/BreadcrumbList schemas; Article support activates only with real article content. All 12 public routes have meaningful HTML without JavaScript.

Dependencies removed: Angular 16 platform-browser-dynamic and animations, Angular Universal builders/Express engine, Express, Zone.js, Bootstrap, Bootstrap Icons, PrimeNG, PrimeIcons, Jasmine/Karma, and old build tooling. External Font Awesome/Devicon/font requests are removed.

Dependencies added/replaced: Angular 22 core/router/platform packages, official @angular/build and @angular/ssr, TypeScript 6, Angular ESLint with ESLint 10, Vitest/jsdom, Playwright/axe, Lighthouse, Prettier, and development-only Sharp for social-card generation. No UI or state-management library was added.

The previous Angular source and unused original assets are removed from the active tree and retained only in an ignored local archive. No temporary migration code is part of the app. See README for deployment and Search Console actions; see VALIDATION.md for measured checks.
