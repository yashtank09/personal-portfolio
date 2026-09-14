import { DOCUMENT } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'yt-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly open = signal(false);
  readonly compact = signal(false);
  readonly links = [
    ['Home', '/'],
    ['About', '/about'],
    ['Experience', '/experience'],
    ['Projects', '/projects'],
    ['Writing', '/blog'],
    ['Contact', '/contact'],
  ];
  private readonly document = inject(DOCUMENT);
  private readonly destroy = inject(DestroyRef);
  constructor() {
    let initial = true;
    inject(Router)
      .events.pipe(takeUntilDestroyed())
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.open.set(false);
          if (!initial)
            this.document.defaultView?.requestAnimationFrame(() =>
              this.document.querySelector<HTMLElement>('h1')?.focus(),
            );
          initial = false;
        }
      });
    afterNextRender(() => {
      const win = this.document.defaultView;
      if (!win) return;
      const scroll = () => this.compact.set(win.scrollY > 40);
      const key = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && this.open()) {
          this.open.set(false);
          this.document.getElementById('menu-toggle')?.focus();
        }
      };
      scroll();
      win.addEventListener('scroll', scroll, { passive: true });
      this.document.addEventListener('keydown', key);
      this.destroy.onDestroy(() => {
        win.removeEventListener('scroll', scroll);
        this.document.removeEventListener('keydown', key);
      });
    });
  }
}
