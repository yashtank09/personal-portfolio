import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header';
import { EducationList } from '../../shared/education-list/education-list';
import { Cta } from '../../shared/cta/cta';
@Component({
  selector: 'yt-education',
  imports: [PageHeader, EducationList, Cta],
  template: `
    <yt-page-header
      label="Education"
      eyebrow="FOUNDATIONS & CONTINUOUS LEARNING"
      title="A foundation to build on."
      description="Computer applications education, technical specializations, and an ongoing practice of learning by building."
    />
    <div class="page-body"><yt-education-list /></div>
    <yt-cta />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Education {}
