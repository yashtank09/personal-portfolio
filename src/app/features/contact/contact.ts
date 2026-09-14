import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header';
import { SITE } from '../../core/content';
@Component({
  selector: 'yt-contact',
  imports: [PageHeader],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  readonly site = SITE;
}
