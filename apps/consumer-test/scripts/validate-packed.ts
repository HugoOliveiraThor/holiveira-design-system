import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const consumerDir = resolve(__dirname, '..');
const rootDir = resolve(consumerDir, '..', '..');
const packagesDir = join(rootDir, 'packages');
const stagingDir = join(consumerDir, '.packed');
const verbose = process.env.CHECK_VERBOSE === 'true';

const PUBLIC_PACKAGES = [
  'charts',
  'config',
  'constants',
  'forms',
  'hooks',
  'i18n',
  'icons',
  'layouts',
  'primitives',
  'providers',
  'theme',
  'tokens',
  'types',
  'ui',
  'utils',
];

const PEER_DEPS = {
  react: '^19.0.0',
  'react-dom': '^19.0.0',
  next: '16.2.10',
  'next-themes': '^0.4.0',
  'react-hook-form': '^7.0.0',
  zod: '^4.0.0',
  apexcharts: '^4.0.0',
  flatpickr: '^4.6.0',
  'react-apexcharts': '^1.7.0',
};

let failures = 0;
let tempDir = '';

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
  return execSync(cmd, {
    cwd,
    encoding: 'utf-8',
    stdio: verbose ? 'inherit' : 'pipe',
    shell: '/bin/bash',
  });
}

console.log('Pack + Install Validation (external consumer)\n');

check('pack all public packages', () => {
  rmSync(stagingDir, { recursive: true, force: true });
  mkdirSync(stagingDir, { recursive: true });
  for (const name of PUBLIC_PACKAGES) {
    const pkgDir = join(packagesDir, name);
    if (!existsSync(join(pkgDir, 'dist'))) {
      throw new Error(`Missing dist/ for @ho-dev/${name} — run build first`);
    }
    shell(`pnpm pack --pack-destination ${stagingDir}`, pkgDir);
  }
  const tgzs = readdirSync(stagingDir).filter((f) => f.endsWith('.tgz'));
  if (tgzs.length !== PUBLIC_PACKAGES.length) {
    throw new Error(`Expected ${PUBLIC_PACKAGES.length} tarballs, found ${tgzs.length}`);
  }
});

function tarballFor(name: string) {
  const match = readdirSync(stagingDir).find(
    (f) => f.endsWith('.tgz') && f.startsWith(`ho-dev-${name}-`),
  );
  if (!match) throw new Error(`Tarball not found for @ho-dev/${name}`);
  return join(stagingDir, match);
}

function makeTempProject() {
  tempDir = join(tmpdir(), `ho-dev-install-${Date.now()}`);
  mkdirSync(tempDir, { recursive: true });
  mkdirSync(join(tempDir, 'src'), { recursive: true });
  mkdirSync(join(tempDir, 'app'), { recursive: true });

  writeFileSync(
    join(tempDir, 'package.json'),
    JSON.stringify(
      {
        name: 'ho-dev-install-smoke',
        version: '0.0.0',
        private: true,
        type: 'module',
        dependencies: Object.fromEntries(
          PUBLIC_PACKAGES.map((name) => [`@ho-dev/${name}`, `file:${tarballFor(name)}`]),
        ),
        peerDependencies: PEER_DEPS,
        devDependencies: {
          ...PEER_DEPS,
          typescript: '^5.0.0',
          '@types/react': '^19.0.0',
          '@types/react-dom': '^19.0.0',
          '@types/node': '^22.0.0',
          tailwindcss: '^4.0.0',
          '@tailwindcss/postcss': '^4.0.0',
        },
        scripts: {
          typecheck: 'tsc --noEmit',
          build: 'next build',
        },
      },
      null,
      2,
    ),
  );

  writeFileSync(
    join(tempDir, 'tsconfig.json'),
    JSON.stringify(
      {
        compilerOptions: {
          lib: ['dom', 'dom.iterable', 'esnext'],
          skipLibCheck: true,
          strict: true,
          esModuleInterop: true,
          module: 'esnext',
          moduleResolution: 'bundler',
          resolveJsonModule: true,
          isolatedModules: true,
          target: 'ES2018',
          jsx: 'react-jsx',
          noEmit: true,
        },
        include: ['src'],
      },
      null,
      2,
    ),
  );

  writeFileSync(
    join(tempDir, 'pnpm-workspace.yaml'),
    `packages:\n  - '.'\nallowBuilds:\n  sharp: true\noverrides:\n${PUBLIC_PACKAGES.map(
      (name) => `  '@ho-dev/${name}': 'file:${tarballFor(name)}'`,
    ).join('\n')}\n`,
  );

  writeFileSync(
    join(tempDir, 'next.config.mjs'),
    'const nextConfig = {};\nexport default nextConfig;\n',
  );
  writeFileSync(
    join(tempDir, 'postcss.config.mjs'),
    "export default { plugins: { '@tailwindcss/postcss': {} } };\n",
  );
  writeFileSync(
    join(tempDir, 'next-env.d.ts'),
    '/// <reference types="next" />\n/// <reference types="next/image-types/global" />\n',
  );
}

