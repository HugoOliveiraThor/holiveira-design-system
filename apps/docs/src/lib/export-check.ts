import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';

const NEXT_ASSET = /(?:src|href)=["']([^"']*\/_next\/[^"']*)["']/g;

export const PRIVATE_PACKAGES = ['auth', 'api', 'db', 'testing'] as const;

const PRIVATE_IMPORT = new RegExp(
  `(?:from\\s*|import\\s*|require\\(\\s*)['"]@ho-dev/(${PRIVATE_PACKAGES.join('|')})(?:/[^'"]*)?['"]`,
  'g',
);

export const MISSING_INDEX_MESSAGE =
  'out/index.html not found. Run: pnpm --filter @ho-dev/docs build';

export function findAssetViolations(html: string, basePath: string): string[] {
  const prefix = `${basePath.replace(/\/+$/, '')}/_next/`;

  return Array.from(html.matchAll(NEXT_ASSET))
    .map((match) => match[1])
    .filter((url) => !url.startsWith(prefix));
}

export function findPrivateImports(source: string): string[] {
  return Array.from(source.matchAll(PRIVATE_IMPORT)).map((match) => match[0]);
}

export interface ExportCheckResult {
  ok: boolean;
  missingIndex: boolean;
  message?: string;
  violations: Array<{ file: string; url: string }>;
  nonIndexHtml: string[];
}

export function assertDocsExport(outDir: string, basePath: string): ExportCheckResult {
  const indexPath = join(outDir, 'index.html');
  if (!existsSync(indexPath)) {
    return {
      ok: false,
      missingIndex: true,
      message: MISSING_INDEX_MESSAGE,
      violations: [],
      nonIndexHtml: [],
    };
  }

  const violations: ExportCheckResult['violations'] = [];
  const nonIndexHtml: string[] = [];
  for (const file of listHtmlFiles(outDir)) {
    const name = basename(file);
    if (name !== 'index.html' && name !== '404.html') {
      nonIndexHtml.push(file);
    }
    const html = readFileSync(file, 'utf8');
    for (const url of findAssetViolations(html, basePath)) {
      violations.push({ file, url });
    }
  }

  return {
    ok: violations.length === 0 && nonIndexHtml.length === 0,
    missingIndex: false,
    violations,
    nonIndexHtml,
  };
}

function listHtmlFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...listHtmlFiles(full));
    } else if (entry.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}
