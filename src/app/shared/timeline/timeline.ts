import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EXPERIENCE } from '../../core/content';
@Component({
  selector: 'yt-timeline',
  template: `
    <div class="timeline">
      @for (job of jobs; track job.company) {
        <article>
          <div class="date mono">{{ job.dates }}</div>
          <div>
            <h3>{{ job.role }}</h3>
            <p class="company">{{ job.company }}</p>
            <ul>
              @for (point of job.points; track point) {
                <li>{{ point }}</li>
              }
            </ul>
          </div>
        </article>
      }
    </div>
  `,
  styleUrl: './timeline.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Timeline {
  readonly jobs = EXPERIENCE;
}
