import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { assertDocsExport, findAssetViolations } from './export-check';

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

  it('reports a missing index', () => {
    const root = mkdtempSync(join(tmpdir(), 'ho-docs-export-'));
    const outDir = join(root, 'out');

    try {
      const result = assertDocsExport(outDir, BASE);

      expect(result.ok).toBe(false);
      expect(result.missingIndex).toBe(true);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});
