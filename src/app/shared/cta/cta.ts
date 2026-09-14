import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../core/content';
@Component({
  selector: 'yt-cta',
  imports: [RouterLink],
  template: `
    <section>
      <div>
        <p class="eyebrow">HAVE SOMETHING IN MIND?</p>
        <h2>
          Let’s build
          <br />
          <em>something useful.</em>
        </h2>
        <p>Engineering roles, interesting problems, or a good technical conversation.</p>
      </div>
      <div class="cta-actions">
        <a class="button primary" routerLink="/contact">
          Start a conversation
          <span aria-hidden="true">↗</span>
        </a>
        <a [href]="emailLink">{{ email }}</a>
      </div>
    </section>
  `,
  styleUrl: './cta.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cta {
  readonly email = SITE.email;
  readonly emailLink = 'mailto:' + SITE.email;
}
