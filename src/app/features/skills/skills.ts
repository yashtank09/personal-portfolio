import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header';
import { Toolkit } from '../../shared/toolkit/toolkit';
import { Cta } from '../../shared/cta/cta';
@Component({
  selector: 'yt-skills',
  imports: [PageHeader, Toolkit, Cta],
  template: `
    <yt-page-header
      label="Engineering toolkit"
      eyebrow="CAPABILITIES"
      title="The right tools for the problem."
      description="Java and Spring Boot at the core. Angular on the frontend. Clear architecture connecting the pieces."
    />
    <section class="page-body"><yt-toolkit /></section>
    <div class="prose">
      <h2>Depth, with room to explore.</h2>
      <p>
        My strongest professional experience is in Java, Spring Boot, Angular, MySQL, APIs, and
        automation. I use architecture, database tuning, reusable components, and careful release
        validation to make that work maintainable.
      </p>
      <p>
        AI integration, retrieval, and conversational context are areas I continue to develop
        through practical projects. Tools earn their place by solving a concrete problem.
      </p>
    </div>
    <yt-cta />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {}
