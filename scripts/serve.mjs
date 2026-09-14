import http from 'node:http';
import path from 'node:path';
import { readFile, stat } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
const root = path.resolve('dist/personal-portfolio/browser');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
};
http
  .createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
      if (file !== root && !file.startsWith(root + path.sep)) {
        res.writeHead(403);
        res.end();
        return;
      }
      try {
        if ((await stat(file)).isDirectory()) {
          if (!url.pathname.endsWith('/')) {
            res.writeHead(301, { Location: url.pathname + '/' + url.search });
            res.end();
            return;
          }
          file = path.join(file, 'index.html');
        }
      } catch {}
      let body;
      try {
        body = await readFile(file);
      } catch {
        file = path.join(root, '404.html');
        body = await readFile(file);
        res.statusCode = 404;
      }
      res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
      res.setHeader(
        'Cache-Control',
        /[-.][A-Z0-9]{8,}\.(js|css)$/i.test(file)
          ? 'public, max-age=31536000, immutable'
          : 'no-cache',
      );
      if (
        req.headers['accept-encoding']?.includes('gzip') &&
        /\.(html|js|css|xml|txt|svg)$/.test(file)
      ) {
        body = gzipSync(body);
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Vary', 'Accept-Encoding');
      }
      res.end(body);
    } catch {
      res.writeHead(400);
      res.end('Bad request');
    }
  })
  .listen(Number(process.env.PORT || 4300), '127.0.0.1', () =>
    console.log('Angular production preview: http://localhost:' + (process.env.PORT || 4300)),
  );
