import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { PROJECT_CASE_STUDIES } from '../projects/project-case-studies';

interface PageSeo {
  title: string;
  description: string;
  schemaType: 'ProfilePage' | 'AboutPage' | 'CollectionPage' | 'ContactPage' | 'WebPage';
  index?: boolean;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly siteUrl = 'https://yashtank.co.in';
  private readonly imageUrl = `${this.siteUrl}/assets/imaages/profile.jpeg`;
  private readonly pages: Record<string, PageSeo> = {
    '/': {
      title: 'Yash Tank | Software Engineer (Java Full Stack)',
      description: 'Yash Tank, Java full-stack software engineer with 3+ years in software engineering. Explore Spring Boot and Angular projects, experience and contact details.',
      schemaType: 'ProfilePage'
    },
    '/about': {
      title: 'About Yash Tank | Software Engineer (Java Full Stack)',
      description: 'Learn about Yash Tank, his backend engineering strengths, education, engineering mindset, and exploration of Spring AI, RAG, and AI agents.',
      schemaType: 'AboutPage'
    },
    '/education': {
      title: 'Education & Certifications | Yash Tank',
      description: 'Explore Yash Tank\'s computer applications education, technical certifications, and continuing professional development.',
      schemaType: 'CollectionPage'
    },
    '/experience': {
      title: 'Experience | Yash Tank',
      description: 'Yash Tank worked as a Software Engineer at DataCrops Software Pvt. Ltd. from April 2023 to August 2026 and as a Jr. Streaming Engineer at Epitome Solutions from January 2021 to January 2023.',
      schemaType: 'WebPage'
    },
    '/projects': {
      title: 'Projects | Yash Tank',
      description: 'Explore Sievex, Trade Journal, and InstaSend: projects by Yash Tank spanning web crawling, AI integration, trading analytics, and email automation.',
      schemaType: 'CollectionPage'
    },
    '/contact': {
      title: 'Contact Me | Yash Tank',
      description: 'Contact Yash Tank to discuss full-stack software engineering roles, product development, Java, Spring Boot, Angular, and backend opportunities.',
      schemaType: 'ContactPage'
    },
    ...Object.fromEntries(PROJECT_CASE_STUDIES.map(project => [`/projects/${project.slug}`, { title: project.title, description: project.description, schemaType: 'WebPage' as const }])),
    '/404': {
      title: 'Page Not Found | Yash Tank',
      description: 'The requested page could not be found.',
      schemaType: 'WebPage',
      index: false
    }
  };

  constructor(
    private readonly router: Router,
    private readonly titleService: Title,
    private readonly meta: Meta,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  initialize(): void {
    this.applyForUrl(this.router.url);
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => this.applyForUrl(event.urlAfterRedirects));
  }

  private applyForUrl(rawUrl: string): void {
    const path = rawUrl.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
    const page = this.pages[path] ?? this.pages['/404'];
    const canonicalUrl = path === '/' ? `${this.siteUrl}/` : `${this.siteUrl}${path}`;

    this.titleService.setTitle(page.title);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({
      name: 'robots',
      content: page.index === false
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    });
    this.meta.updateTag({ property: 'og:title', content: page.title });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Yash Tank' });
    this.meta.updateTag({ property: 'og:image', content: this.imageUrl });
    this.meta.updateTag({ property: 'og:image:alt', content: 'Yash Tank, Full-Stack Software Engineer' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: page.title });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });
    this.meta.updateTag({ name: 'twitter:image', content: this.imageUrl });

    this.setCanonical(canonicalUrl);
    this.setStructuredData(page, canonicalUrl);
  }

  private setCanonical(url: string): void {
    let canonical = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = url;
  }

  private setStructuredData(page: PageSeo, url: string): void {
    const id = 'portfolio-structured-data';
    this.document.getElementById(id)?.remove();

    const script = this.document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${this.siteUrl}/#person`,
          name: 'Yash Tank',
          jobTitle: 'Software Engineer (Java Full Stack)',
          url: `${this.siteUrl}/`,
          image: this.imageUrl,
          description: 'Software engineer with 5+ years of professional experience, including 3+ years in software engineering with Java, Spring Boot, Angular, backend systems, automation, and AI integrations.',
          knowsAbout: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'SQL', 'Microservices', 'REST APIs', 'Full-Stack Development', 'Automation', 'Spring AI', 'RAG', 'AI Agents', 'MySQL', 'Redis'],
          sameAs: [
            'https://www.linkedin.com/in/tyjtank',
            'https://github.com/yashtank09',
            'https://stackoverflow.com/users/11840032/yash-tank',
            'https://twitter.com/TankYash6',
            'https://www.hackerrank.com/profile/YashJTank'
          ]
        },
        {
          '@type': 'WebSite',
          '@id': `${this.siteUrl}/#website`,
          url: `${this.siteUrl}/`,
          name: 'Yash Tank',
          alternateName: 'Yash Tank Portfolio',
          publisher: { '@id': `${this.siteUrl}/#person` }
        },
        {
          '@type': page.schemaType,
          '@id': `${url}#webpage`,
          url,
          name: page.title,
          description: page.description,
          isPartOf: { '@id': `${this.siteUrl}/#website` },
          ...(page.schemaType === 'ProfilePage' || page.schemaType === 'AboutPage'
            ? { mainEntity: { '@id': `${this.siteUrl}/#person` } }
            : { author: { '@id': `${this.siteUrl}/#person` } })
        }
      ]
    });
    this.document.head.appendChild(script);
  }
}
