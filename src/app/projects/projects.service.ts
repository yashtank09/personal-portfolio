import { Injectable } from '@angular/core';

export interface ProjectRepos {
  repoId: string;
  repoTitle: string;
  repoDescription: string;
  starCount: string;
  repoUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  
  private projectRepos: ProjectRepos[] = [];

  constructor() { }

  getProjectRepos() : ProjectRepos[] {
    return [...this.projectRepos];
  }

  setProjectRepos(projectRepos: ProjectRepos[]): void {
    this.projectRepos = projectRepos.slice();
  }
}
 