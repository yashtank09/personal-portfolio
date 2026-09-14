import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../core/theme';
import { AnalyticsService } from '../../core/analytics';
import { SITE } from '../../core/content';
@Component({
  selector: 'yt-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  readonly site = SITE;
  readonly theme = inject(ThemeService);
  readonly analytics = inject(AnalyticsService);
  readonly year = new Date().getFullYear();
}
