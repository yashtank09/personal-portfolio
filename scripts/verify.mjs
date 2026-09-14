import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
const data = async (name) =>
  JSON.parse(
    (await readFile('src/app/core/data/' + name + '.json', 'utf8')).replace(/^\uFEFF/, ''),
  );
const pages = await data('pages'),
  projects = await data('projects'),
  articles = await data('articles');
const paths = [
  '/',
  ...pages.filter((p) => p.path).map((p) => '/' + p.path + '/'),
  ...projects.map((p) => '/projects/' + p.slug + '/'),
  ...articles.map((a) => '/blog/' + a.slug + '/'),
];
const base = process.env.TEST_URL || 'http://localhost:4300';
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'msedge' });
const context = await browser.newContext();
const page = await context.newPage();
const errors = [];
const external = [];
const checks = [];
const links = new Set();
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => {
  if (['error', 'warning'].includes(m.type())) errors.push(m.text());
});
page.on('request', (r) => {
  if (!r.url().startsWith(base)) external.push(r.url());
});
await mkdir('qa', { recursive: true });
try {
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJs.newPage();
  for (const route of paths) {
    const response = await staticPage.goto(base + route);
    assert.equal(response.status(), 200);
    assert.equal(await staticPage.locator('h1').count(), 1, 'Prerendered h1 ' + route);
    assert.ok(
      (await staticPage.locator('main').innerText()).length > 150,
      'Meaningful static HTML ' + route,
    );
    assert.equal(
      await staticPage.locator('link[rel=canonical]').getAttribute('href'),
      'https://yashtank.co.in' + route,
    );
  }
  await noJs.close();
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of paths) {
      const response = await page.goto(base + route);
      assert.equal(response.status(), 200, route);
      await page.getByRole('combobox', { name: 'Color theme' }).waitFor();
      assert.equal(await page.locator('h1').count(), 1, route);
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
        'Overflow ' + width + route,
      );
      assert.equal(
        await page.locator('link[rel=canonical]').getAttribute('href'),
        'https://yashtank.co.in' + route,
      );
      assert.ok(await page.locator('meta[property="og:title"]').getAttribute('content'));
      assert.equal(
        await page.locator('meta[name="twitter:card"]').getAttribute('content'),
        'summary_large_image',
      );
      const schema = JSON.parse(await page.locator('#portfolio-schema').textContent());
      assert.equal(schema['@context'], 'https://schema.org');
      const person = schema['@graph'].find((s) => s['@type'] === 'Person');
      assert.equal(person.name, 'Yash Tank');
      assert.equal(person.jobTitle, 'Software Engineer');
      assert.ok(person.sameAs.includes('https://github.com/yashtank09'));
      assert.ok(!/lorem ipsum|coding ninja/i.test(await page.locator('main').innerText()));
      if (width === 320 || width === 1440) {
        const audit = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze();
        assert.deepEqual(
          audit.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
          [],
          'Accessibility ' + width + route,
        );
      }
      for (const href of await page
        .locator('a[href]')
        .evaluateAll((nodes) => nodes.map((n) => n.getAttribute('href')))) {
        const url = new URL(href, base + route);
        if (url.origin === base) links.add(url.href);
      }
      checks.push({ width, route, pass: true });
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  const menu = page.locator('#menu-toggle');
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(page.locator('#menu-toggle')).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#menu-toggle')).toBeFocused();
  await page.getByRole('button', { name: 'Menu +' }).click();
  await page
    .locator('#primary-navigation')
    .getByRole('link', { name: 'Projects', exact: true })
    .click();
  await page.waitForURL('**/projects');
  await page.waitForFunction(() => document.title === 'Software Engineering Projects | Yash Tank');
  await expect(page.locator('#menu-toggle')).toHaveAttribute('aria-expanded', 'false');
  await page.getByRole('link', { name: 'Explore case study' }).first().click();
  await page.waitForURL('**/projects/trade-journal');
  assert.match(await page.locator('h1').innerText(), /Trade Journal/);
  assert.match(await page.title(), /Trade Journal/);
  await page.getByRole('combobox', { name: 'Color theme' }).selectOption('dark');
  await page.reload();
  await page.waitForFunction(() => document.documentElement.dataset.theme === 'dark');
  assert.equal(await page.getByRole('combobox', { name: 'Color theme' }).inputValue(), 'dark');
  for (const route of paths) {
    await page.goto(base + route);
    const audit = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    assert.deepEqual(
      audit.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
      [],
      'Dark accessibility ' + route,
    );
  }
  await page.goto(base);
  await page.screenshot({ path: 'qa/home-mobile-dark.png', fullPage: true });
  await page.getByRole('combobox', { name: 'Color theme' }).selectOption('light');
  await page.screenshot({ path: 'qa/home-mobile.png', fullPage: true });
  await page.screenshot({ path: 'qa/mobile-first-screen.png' });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: 'qa/home-desktop.png', fullPage: true });
  await page.screenshot({ path: 'qa/desktop-first-screen.png' });
  await page.getByRole('combobox', { name: 'Color theme' }).selectOption('system');
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.waitForFunction(() => document.documentElement.dataset.theme === 'dark');
  assert.equal(
    await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior),
    'auto',
  );
  for (const href of links) {
    const url = new URL(href);
    const response = await page.request.get(url.href.split('#')[0]);
    assert.equal(response.status(), 200, 'Internal link ' + href);
    if (url.hash) {
      await page.goto(url.href);
      assert.equal(
        await page.locator('[id="' + decodeURIComponent(url.hash.slice(1)) + '"]').count(),
        1,
        'Anchor ' + href,
      );
    }
  }
  const missing = await page.request.get(base + '/missing-page/');
  assert.equal(missing.status(), 404);
  assert.match(await missing.text(), /noindex, follow/);
  assert.match(await missing.text(), /A missing connection/);
  const sitemap = await (await page.request.get(base + '/sitemap.xml')).text();
  for (const route of paths) assert.ok(sitemap.includes('https://yashtank.co.in' + route));
  assert.ok(!sitemap.includes('/404/'));
  const robots = await (await page.request.get(base + '/robots.txt')).text();
  assert.ok(robots.includes('Allow: /'));
  assert.ok(robots.includes('https://yashtank.co.in/sitemap.xml'));
  assert.deepEqual(errors, [], 'Runtime or console errors');
  assert.deepEqual(external, [], 'No third-party requests without consent');
  await writeFile(
    'qa/verification.json',
    JSON.stringify(
      { checks, links: links.size, staticRoutes: paths.length, errors, external, passed: true },
      null,
      2,
    ),
  );
  console.log(
    'PASS: ' +
      checks.length +
      ' responsive route checks; ' +
      paths.length +
      ' routes without JavaScript; ' +
      links.size +
      ' internal links; light/dark axe, metadata, schema, navigation, theme, sitemap, robots, and 404.',
  );
} finally {
  await browser.close();
}
