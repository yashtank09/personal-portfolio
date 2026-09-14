import { Component, ChangeDetectionStrategy, input } from '@angular/core';
@Component({
  selector: 'yt-diagram',
  template: `
    <figure>
      <figcaption class="mono">{{ label() }}</figcaption>
      <ol>
        @for (step of steps(); track step; let i = $index) {
          <li>
            <span class="mono">0{{ i + 1 }}</span>
            <strong>{{ step }}</strong>
            @if (!$last) {
              <b aria-hidden="true">→</b>
            }
          </li>
        }
      </ol>
    </figure>
  `,
  styleUrl: './diagram.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Diagram {
  readonly steps = input.required<readonly string[]>();
  readonly label = input('CONCEPTUAL PROCESSING FLOW');
}
