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

export interface ExportCheck {
  id: string;
  label: string;
  pass: boolean;
}

export interface ExportCheckReport {
  checks: ExportCheck[];
  result: ExportCheckResult;
}

export interface ExportCheckSummary {
  failed: ExportCheck[];
  exitCode: number;
}

function readIfExists(path: string): string {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

function listSourceFiles(root: string): string[] {
  const files = [
    join(root, 'site.config.ts'),
    join(root, 'next.config.ts'),
    join(root, 'scripts', 'check-export.ts'),
  ];
  const sourceDir = join(root, 'src');
  if (existsSync(sourceDir)) files.push(...walk(sourceDir));
  return files.filter(
    (file) => /\.(ts|tsx)$/.test(file) && !/\.test\.(ts|tsx)$/.test(file) && existsSync(file),
  );
}

function walk(directory: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(directory)) {
    const full = join(directory, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

/**
 * Every assertion about the built portal, evaluated from the documents and
 * sources under `root`. Pure: it only reads, so the CLI decides how to report.
 *
 * `DOCS-07`, `DOCS-10` and `DOCS-13` describe the portal that ships (title and
 * pre-release status, the shell landmarks, the theme stylesheet and `cn`), not
 * the M12.1 placeholder shell.
 */
export function exportChecks(root: string, basePath: string): ExportCheckReport {
  const outDir = join(root, 'out');
  const result = assertDocsExport(outDir, basePath);
  const indexHtml = readIfExists(join(outDir, 'index.html'));
  const packageJson = JSON.parse(readIfExists(join(root, 'package.json')) || '{}') as {
    name?: string;
    private?: boolean;
    dependencies?: Record<string, string>;
  };
  const nextConfig = readIfExists(join(root, 'next.config.ts'));
  const globalsCss = readIfExists(join(root, 'src', 'app', 'globals.css'));
  const sources = listSourceFiles(root).map((file) => ({ file, text: readIfExists(file) }));
  const privateImports = sources.flatMap((source) => findPrivateImports(source.text));
  const privateLinked = PRIVATE_PACKAGES.some((pkg) =>
    existsSync(join(root, 'node_modules', '@ho-dev', pkg)),
  );
  const mainCount = (indexHtml.match(/<main(?=[\s>])/g) ?? []).length;
  const h1Count = (indexHtml.match(/<h1(?=[\s>])/g) ?? []).length;

  const checks: ExportCheck[] = [
    {
      id: 'DOCS-01',
      label: 'package @ho-dev/docs is private',
      pass: packageJson.name === '@ho-dev/docs' && packageJson.private === true,
    },
    { id: 'DOCS-02', label: 'out/index.html exists', pass: result.missingIndex === false },
    { id: 'DOCS-03', label: 'all _next assets prefixed', pass: result.violations.length === 0 },
    {
      id: 'DOCS-04',
      label: 'basePath and trailingSlash configured',
      pass:
        nextConfig.includes('basePath: DOCS_BASE_PATH') &&
        nextConfig.includes('trailingSlash: true'),
    },
    {
      id: 'DOCS-05',
      label: 'exported routes use index.html',
      pass: result.missingIndex === false && result.nonIndexHtml.length === 0,
    },
    { id: 'DOCS-06', label: 'no private package imports', pass: privateImports.length === 0 },
    {
      id: 'DOCS-07',
      label: 'portal title and pre-release status present',
      pass:
        indexHtml.includes('Holiveira Documentation Platform') &&
        indexHtml.includes('pre-release') &&
        !indexHtml.includes('under construction'),
    },
    { id: 'DOCS-08', label: 'shell language is en', pass: indexHtml.includes('<html lang="en"') },
    {
      id: 'DOCS-09',
      label: 'main, h1 and lang landmarks present',
      pass: mainCount === 1 && h1Count === 1 && indexHtml.includes('<html lang="en"'),
    },
    {
      id: 'DOCS-10',
      label: 'header, sidebar and search landmarks present',
      pass:
        /<header[\s>]/.test(indexHtml) &&
        /<aside[\s>]/.test(indexHtml) &&
        /(?:type="search"|aria-label="Search"|>Search<)/.test(indexHtml),
    },
    {
      id: 'DOCS-11',
      label: 'no npm installation claim',
      pass: !/\bnpm\s+(?:install|i)\b|\bpnpm\s+(?:add|install)\b|\byarn\s+add\b|\bbun\s+add\b/.test(
        indexHtml,
      ),
    },
    {
      id: 'DOCS-12',
      label: 'workspace dependencies declared',
      pass:
        packageJson.dependencies?.['@ho-dev/theme'] === 'workspace:*' &&
        packageJson.dependencies?.['@ho-dev/utils'] === 'workspace:*',
    },
    {
      id: 'DOCS-13',
      label: 'theme CSS and cn consumed',
      pass: /theme\.css/.test(globalsCss) && sources.some((source) => source.text.includes('cn(')),
    },
    {
      id: 'DOCS-14',
      label: 'transpilePackages lists theme and utils',
      pass: nextConfig.includes('@ho-dev/theme') && nextConfig.includes('@ho-dev/utils'),
    },
    {
      id: 'DOCS-21',
      label: 'no private package import in source',
      pass: privateImports.length === 0 && !privateLinked,
    },
  ];

  return { checks, result };
}

/** One printable line per check, in the order the CLI lists them. */
export function formatExportChecks(checks: ExportCheck[]): string[] {
  return checks.map((check) => `${check.pass ? '✓' : '✗'} ${check.id} ${check.label}`);
}

export function summarizeExportChecks(checks: ExportCheck[]): ExportCheckSummary {
  const failed = checks.filter((check) => !check.pass);
  return { failed, exitCode: failed.length === 0 ? 0 : 1 };
}
