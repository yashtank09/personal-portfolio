import { describe, it, expect } from 'vitest';
import { canonicalPath, PROJECTS, ARTICLES, PAGES, readingTime } from './content';
describe('canonical identity and content', () => {
  it('normalizes query, fragment, and trailing slash variants', () => {
    expect(canonicalPath('/about/?ref=test#intro')).toBe('/about/');
    expect(canonicalPath('///')).toBe('/');
  });
  it('preserves all three project URLs and real repository links', () => {
    expect(PROJECTS.map((p) => p.slug)).toEqual(['trade-journal', 'sievex', 'instasend']);
    expect(PROJECTS[0].repo).toBe('https://github.com/yashtank09/trade-journal-monorepo');
    expect(PROJECTS[2].repo).toBe('');
  });
  it('does not create invented publications', () => expect(ARTICLES).toHaveLength(0));
  it('gives every public page a unique title and description', () => {
    expect(new Set(PAGES.map((p) => p.title)).size).toBe(PAGES.length);
    expect(new Set(PAGES.map((p) => p.description)).size).toBe(PAGES.length);
  });
  it('calculates reading time from article text', () =>
    expect(
      readingTime({
        slug: 'test',
        title: 'Test',
        description: 'Test',
        publishedAt: '2026-01-01',
        sections: [{ id: 'one', title: 'One', paragraphs: ['word '.repeat(450)] }],
      }),
    ).toBe(3));
});
