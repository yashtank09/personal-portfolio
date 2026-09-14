import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { SeoService } from './core/seo';
@Component({
  selector: 'yt-root',
  imports: [RouterOutlet, Header, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip-link" href="#main">Skip to content</a>
    <yt-header />
    <main class="container" id="main" tabindex="-1"><router-outlet /></main>
    <yt-footer />
  `,
})
export class App {
  constructor() {
    inject(SeoService).initialize();
  }
}
