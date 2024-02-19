import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroTitleComponent } from './hero-title/hero-title.component';
import { MasterTitlesComponent } from './master-titles/master-titles.component';

@NgModule({
  declarations: [
    HeroTitleComponent,
    MasterTitlesComponent
  ],
  exports:[
    HeroTitleComponent,
    MasterTitlesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModulesModule { }
