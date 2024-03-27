import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { RESUMEDOWNLOADABLE } from 'src/app/configurations';

@Component({
  selector: 'yt-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.css']
})
export class NavigationHeaderComponent {

  constructor(private route: Router) {}

  private _downloadResume = RESUMEDOWNLOADABLE;

  get downloadResume(): string {
    return this._downloadResume;
  }

}
