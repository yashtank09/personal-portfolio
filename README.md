# Personal Portfolio

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Production build and SEO prerendering

Run `npm run prerender` for the deployable production build. It generates static, crawler-readable HTML in `dist/browser` for the home, about, education, experience, projects, and contact routes.

The GitHub Pages workflows deploy `dist/browser`, not the Angular source tree. When adding a new public route, also add it to:

- the `prerender.options.routes` list in `angular.json`;
- `src/sitemap.xml`;
- the page metadata map in `src/app/services/seo.service.ts`.
