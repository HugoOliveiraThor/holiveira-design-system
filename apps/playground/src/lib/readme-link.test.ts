import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

const REPO_ROOT = process.cwd();
const PLAYGROUND_URL = 'https://HugoOliveiraThor.github.io/holiveira-design-system/playground/';

interface PackageManifest {
  private?: boolean;
}

function publicPackageNames(): string[] {
  return readdirSync(join(REPO_ROOT, 'packages'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => {
      const manifest = JSON.parse(
        readFileSync(join(REPO_ROOT, 'packages', name, 'package.json'), 'utf8'),
      ) as PackageManifest;
      return manifest.private !== true;
    })
    .sort();
}

describe('README links', () => {
  it('links the playground from every README', () => {
    const packages = publicPackageNames();
    expect(packages).toHaveLength(16);

    const readmes = [
      join(REPO_ROOT, 'README.md'),
      ...packages.map((name) => join(REPO_ROOT, 'packages', name, 'README.md')),
    ];
    expect(readmes).toHaveLength(17);

    for (const readme of readmes) {
      expect(readFileSync(readme, 'utf8'), readme).toContain(`[Playground](${PLAYGROUND_URL})`);
    }
  });
});
