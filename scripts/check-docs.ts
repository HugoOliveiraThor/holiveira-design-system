import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * Documentation link check.
 *
 * Verifies, without network access by default:
 *  1. every relative link/image in the tracked docs resolves to a file or directory;
 *  2. the canonical GitHub Pages URLs are present where they must be;
 *  3. the legacy (dead) repository URL is gone.
 *
 * With `--remote`, it also sends a HEAD request to each canonical URL and fails on non-2xx
 * responses. Remote checks stay out of `all-checks` on purpose: CI network is a flake source.
 *
 * Exit codes: 0 = all checks passed, 1 = at least one finding, 2 = structural error.
 */

export const DOC_FILES = [
  'README.md',
  'CONTRIBUTING.md',
  'CHANGELOG.md',
  'apps/storybook/stories/GettingStarted.mdx',
];

export const CANONICAL = {
  storybook: 'https://hugooliveirathor.github.io/holiveira-design-system/',
  gettingStarted:
    'https://hugooliveirathor.github.io/holiveira-design-system/?path=/docs/getting-started--docs',
  playground: 'https://hugooliveirathor.github.io/holiveira-design-system/playground/',
  docs: 'https://hugooliveirathor.github.io/holiveira-design-system/docs/',
  repository: 'https://github.com/HugoOliveiraThor/holiveira-design-system',
  issues: 'https://github.com/HugoOliveiraThor/holiveira-design-system/issues',
} as const;

/** URLs that must appear in each document. */
export const REQUIRED: Record<string, Array<keyof typeof CANONICAL>> = {
  'README.md': ['storybook', 'gettingStarted', 'playground', 'docs', 'repository'],
  'CONTRIBUTING.md': ['storybook', 'playground'],
  'CHANGELOG.md': [],
  'apps/storybook/stories/GettingStarted.mdx': ['storybook', 'playground', 'docs', 'repository'],
};

export const LEGACY_PATTERNS = ['hugoluisvieira', 'HugoOliveiraThor.github.io'];

export interface Finding {
  file: string;
  kind: 'missing-link' | 'missing-url' | 'legacy' | 'remote';
  detail: string;
}

export interface DocsCheckReport {
  findings: Finding[];
  missingFiles: string[];
}

function stripSuffix(target: string): string {
  const hash = target.indexOf('#');
  const withoutHash = hash === -1 ? target : target.slice(0, hash);
  const query = withoutHash.indexOf('?');
  return query === -1 ? withoutHash : withoutHash.slice(0, query);
}

function extractRelativeLinks(content: string): string[] {
  const links: string[] = [];
  const markdown = /!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  const html = /(?:src|href)="([^"]+)"/g;

  for (const match of content.matchAll(markdown)) {
    const target = match[1];
    if (!target.startsWith('http') && !target.startsWith('#') && !target.startsWith('mailto:')) {
      links.push(target);
    }
  }
  for (const match of content.matchAll(html)) {
    const target = match[1];
    if (!/^(?:https?:|mailto:|#|data:)/.test(target)) {
      links.push(target);
    }
  }
  return links;
}

function checkRelativeLinks(
  root: string,
  file: string,
  content: string,
  options: CheckOptions,
): Finding[] {
  const findings: Finding[] = [];
  const base = dirname(join(root, file));
  for (const raw of extractRelativeLinks(content)) {
    const target = stripSuffix(raw);
    if (target.length === 0) continue;
    const absolute = resolve(base, decodeURIComponent(target));
    if (!existsSync(absolute)) {
      findings.push({ file, kind: 'missing-link', detail: raw });
    } else if (options.verbose === true) {
      const kind = statSync(absolute).isDirectory() ? 'dir' : 'file';
      console.log(`  ok  ${file} -> ${raw} (${kind})`);
    }
  }
  return findings;
}

export interface CheckOptions {
  /** Print every link that resolves. */
  verbose?: boolean;
}

/**
 * Every file-reading check, with `root` as the repository root. It only reads:
 * relative links, the required canonical URLs and the legacy patterns come from
 * the documents under `root`; the remote check stays in the CLI.
 */
export function checkDocuments(root: string, options: CheckOptions = {}): DocsCheckReport {
  const findings: Finding[] = [];
  const missingFiles: string[] = [];

  for (const file of DOC_FILES) {
    const absolute = join(root, file);
    if (!existsSync(absolute)) {
      missingFiles.push(file);
    }
  }
  if (missingFiles.length > 0) return { findings, missingFiles };

  for (const file of DOC_FILES) {
    const content = readFileSync(join(root, file), 'utf8');
    findings.push(...checkRelativeLinks(root, file, content, options));

    for (const key of REQUIRED[file] ?? []) {
      if (!content.includes(CANONICAL[key])) {
        findings.push({ file, kind: 'missing-url', detail: CANONICAL[key] });
      }
    }

    for (const legacy of LEGACY_PATTERNS) {
      if (content.includes(legacy)) {
        findings.push({ file, kind: 'legacy', detail: legacy });
      }
    }
  }

  return { findings, missingFiles };
}

const ROOT = join(__dirname, '..');
const REMOTE = process.argv.includes('--remote');
const VERBOSE = process.env.CHECK_VERBOSE === 'true';

async function checkRemote(url: string): Promise<Finding | undefined> {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(15_000),
    });
    if (response.ok) {
      if (VERBOSE) console.log(`  ok  ${url} -> ${response.status}`);
      return undefined;
    }
    return { file: '<remote>', kind: 'remote', detail: `${url} -> ${response.status}` };
  } catch (error) {
    return {
      file: '<remote>',
      kind: 'remote',
      detail: `${url} -> ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

async function main(): Promise<number> {
  const report = checkDocuments(ROOT, { verbose: VERBOSE });

  for (const file of report.missingFiles) {
    console.error(`FAIL structural: missing documentation file ${file}`);
  }
  if (report.missingFiles.length > 0) return 2;

  const findings = [...report.findings];
  if (REMOTE) {
    for (const url of new Set(Object.values(CANONICAL))) {
      const finding = await checkRemote(url);
      if (finding !== undefined) findings.push(finding);
    }
  }

  for (const finding of findings) {
    console.error(`FAIL ${finding.kind}: ${finding.file} — ${finding.detail}`);
  }

  if (findings.length > 0) {
    console.error(`\ncheck:docs — ${findings.length} finding(s)`);
    return 1;
  }

  const requiredUrls = Object.values(REQUIRED).reduce((total, keys) => total + keys.length, 0);
  console.log(
    `check:docs — ${DOC_FILES.length} documents, ${requiredUrls} canonical URLs required, ` +
      `all links resolve${REMOTE ? ', remote OK' : ''}`,
  );
  return 0;
}

const invokedDirectly =
  process.argv[1] !== undefined && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (invokedDirectly) {
  main()
    .then((code) => process.exit(code))
    .catch((error: unknown) => {
      console.error(`FAIL structural: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(2);
    });
}
