import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'yt-not-found',
  imports: [RouterLink],
  template: `
    <section class="section">
      <p class="eyebrow">404 / PAGE NOT FOUND</p>
      <h1 tabindex="-1">A missing connection.</h1>
      <p class="lead">This page doesn’t exist or has moved.</p>
      <div class="actions">
        <a class="button primary" routerLink="/">Back to home →</a>
        <a class="button" routerLink="/projects">Explore projects</a>
        <a class="button" routerLink="/contact">Contact Yash</a>
      </div>
    </section>
  `,
  styles: ['section{padding-block:90px 120px}h1{margin-bottom:28px}.actions{margin-top:30px}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {}
