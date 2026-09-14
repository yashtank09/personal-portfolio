import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE, PROJECTS, TECHNOLOGIES } from '../../core/content';
import { ProjectCard } from '../../shared/project-card/project-card';
import { Timeline } from '../../shared/timeline/timeline';
import { Toolkit } from '../../shared/toolkit/toolkit';
import { Cta } from '../../shared/cta/cta';
@Component({
  selector: 'yt-home',
  imports: [RouterLink, ProjectCard, Timeline, Toolkit, Cta],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  readonly site = SITE;
  readonly projects = PROJECTS.slice(0, 2);
  readonly technologies = TECHNOLOGIES;
}
