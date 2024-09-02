import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationHeaderComponent } from './shared-modules/navigation-header/navigation-header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FooterComponent } from './shared-modules/footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ExperienceComponent } from './experience/experience.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { ContactComponent } from './contact/contact.component';
import { EducationComponent } from './education/education.component';
import { ProjectsComponent } from './projects/projects.component';
import { SharedModulesModule } from './shared-modules/shared-modules.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    NavigationHeaderComponent,
    HomePageComponent,
    FooterComponent,
    AboutComponent,
    ExperienceComponent,
    AchievementsComponent,
    ContactComponent,
    EducationComponent,
    ProjectsComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModulesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    BrowserAnimationsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
