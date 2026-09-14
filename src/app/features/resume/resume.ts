import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE, PROJECTS } from '../../core/content';
import { PageHeader } from '../../shared/page-header/page-header';
import { Timeline } from '../../shared/timeline/timeline';
import { Toolkit } from '../../shared/toolkit/toolkit';
import { EducationList } from '../../shared/education-list/education-list';
@Component({
  selector: 'yt-resume',
  imports: [PageHeader, Timeline, Toolkit, EducationList, RouterLink],
  templateUrl: './resume.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Resume {
  readonly site = SITE;
  readonly projects = PROJECTS;
}
