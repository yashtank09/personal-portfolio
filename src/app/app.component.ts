import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent {
  title = 'personal-portfolio';

  constructor(private readonly seo: SeoService) {
    this.seo.initialize();
  }
}
