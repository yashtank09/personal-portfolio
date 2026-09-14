import { NgOptimizedImage } from '@angular/common';
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
@Component({
  selector: 'yt-screenshot',
  imports: [NgOptimizedImage],
  template: `
    <figure>
      <div class="bar mono">
        <span aria-hidden="true">○ ○ ○</span>
        {{ title() }}
      </div>
      @if (src()) {
        <img [ngSrc]="src()" [alt]="alt()" [width]="width()" [height]="height()" loading="lazy" />
      } @else {
        <div class="placeholder">
          <span aria-hidden="true">▧</span>
          <p>Actual product capture to be added</p>
          <small>{{ title() }}</small>
        </div>
      }
      <figcaption>
        {{ src() ? alt() : 'Reserved for an actual screenshot. No mock product data.' }}
      </figcaption>
    </figure>
  `,
  styleUrl: './screenshot.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Screenshot {
  readonly title = input.required<string>();
  readonly src = input('');
  readonly alt = input('');
  readonly width = input(1440);
  readonly height = input(900);
}
