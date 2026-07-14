import { Component } from '@angular/core';

@Component({
  selector: 'yt-not-found',
  template: `
    <main class="not-found container">
      <p class="eyebrow">404</p>
      <h1>Page not found.</h1>
      <p>The page you requested does not exist or may have moved.</p>
      <a routerLink="/" class="btn-primary">Return to the portfolio</a>
    </main>
  `,
  styles: [`
    .not-found { min-height: 65vh; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; }
    .eyebrow { font-weight: 700; letter-spacing: .15em; text-transform: uppercase; }
    h1 { margin-bottom: 1rem; }
    p { max-width: 38rem; }
    a { margin-top: 1rem; }
  `]
})
export class NotFoundComponent {}
