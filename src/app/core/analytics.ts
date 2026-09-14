import { DOCUMENT } from '@angular/common';
import { Injectable, afterNextRender, inject, signal } from '@angular/core';
export const ANALYTICS_ID = 'G-CEHSKKC17B'; // Existing public measurement ID; not a credential.
type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly document = inject(DOCUMENT);
  readonly enabled = signal(false);
  constructor() {
    afterNextRender(() => {
      try {
        if (this.document.defaultView?.localStorage.getItem('yt-analytics') === 'yes')
          this.enable();
      } catch {
        /* Default remains off. */
      }
    });
  }
  enable() {
    const win = this.document.defaultView as AnalyticsWindow | null;
    if (!win) return;
    this.enabled.set(true);
    try {
      win.localStorage.setItem('yt-analytics', 'yes');
    } catch {
      /* Session-only consent. */
    }
    if (!win.gtag) {
      win.dataLayer = [];
      win.gtag = (...args: unknown[]) => win.dataLayer?.push(args);
      win.gtag('js', new Date());
      win.gtag('config', ANALYTICS_ID, { send_page_view: false });
      const script = this.document.createElement('script');
      script.id = 'optional-analytics';
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + ANALYTICS_ID;
      this.document.head.appendChild(script);
    }
    win.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    this.page(this.document.location.pathname);
  }
  disable() {
    this.enabled.set(false);
    const win = this.document.defaultView as AnalyticsWindow | null;
    try {
      win?.localStorage.setItem('yt-analytics', 'no');
    } catch {
      /* Consent still revoked in memory. */
    }
    win?.gtag?.('consent', 'update', { analytics_storage: 'denied' });
  }
  page(path: string) {
    if (!this.enabled()) return;
    const win = this.document.defaultView as AnalyticsWindow | null;
    win?.gtag?.('event', 'page_view', {
      page_path: path.split(/[?#]/)[0],
      page_title: this.document.title,
    });
  }
}
