import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectCaseStudy } from './project-case-studies';

@Component({
  selector: 'yt-project-case-study',
  templateUrl: './project-case-study.component.html',
  styleUrls: ['./project-case-study.component.css']
})
export class ProjectCaseStudyComponent {
  readonly project = this.route.snapshot.data['project'] as ProjectCaseStudy;
  constructor(private readonly route: ActivatedRoute) {}
}
