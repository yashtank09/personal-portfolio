import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TOOLKIT } from '../../core/content';
@Component({
  selector: 'yt-toolkit',
  template: `
    <div class="grid">
      @for (group of groups; track group.name) {
        <article>
          <span class="icon mono" aria-hidden="true">{{ group.icon }}</span>
          <h3>{{ group.name }}</h3>
          <p>{{ group.items.join(' · ') }}</p>
        </article>
      }
    </div>
  `,
  styleUrl: './toolkit.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toolkit {
  readonly groups = TOOLKIT;
}
