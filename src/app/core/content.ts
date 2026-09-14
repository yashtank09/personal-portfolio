import profile from './data/profile.json';
import projectData from './data/projects.json';
import pageData from './data/pages.json';
import articleData from './data/articles.json';
export interface Project {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  stack: string[];
  repo: string;
  challenge: string;
  problem: string;
  solution: string;
  architecture: string;
  pipeline: string[];
  features: string[];
  decisions: string[];
  considerations: string[];
  security: string;
  learned: string;
  screenshots?: { src: string; alt: string; width: number; height: number }[];
}
export interface ArticleSection {
  id: string;
  title: string;
  paragraphs: string[];
  code?: string;
  diagram?: string[];
}
export interface Article {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  sections: ArticleSection[];
}
export interface PageInfo {
  path: string;
  label: string;
  title: string;
  description: string;
  kind: string;
}
export const SITE = profile.site;
export const EXPERIENCE = profile.experience;
export const TOOLKIT = profile.toolkit;
export const TECHNOLOGIES = profile.technologies;
export const PROJECTS: readonly Project[] = projectData;
export const PAGES: readonly PageInfo[] = pageData;
export const ARTICLES: readonly Article[] = articleData;
export const EDUCATION = [
  {
    degree: 'Master of Computer Applications',
    institution: 'Gujarat Technological University',
    year: '2022',
  },
  {
    degree: 'Bachelor of Computer Applications',
    institution: 'SSS Dharmajivandasji Institute of IT',
    year: '2020',
  },
];
export const CERTIFICATES = [
  {
    name: 'Python for Everybody Specialization',
    issuer: 'University of Michigan · Coursera',
    id: '5ZHG2JG4V535',
  },
  {
    name: 'Django for Everybody Specialization',
    issuer: 'University of Michigan · Coursera',
    id: 'VT9DWX8CEP4Y',
  },
];
export function canonicalPath(path: string): string {
  const clean = path.split(/[?#]/)[0].replace(/^\/+|\/+$/g, '');
  return clean ? '/' + clean + '/' : '/';
}
export function readingTime(article: Article): number {
  return Math.max(
    1,
    Math.ceil(
      article.sections
        .map((s) => s.paragraphs.join(' '))
        .join(' ')
        .split(/\s+/).length / 200,
    ),
  );
}
