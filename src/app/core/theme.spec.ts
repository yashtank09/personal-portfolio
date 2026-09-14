import {TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {ThemeService} from './theme';

describe('Theme preferences', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.stubGlobal('matchMedia', () => ({
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }));
        TestBed.configureTestingModule({});
    });
    it('persists valid choices and rejects unrecognized values', () => {
        const theme = TestBed.inject(ThemeService);
        theme.set('dark');
        expect(theme.preference()).toBe('dark');
        expect(theme.resolved()).toBe('dark');
        expect(localStorage.getItem('yt-theme')).toBe('dark');
        theme.set('invalid');
        expect(theme.preference()).toBe('dark');
        theme.set('system');
        expect(theme.preference()).toBe('system');
    });
});
