import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

const REPO_ROOT = process.cwd();

describe('Pages workflow', () => {
  it('deploys Storybook and playground together', () => {
    const workflow = readFileSync(join(REPO_ROOT, '.github', 'workflows', 'pages.yml'), 'utf8');

    expect(workflow).toMatch(/push:\s*\n\s*branches: \[main\]/);
    expect(workflow).toContain('workflow_dispatch:');

    const buildStep = workflow.search(/^\s*pnpm run build\s*$/m);
    expect(buildStep).toBeGreaterThan(-1);
    expect(workflow).toContain('pnpm run build:storybook');
    expect(workflow).toContain('mkdir -p storybook-static/playground');
    expect(workflow).toContain('cp -R apps/playground/out/. storybook-static/playground/');
    expect(workflow).toContain('actions/upload-pages-artifact');
    expect(workflow).toMatch(
      /upload-pages-artifact@v\d+\s*\n\s*with:\s*\n\s*path: storybook-static/,
    );
    expect(workflow).toContain('actions/deploy-pages');

    const copyOut = workflow.indexOf('cp -R apps/playground/out/. storybook-static/playground/');
    const upload = workflow.indexOf('actions/upload-pages-artifact');
    const deploy = workflow.indexOf('actions/deploy-pages');

    expect(copyOut, 'copies out/ into storybook-static/playground').toBeGreaterThan(buildStep);
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
});
