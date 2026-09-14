import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SITE, PAGES, PROJECTS, ARTICLES, EDUCATION, TECHNOLOGIES, canonicalPath } from './content';
import { AnalyticsService } from './analytics';
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly destroy = inject(DestroyRef);
  private readonly analytics = inject(AnalyticsService);
  initialize() {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroy),
      )
      .subscribe((e) => {
        this.apply(e.urlAfterRedirects);
        this.analytics.page(e.urlAfterRedirects);
      });
  }
  apply(raw: string) {
    const path = canonicalPath(raw),
      slug = path.split('/')[2];
    const page = PAGES.find((p) => canonicalPath(p.path) === path);
    const project = path.startsWith('/projects/')
      ? PROJECTS.find((p) => p.slug === slug)
      : undefined;
    const article = path.startsWith('/blog/') ? ARTICLES.find((a) => a.slug === slug) : undefined;
    const found = !!page || !!project || !!article;
    const title =
      page?.title ??
      (project
        ? project.name +
          ' — ' +
          (project.slug === 'trade-journal'
            ? 'Trading Analytics Platform'
            : 'Automation & Engineering') +
          ' | Yash Tank'
        : article
          ? article.title + ' | Yash Tank'
          : 'Page Not Found | Yash Tank');
    const description =
      page?.description ??
      project?.description ??
      article?.description ??
      'This page could not be found. Explore Yash Tank’s projects, experience, or contact information.';
    const canonical = SITE.url + (found ? path : '/404/');
    this.title.setTitle(title);
    const tags: Record<string, string> = {
      description,
      robots: found ? 'index, follow, max-image-preview:large' : 'noindex, follow',
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': SITE.url + '/og-image.png',
    };
    Object.entries(tags).forEach(([name, content]) => this.meta.updateTag({ name, content }));
    Object.entries({
      'og:title': title,
      'og:description': description,
      'og:url': canonical,
      'og:type': article ? 'article' : 'website',
      'og:site_name': SITE.name,
      'og:image': SITE.url + '/og-image.png',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt':
        'Yash Tank — Software Engineer. Java, Spring Boot, Angular, automation and AI.',
    }).forEach(([property, content]) => this.meta.updateTag({ property, content }));
    this.meta.removeTag('property="article:published_time"');
    if (article)
      this.meta.updateTag({ property: 'article:published_time', content: article.publishedAt });
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = canonical;
    const personId = SITE.url + '/#person';
    const graph: unknown[] = [
      {
        '@type': 'Person',
        '@id': personId,
        name: SITE.name,
        url: SITE.url + '/',
        jobTitle: 'Software Engineer',
        description: SITE.description,
        sameAs: [SITE.github, SITE.linkedin],
        knowsAbout: [
          ...TECHNOLOGIES,
          'Backend Engineering',
          'Software Architecture',
          'AI Integration',
        ],
        alumniOf: EDUCATION.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.institution })),
      },
      {
        '@type': 'WebSite',
        '@id': SITE.url + '/#website',
        url: SITE.url + '/',
        name: 'Yash Tank — Software Engineer',
        publisher: { '@id': personId },
      },
      {
        '@type': page?.kind ?? 'WebPage',
        url: canonical,
        name: title,
        description,
        isPartOf: { '@id': SITE.url + '/#website' },
        ...(page?.kind === 'ProfilePage'
          ? { mainEntity: { '@id': personId } }
          : { author: { '@id': personId } }),
      },
    ];
    if (path !== '/')
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url + '/' },
          {
            '@type': 'ListItem',
            position: 2,
            name: page?.label ?? project?.name ?? article?.title ?? 'Not found',
            item: canonical,
          },
        ],
      });
    if (project)
      graph.push({
        '@type': 'SoftwareSourceCode',
        name: project.name,
        description: project.description,
        url: canonical,
        ...(project.repo ? { codeRepository: project.repo } : {}),
        programmingLanguage: ['Java', ...(project.slug === 'trade-journal' ? ['TypeScript'] : [])],
        author: { '@id': personId },
      });
    if (article)
      graph.push({
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        datePublished: article.publishedAt,
        url: canonical,
        mainEntityOfPage: canonical,
        image: SITE.url + '/og-image.png',
        author: { '@id': personId },
      });
    let script = this.document.getElementById('portfolio-schema') as HTMLScriptElement | null;
    if (!script) {
      script = this.document.createElement('script');
      script.id = 'portfolio-schema';
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    }).replace(/</g, '\\u003c');
  }
}
