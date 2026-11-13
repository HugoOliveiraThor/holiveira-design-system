import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import {
  MISSING_INDEX_MESSAGE,
  assertDocsExport,
  findAssetViolations,
  findPrivateImports,
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
