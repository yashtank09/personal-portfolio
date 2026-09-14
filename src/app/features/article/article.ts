import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Article, ARTICLES, readingTime } from '../../core/content';
import { PageHeader } from '../../shared/page-header/page-header';
import { CodeBlock } from '../../shared/code-block/code-block';
import { Diagram } from '../../shared/diagram/diagram';
@Component({
  selector: 'yt-article',
  imports: [PageHeader, CodeBlock, Diagram, RouterLink],
  templateUrl: './article.html',
  styleUrl: './article.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlePage {
  readonly article = inject(ActivatedRoute).snapshot.data['article'] as Article;
  readonly time = readingTime(this.article);
  readonly related = ARTICLES.filter((a) => a.slug !== this.article.slug).slice(0, 2);
}
