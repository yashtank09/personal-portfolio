import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutComponent } from './about/about.component';
import { ExperienceComponent } from './experience/experience.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { ContactComponent } from './contact/contact.component';
import { EducationComponent } from './education/education.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {
    path: '', component: HomePageComponent
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
