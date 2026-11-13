import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { DOCS_BASE_PATH } from '../site.config';
import { assertDocsExport } from '../src/lib/export-check';

const root = process.cwd();
const outDir = join(root, 'out');
const result = assertDocsExport(outDir, DOCS_BASE_PATH);
const indexPath = join(outDir, 'index.html');
const indexHtml = existsSync(indexPath) ? readFileSync(indexPath, 'utf8') : '';
const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as {
  name?: string;
  private?: boolean;
  dependencies?: Record<string, string>;
};
const nextConfig = readFileSync(join(root, 'next.config.ts'), 'utf8');
const globalsCss = readFileSync(join(root, 'src/app/globals.css'), 'utf8');
const pageSource = readFileSync(join(root, 'src/app/page.tsx'), 'utf8');
const sourceText = walk(join(root, 'src'))
  .filter((file) => file.endsWith('.ts') || file.endsWith('.tsx'))
  .map((file) => readFileSync(file, 'utf8'))
  .join('\n');
const privateImport = /from\s+['"]@ho-dev\/(auth|api|db|testing)['"]/;

const checks = [
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
    pass: nextConfig.includes('DOCS_BASE_PATH') && nextConfig.includes('trailingSlash: true'),
  },
  {
    id: 'DOCS-05',
    label: 'exported route contains index.html',
    pass: result.missingIndex === false,
  },
  { id: 'DOCS-06', label: 'no private package imports', pass: !privateImport.test(sourceText) },
  {
    id: 'DOCS-07',
    label: 'placeholder title and status present',
    pass:
      indexHtml.includes('Holiveira Documentation Platform') &&
      indexHtml.includes('under construction'),
  },
  { id: 'DOCS-08', label: 'shell language is en', pass: indexHtml.includes('<html lang="en"') },
  {
    id: 'DOCS-09',
    label: 'main, h1 and lang landmarks present',
    pass:
      indexHtml.includes('<main') &&
      indexHtml.includes('<h1') &&
      indexHtml.includes('<html lang="en"'),
  },
  {
    id: 'DOCS-10',
    label: 'no header/sidebar/search',
    pass: !/<header|<aside|<nav|role="search"|type="search"/.test(indexHtml),
  },
  {
    id: 'DOCS-11',
    label: 'no npm installation claim',
    pass: !/npm install|pnpm add/.test(indexHtml),
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
    pass: globalsCss.includes('@ho-dev/theme/theme.css') && pageSource.includes('cn('),
  },
  {
    id: 'DOCS-14',
    label: 'transpilePackages lists theme and utils',
    pass: nextConfig.includes('@ho-dev/theme') && nextConfig.includes('@ho-dev/utils'),
  },
  {
    id: 'DOCS-21',
    label: 'no private package import in source',
    pass: !privateImport.test(sourceText),
  },
];

let failed = false;
for (const check of checks) {
  console.log(`${check.pass ? '✓' : '✗'} ${check.id} ${check.label}`);
  if (!check.pass) {
    failed = true;
  }
}

if (result.missingIndex) {
  console.error('out/index.html not found. Run: pnpm --filter @ho-dev/docs build');
  failed = true;
}

if (result.violations.length > 0) {
  for (const violation of result.violations) {
    console.error(`  ${violation.file}: ${violation.url}`);
  }
  failed = true;
}

if (failed) {
  process.exit(1);
}

function walk(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}
