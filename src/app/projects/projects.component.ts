import { Component } from '@angular/core';
import { SocialMedia } from '../services/social-media.service';
import { ProjectRepos, ProjectsService } from './projects.service';

@Component({
  selector: 'yt-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  projectRepo: ProjectRepos[];

  private projectRepos: ProjectRepos[] = [
    {
      "repoId": "studentsApp",
      "repoTitle": "StudentsApp",
      "repoDescription": "Student management application to manage student by their standard and group.",
      "starCount": "0",
      "repoUrl": "https://github.com/yashtank09/StudentsApp"
    },{
      "repoId": "personalPortfolio",
      "repoTitle": "personal-portfolio",
      "repoDescription": "Representation of my self in profetional life that elabrate and catagorise my skills.",
      "starCount": "0",
      "repoUrl": "https://github.com/yashtank09/personal-portfolio"
    },{
      "repoId": "pagerank",
      "repoTitle": "pagerank",
      "repoDescription": "Simple Python Search Spider, Page Ranker, and Visualizer.",
      "starCount": "0",
      "repoUrl": "https://github.com/yashtank09/pagerank"
    }
  ];

  constructor(private projectRepoService: ProjectsService) {
    projectRepoService.setProjectRepos(this.projectRepos);
    this.projectRepo = projectRepoService.getProjectRepos();
  }
}
