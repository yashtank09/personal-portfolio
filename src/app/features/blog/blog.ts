import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ARTICLES, readingTime } from '../../core/content';
import { PageHeader } from '../../shared/page-header/page-header';
import { Cta } from '../../shared/cta/cta';
@Component({
  selector: 'yt-blog',
  imports: [PageHeader, Cta, RouterLink],
  template: `
    <yt-page-header
      label="Writing"
      eyebrow="THE ENGINEERING DESK"
      title="Build. Understand. Write it down."
      description="A space for implementation notes, architecture decisions, and practical lessons from building software."
    />
    <section class="page-body">
      @for (article of articles; track article.slug) {
        <article class="entry">
          <p class="eyebrow">{{ article.publishedAt }} · {{ time(article) }} MIN READ</p>
          <h2>
            <a [routerLink]="['/blog', article.slug]">{{ article.title }}</a>
          </h2>
          <p>{{ article.description }}</p>
        </article>
      } @empty {
        <div class="empty">
          <span aria-hidden="true">Aa</span>
          <div>
            <p class="eyebrow">NO ARTICLES PUBLISHED YET</p>
            <h2>Good notes take time.</h2>
            <p>
              Future writing will explore backend engineering, Java, Angular, automation, and
              practical AI. Articles will appear here when they’re ready.
            </p>
            <a class="text-link" routerLink="/projects">Explore the projects in the meantime →</a>
          </div>
        </div>
      }
    </section>
    <yt-cta />
  `,
  styleUrl: './blog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blog {
  readonly articles = ARTICLES;
  readonly time = readingTime;
}
