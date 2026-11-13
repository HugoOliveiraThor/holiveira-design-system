import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const NEXT_ASSET = /(?:src|href)="([^"]*\/_next\/[^"]*)"/g;

export function findAssetViolations(html: string, basePath: string): string[] {
  const prefix = `${basePath.replace(/\/+$/, '')}/_next/`;

  return Array.from(html.matchAll(NEXT_ASSET))
    .map((match) => match[1])
    .filter((url) => !url.startsWith(prefix));
}

export interface ExportCheckResult {
  ok: boolean;
  missingIndex: boolean;
  violations: Array<{ file: string; url: string }>;
}

export function assertDocsExport(outDir: string, basePath: string): ExportCheckResult {
  const indexPath = join(outDir, 'index.html');
  if (!existsSync(indexPath)) {
    return { ok: false, missingIndex: true, violations: [] };
  }

  const violations: ExportCheckResult['violations'] = [];
  for (const file of listHtmlFiles(outDir)) {
    const html = readFileSync(file, 'utf8');
    for (const url of findAssetViolations(html, basePath)) {
      violations.push({ file, url });
    }
  }

  return { ok: violations.length === 0, missingIndex: false, violations };
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
