import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { orderViolations } from '../../../../scripts/lib/workflow-order';

const REPO_ROOT = process.cwd();

function pagesWorkflow(): string {
  return readFileSync(join(REPO_ROOT, '.github', 'workflows', 'pages.yml'), 'utf8');
}

/** The docs copy moved before the Storybook build: the order ADS-011 forbids. */
const REORDERED = [
  'steps:',
  '  - run: pnpm run build',
  '  - run: |',
  '      mkdir -p apps/storybook/storybook-static/docs',
  '      cp -R apps/docs/out/. apps/storybook/storybook-static/docs/',
  '  - run: pnpm run build:storybook',
  '  - run: cp -R apps/playground/out/. apps/storybook/storybook-static/playground/',
  '  - run: pnpm exec tsx scripts/check-artifact.ts --artifact apps/storybook/storybook-static',
  '  - uses: actions/upload-pages-artifact@v3',
].join('\n');

describe('Pages workflow', () => {
  it('deploys Storybook and playground together', () => {
    const workflow = readFileSync(join(REPO_ROOT, '.github', 'workflows', 'pages.yml'), 'utf8');

    expect(workflow).toMatch(/push:\s*\n\s*branches: \[main\]/);
    expect(workflow).toContain('workflow_dispatch:');

    const buildStep = workflow.search(/^\s*pnpm run build\s*$/m);
    expect(buildStep).toBeGreaterThan(-1);
    expect(workflow).toContain('pnpm run build:storybook');
    expect(workflow).toContain('mkdir -p apps/storybook/storybook-static/playground');
    expect(workflow).toContain(
      'cp -R apps/playground/out/. apps/storybook/storybook-static/playground/',
    );
    expect(workflow).toContain('actions/upload-pages-artifact');
    expect(workflow).toContain('path: apps/storybook/storybook-static');
    expect(workflow).toContain('actions/deploy-pages');

    const copyOut = workflow.indexOf(
      'cp -R apps/playground/out/. apps/storybook/storybook-static/playground/',
    );
    const upload = workflow.indexOf('actions/upload-pages-artifact');
    const deploy = workflow.indexOf('actions/deploy-pages');

    expect(copyOut, 'copies out/ into the storybook output').toBeGreaterThan(buildStep);
    expect(upload, 'uploads the artifact after copying the export').toBeGreaterThan(copyOut);
    expect(deploy, 'deploys after the artifact upload').toBeGreaterThan(upload);

    const rootPackage = JSON.parse(readFileSync(join(REPO_ROOT, 'package.json'), 'utf8')) as {
      scripts: Record<string, string>;
    };
    const allChecks = rootPackage.scripts['all-checks'];

    expect(allChecks).toContain(
      'pnpm run test:visual && pnpm --filter playground run test:visual &&',
    );
  });

  it('copies the portal after the storybook build', () => {
    const workflow = pagesWorkflow();

    expect(orderViolations(workflow)).toEqual([]);
    const storybook = workflow.indexOf('pnpm run build:storybook');
    const docsCopy = workflow.indexOf('cp -R apps/docs/out/.');
    expect(storybook).toBeGreaterThan(-1);
    expect(docsCopy).toBeGreaterThan(storybook);
  });

  it('copies the portal into the docs subpath', () => {
    const workflow = pagesWorkflow();

    expect(workflow).toContain('mkdir -p apps/storybook/storybook-static/docs');
    expect(workflow).toContain('cp -R apps/docs/out/. apps/storybook/storybook-static/docs/');
    expect(workflow).toContain('mkdir -p apps/storybook/storybook-static/playground');
    expect(workflow).toContain(
      'cp -R apps/playground/out/. apps/storybook/storybook-static/playground/',
    );
  });

  it('uploads after both copies', () => {
    const workflow = pagesWorkflow();
    const upload = workflow.indexOf('actions/upload-pages-artifact');

    expect(upload).toBeGreaterThan(workflow.indexOf('cp -R apps/playground/out/.'));
    expect(upload).toBeGreaterThan(workflow.indexOf('cp -R apps/docs/out/.'));
    expect(workflow).toContain('path: apps/storybook/storybook-static');
  });

  it('fails when the copy precedes the storybook build', () => {
    const violations = orderViolations(REORDERED);

    expect(violations.map((violation) => violation.detail)).toContain(
      'docs copy runs before build:storybook',
    );
    expect(violations.map((violation) => violation.action)).toContain('docs copy');
  });

  it('runs the smoke before the upload', () => {
    const workflow = pagesWorkflow();
    const smoke = workflow.indexOf(
      'scripts/check-artifact.ts --artifact apps/storybook/storybook-static',
    );
    const upload = workflow.indexOf('actions/upload-pages-artifact');

    expect(workflow).toContain(
      'pnpm exec tsx scripts/check-artifact.ts --artifact apps/storybook/storybook-static',
    );
    expect(smoke).toBeGreaterThan(workflow.indexOf('cp -R apps/docs/out/.'));
    expect(upload).toBeGreaterThan(smoke);
  });
});
