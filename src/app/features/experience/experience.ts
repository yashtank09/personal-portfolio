import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header';
import { Timeline } from '../../shared/timeline/timeline';
import { Cta } from '../../shared/cta/cta';
@Component({
  selector: 'yt-experience',
  imports: [PageHeader, Timeline, Cta],
  template: `
    <yt-page-header
      label="Experience"
      eyebrow="ENGINEERING IN PRACTICE"
      title="Built, shipped, and improved."
      description="Production APIs, full-stack modules, automation, and the work that keeps applications reliable."
    />
    <section class="page-body"><yt-timeline /></section>
    <yt-cta />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {}
