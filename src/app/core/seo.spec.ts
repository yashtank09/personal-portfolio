import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, it, expect, beforeEach } from 'vitest';
import { SeoService } from './seo';
describe('SEO route transitions', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));
  it('updates canonical, social tags, and schema without duplicates', () => {
    const seo = TestBed.inject(SeoService);
    seo.apply('/projects/trade-journal?utm_source=test');
    expect(document.title).toContain('Trade Journal');
    expect(document.querySelector('link[rel=canonical]')?.getAttribute('href')).toBe(
      'https://yashtank.co.in/projects/trade-journal/',
    );
    expect(document.querySelector('meta[property="og:type"]')?.getAttribute('content')).toBe(
      'website',
    );
    const schema = JSON.parse(document.getElementById('portfolio-schema')?.textContent || '{}');
    expect(
      schema['@graph'].some((s: Record<string, unknown>) => s['@type'] === 'SoftwareSourceCode'),
    ).toBe(true);
    seo.apply('/about');
    expect(document.querySelectorAll('#portfolio-schema')).toHaveLength(1);
    expect(document.querySelectorAll('link[rel=canonical]')).toHaveLength(1);
    expect(document.title).toBe('About Yash Tank | Software Engineer');
  });
  it('marks unknown pages noindex and removes project identity', () => {
    const seo = TestBed.inject(SeoService);
    seo.apply('/projects/sievex');
    seo.apply('/missing');
    expect(document.querySelector('meta[name=robots]')?.getAttribute('content')).toBe(
      'noindex, follow',
    );
    expect(document.getElementById('portfolio-schema')?.textContent).not.toContain(
      'SoftwareSourceCode',
    );
  });
});
