import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PROJECTS } from '../../core/content';
import { PageHeader } from '../../shared/page-header/page-header';
import { ProjectCard } from '../../shared/project-card/project-card';
import { Cta } from '../../shared/cta/cta';
@Component({
  selector: 'yt-projects',
  imports: [PageHeader, ProjectCard, Cta],
  template: `
    <yt-page-header
      label="Projects"
      eyebrow="SELECTED ENGINEERING WORK"
      title="Products with a problem to solve."
      description="A closer look at the systems, data flows, and decisions behind my work."
    />
    <section class="page-body two-column">
      @for (project of projects; track project.slug; let i = $index) {
        <yt-project-card [project]="project" [number]="i + 1" />
      }
    </section>
    <yt-cta />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  readonly projects = PROJECTS;
}
