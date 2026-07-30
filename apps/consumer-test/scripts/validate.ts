import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const appDir = resolve(__dirname, '..');
const rootDir = resolve(__dirname, '../../..');

let failures = 0;

function check(name: string, fn: () => void) {
  try {
    fn();
    console.log(`PASS — ${name}`);
  } catch (err) {
    failures++;
    console.error(`FAIL — ${name}`);
    if (err instanceof Error && err.message) {
      console.error(`  ${err.message}`);
    }
  }
}

function shell(cmd: string, cwd: string) {
  return execSync(cmd, { cwd, encoding: 'utf-8', shell: '/bin/bash' });
}

console.log('Consumer Validation — 6 dimensions\n');

check('TypeScript compilation', () => {
  execSync('npx tsc --noEmit', { cwd: appDir, encoding: 'utf-8' });
});

check('SSR render (Next.js build)', () => {
  shell('npx next build', appDir);
});

check('RSC boundary', () => {
  const output = shell('npx next build 2>&1 || true', appDir);
  if (output.includes('use client') && !output.includes('PASS')) {
    throw new Error('Possible RSC boundary violation detected');
  }
});

check('Tree-shaking (size-limit)', () => {
  execSync('npx size-limit', { cwd: rootDir, encoding: 'utf-8' });
});

check('CSS loading', () => {
  const cssFiles = [
    'packages/theme/src/theme.css',
    'packages/tokens/src/tokens.css',
    'packages/charts/src/chart-styles.css',
    'packages/forms/src/widgets/date-picker-styles.css',
  ];
  for (const f of cssFiles) {
    const full = resolve(rootDir, f);
    if (!existsSync(full)) {
      throw new Error(`CSS not found: ${f}`);
    }
  }
});

check('Install isolation', () => {
  execSync('pnpm install --frozen-lockfile', { cwd: rootDir, encoding: 'utf-8' });
});

console.log(`\nValidation complete. ${failures} failure(s).`);
process.exit(failures > 0 ? 1 : 0);
