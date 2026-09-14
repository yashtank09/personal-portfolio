import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'yt-page-header',
  imports: [RouterLink],
  template: `
    <nav class="crumbs" aria-label="Breadcrumb">
      <a routerLink="/">Home</a>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{{ label() }}</span>
    </nav>
    <header>
      <p class="eyebrow">{{ eyebrow() }}</p>
      <h1 tabindex="-1">{{ title() }}</h1>
      <p class="lead">{{ description() }}</p>
      <div class="header-content"><ng-content /></div>
    </header>
  `,
  styleUrl: './page-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeader {
  readonly label = input.required<string>();
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
