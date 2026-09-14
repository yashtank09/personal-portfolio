import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeader } from '../../shared/page-header/page-header';
import { Cta } from '../../shared/cta/cta';
@Component({
  selector: 'yt-about',
  imports: [PageHeader, Cta, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {}
