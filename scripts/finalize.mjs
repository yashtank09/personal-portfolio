import { readFile, writeFile, copyFile } from 'node:fs/promises';
const read = async (name) =>
  JSON.parse(
    await readFile('src/app/core/data/' + name + '.json', 'utf8').then((s) =>
      s.replace(/^\uFEFF/, ''),
    ),
  );
const pages = await read('pages'),
  projects = await read('projects'),
  articles = await read('articles');
const slugs = new Set();
for (const a of articles) {
  if (
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.slug) ||
    slugs.has(a.slug) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(a.publishedAt) ||
    !Number.isFinite(Date.parse(a.publishedAt))
  )
    throw new Error('Invalid article slug or real publication date');
  slugs.add(a.slug);
}
const root = 'dist/personal-portfolio/browser';
const paths = [
  '/',
  ...pages.filter((p) => p.path).map((p) => '/' + p.path + '/'),
  ...projects.map((p) => '/projects/' + p.slug + '/'),
  ...articles.map((a) => '/blog/' + a.slug + '/'),
];
await writeFile(
  root + '/sitemap.xml',
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    paths.map((p) => '<url><loc>https://yashtank.co.in' + p + '</loc></url>').join('') +
    '</urlset>',
);
await writeFile(
  root + '/robots.txt',
  'User-agent: *\nAllow: /\nSitemap: https://yashtank.co.in/sitemap.xml\n',
);
await copyFile(root + '/404/index.html', root + '/404.html');
console.log(
  'Generated sitemap for ' + paths.length + ' public routes, robots.txt, and static 404.',
);
