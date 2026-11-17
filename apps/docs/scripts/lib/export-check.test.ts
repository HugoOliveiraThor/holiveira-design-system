import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import {
  MISSING_INDEX_MESSAGE,
  assertDocsExport,
  exportChecks,
  findAssetViolations,
  findPrivateImports,
  formatExportChecks,
  summarizeExportChecks,
  type ExportCheck,
} from './export-check';

const BASE = '/holiveira-design-system/docs';

describe('export-check', () => {
  it('accepts prefixed assets', () => {
    const html = `<script src="${BASE}/_next/static/app.js"></script>`;

    expect(findAssetViolations(html, BASE)).toEqual([]);
  });

  it('flags root-relative _next', () => {
    const html = '<script src="/_next/static/app.js"></script>';

    expect(findAssetViolations(html, BASE)).toEqual(['/_next/static/app.js']);
  });

  it('flags a wrong prefix', () => {
    const html = '<link href="/other/_next/static/app.css" rel="stylesheet">';

    expect(findAssetViolations(html, BASE)).toEqual(['/other/_next/static/app.css']);
  });

  it('flags single-quoted root-relative _next', () => {
    const html = "<script src='/_next/static/app.js'></script>";

    expect(findAssetViolations(html, BASE)).toEqual(['/_next/static/app.js']);
  });

  it('reports nested non-index HTML files', () => {
    const root = mkdtempSync(join(tmpdir(), 'ho-docs-export-'));
    const outDir = join(root, 'out');
    const routeDir = join(outDir, 'guide');

    try {
      mkdirSync(routeDir, { recursive: true });
      writeFileSync(join(outDir, 'index.html'), '<html></html>');
      writeFileSync(join(routeDir, 'page.html'), '<html></html>');

      const result = assertDocsExport(outDir, BASE);

      expect(result.nonIndexHtml).toHaveLength(1);
      expect(result.nonIndexHtml[0].endsWith(join('guide', 'page.html'))).toBe(true);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it('reports the missing-index build command', () => {
    const root = mkdtempSync(join(tmpdir(), 'ho-docs-export-'));
    const outDir = join(root, 'out');

    try {
      const result = assertDocsExport(outDir, BASE);

      expect(result.ok).toBe(false);
      expect(result.missingIndex).toBe(true);
      expect(result.message).toBe(MISSING_INDEX_MESSAGE);
      expect(result.message).toContain('pnpm --filter @ho-dev/docs build');
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it('flags side-effect private imports', () => {
    expect(findPrivateImports("import '@ho-dev/testing';")).toHaveLength(1);
  });

  it('flags private subpath imports', () => {
    expect(findPrivateImports("import { x } from '@ho-dev/db/client';")).toHaveLength(1);
  });

  it('accepts public package imports', () => {
    expect(findPrivateImports("import { cn } from '@ho-dev/utils';")).toEqual([]);
  });
});

const PACKAGE_JSON = {
  name: '@ho-dev/docs',
  private: true,
  dependencies: { '@ho-dev/theme': 'workspace:*', '@ho-dev/utils': 'workspace:*' },
};

const NEXT_CONFIG = `import { DOCS_BASE_PATH } from './site.config';

const nextConfig = {
  basePath: DOCS_BASE_PATH,
  trailingSlash: true,
  transpilePackages: ['@ho-dev/theme', '@ho-dev/utils'],
};

export default nextConfig;
`;

const GLOBALS_CSS = `@import '../../../../packages/theme/src/theme.css';\n`;

const PAGE_TSX = `import { cn } from '@ho-dev/utils';

export const label = cn('text-sm', 'font-semibold');
`;

const PORTAL_HTML = [
  '<!DOCTYPE html><html lang="en"><head>',
  `<script src="${BASE}/_next/static/app.js"></script>`,
  '<title>Holiveira Documentation Platform</title></head><body>',
  '<header class="shell"><a href="/portal/">Holiveira Docs</a><span>pre-release</span>',
  '<button type="button" aria-controls="docs-search-dialog">Search<kbd>/</kbd></button></header>',
  '<aside class="sidebar"><nav aria-label="Documentation"><a href="/portal/">Packages</a></nav></aside>',
  '<main><h1>Holiveira Documentation Platform</h1></main>',
  '</body></html>',
].join('');

const SHELL_LESS_HTML = [
  '<!DOCTYPE html><html lang="en"><head>',
  '<title>Holiveira Documentation Platform</title></head><body>',
  '<main><h1>Holiveira Documentation Platform</h1><p>pre-release</p></main>',
  '</body></html>',
].join('');

const docsRoots: string[] = [];

interface DocsFixture {
  html?: string;
  globalsCss?: string;
  pageTsx?: string;
}

/** A minimal portal tree: the built export plus the sources the checks read. */
function createDocsRoot(options: DocsFixture = {}): string {
  const root = mkdtempSync(join(tmpdir(), 'ho-docs-checks-'));
  docsRoots.push(root);
  mkdirSync(join(root, 'out'), { recursive: true });
  mkdirSync(join(root, 'src', 'app'), { recursive: true });
  writeFileSync(join(root, 'package.json'), JSON.stringify(PACKAGE_JSON));
  writeFileSync(join(root, 'next.config.ts'), NEXT_CONFIG);
  writeFileSync(join(root, 'src', 'app', 'globals.css'), options.globalsCss ?? GLOBALS_CSS);
  writeFileSync(join(root, 'src', 'app', 'page.tsx'), options.pageTsx ?? PAGE_TSX);
  writeFileSync(join(root, 'out', 'index.html'), options.html ?? PORTAL_HTML);
  return root;
}

function checkById(checks: ExportCheck[], id: string): ExportCheck {
  const found = checks.find((check) => check.id === id);
  if (found === undefined) throw new Error(`check ${id} is missing`);
  return found;
}

describe('portal export checks', () => {
  it('checks the current portal instead of the empty shell', () => {
    const root = createDocsRoot();

    const report = exportChecks(root, BASE);

    expect(readFileSync(join(root, 'out', 'index.html'), 'utf8')).not.toContain(
      'under construction',
    );
    expect(checkById(report.checks, 'DOCS-07').pass).toBe(true);
    expect(checkById(report.checks, 'DOCS-10').pass).toBe(true);
    expect(checkById(report.checks, 'DOCS-13').pass).toBe(true);
    expect(report.checks.filter((check) => !check.pass)).toEqual([]);
    expect(report.result.ok).toBe(true);
  });

  it('fails DOCS-07 without the portal title and pre-release status', () => {
    const root = createDocsRoot({
      html: PORTAL_HTML.replace('</main>', '<p>under construction</p></main>'),
    });

    const report = exportChecks(root, BASE);

    expect(checkById(report.checks, 'DOCS-07').pass).toBe(false);
    expect(checkById(report.checks, 'DOCS-10').pass).toBe(true);
  });

  it('fails DOCS-10 without the shell landmarks', () => {
    const root = createDocsRoot({ html: SHELL_LESS_HTML });

    const report = exportChecks(root, BASE);

    expect(checkById(report.checks, 'DOCS-10').pass).toBe(false);
    expect(checkById(report.checks, 'DOCS-07').pass).toBe(true);
  });

  it('fails DOCS-13 without the theme stylesheet and cn usage', () => {
    const root = createDocsRoot({
      globalsCss: 'body { color: black; }',
      pageTsx: 'export const label = 1;',
    });

    const report = exportChecks(root, BASE);

    expect(checkById(report.checks, 'DOCS-13').pass).toBe(false);
  });

  it('lists the failed checks and exits non-zero', () => {
    const root = createDocsRoot({
      html: SHELL_LESS_HTML,
      globalsCss: 'body { color: black; }',
      pageTsx: 'export const label = 1;',
    });

    const report = exportChecks(root, BASE);
    const summary = summarizeExportChecks(report.checks);
    const lines = formatExportChecks(report.checks);

    expect(summary.exitCode).toBe(1);
    expect(summary.failed.map((check) => check.id)).toEqual(['DOCS-10', 'DOCS-13']);
    expect(lines).toContain('✗ DOCS-10 header, sidebar and search landmarks present');
    expect(lines).toContain('✓ DOCS-07 portal title and pre-release status present');
  });
});
