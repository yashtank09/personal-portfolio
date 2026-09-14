import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../core/content';
import { PageHeader } from '../../shared/page-header/page-header';
import { Diagram } from '../../shared/diagram/diagram';
import { Screenshot } from '../../shared/screenshot/screenshot';
import { Cta } from '../../shared/cta/cta';
@Component({
  selector: 'yt-project-detail',
  imports: [PageHeader, Diagram, Screenshot, Cta],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetail {
  readonly project = inject(ActivatedRoute).snapshot.data['project'] as Project;
  readonly sections = [
    ['overview', 'Overview'],
    ['problem', 'Problem'],
    ['solution', 'Solution'],
    ['architecture', 'Architecture'],
    ['features', 'Key features'],
    ['decisions', 'Design decisions'],
    ['performance', 'Performance'],
    ['security', 'Security'],
    ['screenshots', 'Screenshots'],
    ['learning', 'What I learned'],
  ];
}
