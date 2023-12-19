import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationHeaderComponent } from './shared-modules/navigation-header/navigation-header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FooterComponent } from './shared-modules/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationHeaderComponent,
    HomePageComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
