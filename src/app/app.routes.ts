import { Routes } from '@angular/router';
import { PROJECTS, ARTICLES } from './core/content';
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  { path: 'about', loadComponent: () => import('./features/about/about').then((m) => m.About) },
  {
    path: 'experience',
    loadComponent: () => import('./features/experience/experience').then((m) => m.Experience),
  },
  { path: 'skills', loadComponent: () => import('./features/skills/skills').then((m) => m.Skills) },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects').then((m) => m.Projects),
  },
  ...PROJECTS.map((project) => ({
    path: 'projects/' + project.slug,
    data: { project },
    loadComponent: () =>
      import('./features/project-detail/project-detail').then((m) => m.ProjectDetail),
  })),
  { path: 'resume', loadComponent: () => import('./features/resume/resume').then((m) => m.Resume) },
  {
    path: 'education',
    loadComponent: () => import('./features/education/education').then((m) => m.Education),
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact').then((m) => m.Contact),
  },
  { path: 'blog', loadComponent: () => import('./features/blog/blog').then((m) => m.Blog) },
  ...ARTICLES.map((article) => ({
    path: 'blog/' + article.slug,
    data: { article },
    loadComponent: () => import('./features/article/article').then((m) => m.ArticlePage),
  })),
  {
    path: '404',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
  },
];
