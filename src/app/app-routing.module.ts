import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ExperienceComponent } from './experience/experience.component';
import { ContactComponent } from './contact/contact.component';
import { EducationComponent } from './education/education.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { ProjectCaseStudyComponent } from './projects/project-case-study.component';
import { PROJECT_CASE_STUDIES } from './projects/project-case-studies';

const routes: Routes = [
  ...PROJECT_CASE_STUDIES.map(project => ({ path: `projects/${project.slug}`, component: ProjectCaseStudyComponent, data: { project } })),
  {
    path: '', component: HomePageComponent
  }, {
    path: 'about', component: AboutComponent
  }, {
    path: 'education', component: EducationComponent
  }, {
    path: 'experience', component: ExperienceComponent
  }, {
    path: 'projects', component: ProjectsComponent
  }, {
    path: 'contact', component: ContactComponent
  }, {
    path: '**', pathMatch: 'full', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