check('create clean temp project', () => {
  makeTempProject();
  if (!existsSync(tempDir)) throw new Error('temp dir not created');
});

check('install tarballs in clean project', () => {
  shell('pnpm install --no-frozen-lockfile', tempDir);
});

const IMPORT_FILE = `
'use client';

import { Button, InputGroup, OTPInput } from '@ho-dev/primitives';
import { Card, PageHeader } from '@ho-dev/ui';
import { ArrowLeftIcon } from '@ho-dev/icons';
import { ThemeProvider } from '@ho-dev/theme';
import { useIsMobile } from '@ho-dev/hooks';
import { Sidebar, SidebarProvider } from '@ho-dev/layouts';
import { AreaChart } from '@ho-dev/charts';
import { ProviderComposer } from '@ho-dev/providers';
import { Form } from '@ho-dev/forms';
import { formatCurrency } from '@ho-dev/i18n';
import { PAGE_SIZE } from '@ho-dev/constants';
import { cn } from '@ho-dev/utils';
import { appConfig } from '@ho-dev/config';
import type { DeepPartial } from '@ho-dev/types';
import '@ho-dev/theme/theme.css';
import '@ho-dev/tokens/tokens.css';

export function InstallSmoke() {
  const isMobile = useIsMobile();
  void isMobile;
  return (
    <ThemeProvider>
      <PageHeader title="Install Smoke" />
      <Card>
        <Button>Hello</Button>
        <InputGroup label="Email" />
        <OTPInput length={6} />
        <ArrowLeftIcon />
      </Card>
      <SidebarProvider>
        <Sidebar>nav</Sidebar>
      </SidebarProvider>
      <AreaChart label="Revenue" series={[{ name: 'Sales', data: [{ x: 'Jan', y: 10 }] }]} />
      <ProviderComposer tree={[]}>{null}</ProviderComposer>
      <Form onSubmit={() => {}}>submit</Form>
    </ThemeProvider>
  );
}

void formatCurrency;
void PAGE_SIZE;
void cn;
void appConfig;
void (null as DeepPartial<unknown> | null);
`;

check('write imports from every package', () => {
  writeFileSync(join(tempDir, 'src', 'index.tsx'), IMPORT_FILE);
  writeFileSync(
    join(tempDir, 'app', 'page.tsx'),
    `import { InstallSmoke } from '../src/index';\nexport default function Page() {\n  return <InstallSmoke />;\n}\n`,
  );
  if (!existsSync(join(tempDir, 'src', 'index.tsx'))) throw new Error('import file not written');
});

check('typecheck with installed tarballs', () => {
  shell('pnpm exec tsc --noEmit', tempDir);
});

check('next build with installed tarballs', () => {
  shell('npx next build', tempDir);
});

if (process.env.KEEP_TEMP !== 'true') {
  rmSync(tempDir, { recursive: true, force: true });
}

console.log(`\nPack+Install validation complete. ${failures} failure(s).`);
process.exit(failures > 0 ? 1 : 0);
