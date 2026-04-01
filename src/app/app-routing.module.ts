import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ExperienceComponent } from './experience/experience.component';
import { ContactComponent } from './contact/contact.component';
import { EducationComponent } from './education/education.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
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
    path: '**', pathMatch: 'full', component: HomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
