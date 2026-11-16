/**
 * One function per documentation rule.
 *
 * A rule reads the parsed docs, the virtual program or the export map and
 * returns findings with the file, the line and a message a human can act on.
 * No rule writes anything, and running the set twice yields the same list.
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';

import ts from 'typescript';

import { countStatements, publicApiNames, type MarkdownDoc } from './readme-markdown';
import {
  hasRuntimeExport,
  subpathResolves,
  type ExportMap,
  type ReadmeProgram,
} from './readme-program';

/** A single rule violation. */
export interface Finding {
  rule: RuleName;
  file: string;
  line: number;
  message: string;
}

export type RuleName =
  'compile' | 'import' | 'public-api' | 'missing-api' | 'counts' | 'duplicate-api' | 'paths';

/** Every rule the gate runs; used by the coverage test and the CLI checklist. */
export const RULES: RuleName[] = [
  'compile',
  'import',
  'public-api',
  'missing-api',
  'counts',
  'duplicate-api',
  'paths',
];

/** A cited repository path: a backticked token rooted at a known directory. */
const PATH_PATTERN =
  /^(?:packages|docs|apps|scripts|tests|reports|examples|\.github|\.changeset|\.husky|\.specs)\/[^\s`]+$/;

function flatten(message: ts.DiagnosticMessageChain | string): string {
  return ts.flattenDiagnosticMessageText(message, ' ');
}

/** Compile every covered block and report each diagnostic with its code. */
export function checkCompiles(program: ReadmeProgram): Finding[] {
  const findings: Finding[] = [];
  for (const block of program.blocks) {
    for (const diagnostic of program.diagnosticsFor(block.virtual)) {
      const line =
        diagnostic.start === undefined
          ? block.block.line
          : program.documentLineOf(block.virtual, diagnostic.start);
      findings.push({
        rule: 'compile',
        file: block.file,
        line,
        message: `TS${diagnostic.code}: ${flatten(diagnostic.messageText)}`,
      });
    }
  }
  return findings;
}

/** A named import must name an export of the package it imports from. */
export function checkImports(program: ReadmeProgram, exports: ExportMap): Finding[] {
  const findings: Finding[] = [];
  for (const block of program.blocks) {
    for (const imported of program.importsOf(block.virtual)) {
      if (imported.relative) {
        if (!imported.resolved) {
          findings.push({
            rule: 'import',
            file: block.file,
            line: imported.line,
            message: `relative import '${imported.module}' does not resolve`,
          });
        }
        continue;
      }

      const parts = imported.module.split('/');
      const packageName = `${parts[0]}/${parts[1]}`;
      if (parts.length > 2) {
        if (!subpathResolves(program.root, imported.module)) {
          findings.push({
            rule: 'import',
            file: block.file,
            line: imported.line,
            message: `subpath '${imported.module}' does not resolve in ${packageName}`,
          });
        }
        continue;
      }

      const packageExports = exports.get(packageName);
      if (packageExports === undefined) {
        findings.push({
          rule: 'import',
          file: block.file,
          line: imported.line,
          message: `unknown package '${packageName}'`,
        });
        continue;
      }
      for (const name of imported.names) {
        if (!packageExports.has(name)) {
          findings.push({
            rule: 'import',
            file: block.file,
            line: imported.line,
            message: `${packageName} does not export '${name}'`,
          });
        }
      }
    }
  }
  return findings;
}

/**
 * A documented identifier must exist in the barrel, and a package with runtime
 * exports must document a `## Public API` section with at least one name.
 */
export function checkPublicApi(docs: MarkdownDoc[], exports: ExportMap): Finding[] {
  const findings: Finding[] = [];

  for (const doc of docs) {
    if (doc.packageName === undefined) continue;
    const packageExports = exports.get(doc.packageName);
    if (packageExports === undefined) continue;
    const documented = publicApiNames(doc);
    const apiSection = doc.sections.find((section) => section.heading === 'Public API');
    const runtime = hasRuntimeExport(exports, doc.packageName);

    if (doc.kind === 'readme' && runtime) {
      if (apiSection === undefined) {
        findings.push({
          rule: 'missing-api',
          file: doc.file,
          line: 1,
          message: `${doc.packageName} exports runtime values but ${doc.file} has no '## Public API' section`,
        });
        continue;
      }
      if (documented.length === 0) {
        findings.push({
          rule: 'missing-api',
          file: doc.file,
          line: apiSection.line,
          message: `${doc.packageName} has a '## Public API' section that documents no identifier`,
        });
      }
    }

    for (const entry of documented) {
      if (!packageExports.has(entry.name)) {
        findings.push({
          rule: 'public-api',
          file: doc.file,
          line: entry.line,
          message: `${doc.packageName} does not export '${entry.name}' documented under Public API`,
        });
      }
    }
  }

  return findings;
}

/** A hard-coded export or component count drifts on the next export. */
export function checkCounts(docs: MarkdownDoc[]): Finding[] {
  const findings: Finding[] = [];
  for (const doc of docs) {
    for (const statement of countStatements(doc)) {
      findings.push({
        rule: 'counts',
        file: doc.file,
        line: statement.line,
        message: `states a hard-coded count: '${statement.text}'`,
      });
    }
  }
  return findings;
}

/** One `## Public API` section per document. */
export function checkDuplicateSections(docs: MarkdownDoc[]): Finding[] {
  const findings: Finding[] = [];
  for (const doc of docs) {
    const sections = doc.sections.filter((section) => section.heading === 'Public API');
    if (sections.length < 2) continue;
    const lines = sections.map((section) => section.line).join(', ');
    findings.push({
      rule: 'duplicate-api',
      file: doc.file,
      line: sections[0].line,
      message: `has ${sections.length} '## Public API' headings (lines ${lines}); keep one`,
    });
  }
  return findings;
}

function expandBraces(token: string): string[] {
  const match = /\{([^{}]+)\}/.exec(token);
  if (match === null) return [token];
  return match[1]
    .split(',')
    .map((part) => token.replace(match[0], part))
    .flatMap(expandBraces);
}

/** Never point a reader at a repository path that does not exist. */
export function checkPaths(docs: MarkdownDoc[], root: string): Finding[] {
  const findings: Finding[] = [];
  let inFence = false;

  for (const doc of docs) {
    inFence = false;
    doc.lines.forEach((text, index) => {
      if (/^\s*```/.test(text)) {
        inFence = !inFence;
        return;
      }
      if (inFence) return;
      for (const match of text.matchAll(/`([^`]+)`/g)) {
        const token = match[1]
          .trim()
          .replace(/[.,;:]+$/, '')
          .replace(/#.*$/, '');
        if (!PATH_PATTERN.test(token)) continue;
        for (const candidate of expandBraces(token)) {
          if (existsSync(join(root, candidate))) continue;
          findings.push({
            rule: 'paths',
            file: doc.file,
            line: index + 1,
            message: `cited path '${candidate}' does not exist`,
          });
        }
      }
    });
  }

  return findings;
}

export interface RuleInput {
  root: string;
  docs: MarkdownDoc[];
  exports: ExportMap;
  program: ReadmeProgram;
}

function byLocation(left: Finding, right: Finding): number {
  if (left.file !== right.file) return left.file.localeCompare(right.file);
  if (left.line !== right.line) return left.line - right.line;
  if (left.rule !== right.rule) return left.rule.localeCompare(right.rule);
  return left.message.localeCompare(right.message);
}

/** Run every rule once and return every finding, in a stable order. */
export function runReadmeRules(input: RuleInput): Finding[] {
  const findings = [
    ...checkCompiles(input.program),
    ...checkImports(input.program, input.exports),
    ...checkPublicApi(input.docs, input.exports),
    ...checkCounts(input.docs),
    ...checkDuplicateSections(input.docs),
    ...checkPaths(input.docs, input.root),
  ];
  return findings.sort(byLocation);
}
