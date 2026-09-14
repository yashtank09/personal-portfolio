import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {afterNextRender, computed, DestroyRef, effect, inject, Injectable, PLATFORM_ID, signal,} from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({providedIn: 'root'})
export class ThemeService {
    private readonly document = inject(DOCUMENT);
    private readonly platform = inject(PLATFORM_ID);
    private readonly destroy = inject(DestroyRef);
    readonly preference = signal<Theme>('light');
    private readonly systemDark = signal(false);
    private readonly ready = signal(false);
    readonly resolved = computed(() =>
        this.preference() === 'system' ? (this.systemDark() ? 'dark' : 'light') : this.preference(),
    );

    constructor() {
        afterNextRender(() => {
            const win = this.document.defaultView;
            if (!win) return;
            try {
                const stored = win.localStorage.getItem('yt-theme');
                if (stored === 'light' || stored === 'dark' || stored === 'system')
                    this.preference.set(stored);
            } catch {
                /* Storage can be unavailable in private contexts. */
            }
            const media = win.matchMedia('(prefers-color-scheme: dark)');
            this.systemDark.set(media.matches);
            const update = () => this.systemDark.set(media.matches);
            media.addEventListener('change', update);
            this.destroy.onDestroy(() => media.removeEventListener('change', update));
            this.ready.set(true);
        });
        effect(() => {
            if (this.ready() && isPlatformBrowser(this.platform))
                this.document.documentElement.dataset['theme'] = this.resolved();
        });
    }

    set(value: string) {
        if (value !== 'light' && value !== 'dark' && value !== 'system') return;
        this.preference.set(value);
        try {
            this.document.defaultView?.localStorage.setItem('yt-theme', value);
        } catch {
            /* Preference still works for this visit. */
        }
    }
}
