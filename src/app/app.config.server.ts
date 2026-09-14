import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes, RenderMode, ServerRoute } from '@angular/ssr';
import { config } from './app.config';
import { PAGES, PROJECTS, ARTICLES } from './core/content';
const serverRoutes: ServerRoute[] = [
  ...PAGES.map((p): ServerRoute => ({ path: p.path, renderMode: RenderMode.Prerender })),
  ...PROJECTS.map((p): ServerRoute => ({
    path: 'projects/' + p.slug,
    renderMode: RenderMode.Prerender,
  })),
  ...ARTICLES.map((a): ServerRoute => ({
    path: 'blog/' + a.slug,
    renderMode: RenderMode.Prerender,
  })),
  { path: '404', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
const server: ApplicationConfig = { providers: [provideServerRendering(withRoutes(serverRoutes))] };
export const serverConfig = mergeApplicationConfig(config, server);
