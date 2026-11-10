#!/usr/bin/env node
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const APP_ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const OUT_ROOT = join(APP_ROOT, 'out');
const PREFIX = '/playground';
const PORT = Number(process.env.PORT ?? 3200);
const HOST = process.env.HOST ?? '127.0.0.1';

const CONTENT_TYPES = {
  '.avif': 'image/avif',
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

if (!existsSync(OUT_ROOT)) {
  console.error(`serve-export: no static export at ${OUT_ROOT}`);
  console.error('serve-export: run `pnpm --filter playground run build` first.');
  process.exit(1);
}

function sendText(response, status, body) {
  response.writeHead(status, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  response.end(body);
}

const server = createServer((request, response) => {
  const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`);
  const pathname = decodeURIComponent(url.pathname);

  if (pathname === PREFIX) {
    response.writeHead(301, { Location: `${PREFIX}/`, 'Cache-Control': 'no-store' });
    response.end();
    return;
  }

  if (!pathname.startsWith(`${PREFIX}/`)) {
    sendText(response, 404, `Not found: ${pathname}`);
    return;
  }

  const relative = pathname.slice(PREFIX.length + 1);
  let filePath = resolve(OUT_ROOT, relative);

  if (filePath !== OUT_ROOT && !filePath.startsWith(`${OUT_ROOT}${sep}`)) {
    sendText(response, 403, 'Forbidden');
    return;
  }

  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, 'index.html');
  }

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    sendText(response, 404, `Not found: ${pathname}`);
    return;
  }

  const contentType = CONTENT_TYPES[extname(filePath).toLowerCase()] ?? 'application/octet-stream';
  response.writeHead(200, {
    'Content-Type': contentType,
    'Cache-Control': 'no-store',
  });

  if (request.method === 'HEAD') {
    response.end();
    return;
  }

  createReadStream(filePath).pipe(response);
});

server.listen(PORT, HOST, () => {
  console.log(`serve-export: ${OUT_ROOT} at http://${HOST}:${PORT}${PREFIX}/`);
});
