/**
 * Markdown parsing for the package documentation gate.
 *
 * A README or contract is reduced to its fenced blocks, its level-two
 * sections and the line each one starts on, so every rule can point at the
 * line it read. The parser never touches the filesystem.
 */

/** A fenced code block. `line` is the first content line, 1-based. */
export interface Block {
  lang: string;
  code: string;
  line: number;
}

/** A level-two section. `line` is the heading line, 1-based. */
export interface Section {
  heading: string;
  line: number;
  body: string[];
}

export interface MarkdownDoc {
  file: string;
  kind: 'readme' | 'contract';
  packageName?: string;
  blocks: Block[];
  sections: Section[];
  /** Every source line, so whole-document rules keep their line numbers. */
  lines: string[];
}

export interface DocOptions {
  kind?: 'readme' | 'contract';
  packageName?: string;
}

/** Languages whose blocks assert a TypeScript API. */
export const CODE_LANGUAGES = new Set(['ts', 'tsx', 'js', 'jsx']);

/** A statement that hard-codes how many exports or components exist. */
const COUNT_PATTERN = /\b\d+\s+(?:[A-Za-z][A-Za-z-]*\s+){0,3}(?:exports?|components?)\b/i;

const FENCE = /^\s*```(.*)$/;
const HEADING = /^##\s+(.+?)\s*$/;
const BULLET = /^\s*[-*]\s+(.+)$/;
const TABLE_ROW = /^\s*\|/;
const TABLE_SEPARATOR = /^\s*\|[\s:|-]*-[\s:|-]*$/;

/**
 * A documented declaration inside a fenced `## Public API` block. Values are
 * excluded on purpose: an example that declares a local variable documents the
 * API by using it, not by naming it.
 */
const DECLARATION =
  /^\s*(?:export\s+)?(?:declare\s+)?(?:type|interface|function|class|enum)\s+([A-Za-z_$][\w$]*)/;

export class MarkdownError extends Error {
  readonly file: string;
  readonly line: number;

  constructor(file: string, line: number, message: string) {
    super(`${file}:${line}: ${message}`);
    this.name = 'MarkdownError';
    this.file = file;
    this.line = line;
  }
}

/** `README.md` is a readme; every other parsed document is a contract. */
export function inferKind(file: string): 'readme' | 'contract' {
  return /(?:^|\/)README\.md$/i.test(file.split('\\').join('/')) ? 'readme' : 'contract';
}

/**
 * Parse a README or contract.
 *
 * @throws MarkdownError when a fence is never closed, naming file and line.
 */
export function parseMarkdown(file: string, text: string, options: DocOptions = {}): MarkdownDoc {
  const source = text.replace(/\r\n?/g, '\n').split('\n');
  const blocks: Block[] = [];
  const sections: Section[] = [];
  let current: Section | null = null;
  let open: { lang: string; fenceLine: number; line: number; code: string[] } | null = null;

  source.forEach((raw, index) => {
    const lineNumber = index + 1;

    if (open !== null) {
      if (current !== null) current.body.push(raw);
      const closing = FENCE.exec(raw);
      if (closing === null) {
        open.code.push(raw);
        return;
      }
      blocks.push({ lang: open.lang, code: open.code.join('\n'), line: open.line });
      open = null;
      return;
    }

    const fence = FENCE.exec(raw);
    if (fence !== null) {
      if (current !== null) current.body.push(raw);
      const lang = fence[1].trim().split(/\s+/)[0] ?? '';
      open = { lang, fenceLine: lineNumber, line: lineNumber + 1, code: [] };
      return;
    }

    const heading = HEADING.exec(raw);
    if (heading !== null) {
      current = { heading: heading[1].trim(), line: lineNumber, body: [] };
      sections.push(current);
      return;
    }

    if (current !== null) current.body.push(raw);
  });

  if (open !== null) {
    throw new MarkdownError(file, open.fenceLine, 'unterminated code fence');
  }

  return {
    file,
    kind: options.kind ?? inferKind(file),
    packageName: options.packageName,
    blocks,
    sections,
    lines: source,
  };
}

/** Reduce a documented token to a bare identifier, or null when it is not one. */
function identifierOf(raw: string): string | null {
  const name = raw
    .trim()
    .replace(/\(.*\)$/, '')
    .replace(/<.*>$/, '')
    .trim();
  return /^[A-Za-z_$][\w$]*$/.test(name) ? name : null;
}

function namesIn(text: string): string[] {
  const names: string[] = [];
  for (const match of text.matchAll(/`([^`]+)`/g)) {
    const name = identifierOf(match[1]);
    if (name !== null) names.push(name);
  }
  return names;
}

function firstCell(row: string): string {
  const cells = row.split('|');
  return (cells[1] ?? '').trim();
}

/**
 * Identifiers a `## Public API` section documents.
 *
 * Reads the bullet before its em dash, the first cell of a table whose first
 * column is `Export`, and declarations inside a fenced example - so prose
 * after an em dash can mention a renamed component without failing the gate.
 */
export function publicApiNames(doc: MarkdownDoc): Array<{ name: string; line: number }> {
  const found: Array<{ name: string; line: number }> = [];
  const seen = new Set<string>();
  const add = (raw: string, line: number): void => {
    const name = identifierOf(raw);
    if (name === null || seen.has(name)) return;
    seen.add(name);
    found.push({ name, line });
  };

  for (const section of doc.sections) {
    if (section.heading !== 'Public API') continue;
    const lines = section.body;
    let inFence = false;

    for (let index = 0; index < lines.length; index += 1) {
      const line = section.line + 1 + index;
      const text = lines[index];

      if (FENCE.test(text)) {
        inFence = !inFence;
        continue;
      }
      if (inFence) {
        const declaration = DECLARATION.exec(text);
        if (declaration !== null) add(declaration[1], line);
        continue;
      }

      const bullet = BULLET.exec(text);
      if (bullet !== null) {
        const parts = [bullet[1]];
        for (let next = index + 1; next < lines.length; next += 1) {
          const continuation = lines[next];
          if (
            continuation.trim() === '' ||
            BULLET.test(continuation) ||
            TABLE_ROW.test(continuation) ||
            continuation.trimStart().startsWith('#') ||
            FENCE.test(continuation)
          ) {
            break;
          }
          parts.push(continuation.trim());
          index = next;
        }
        const beforeDash = parts.join(' ').split('—')[0];
        for (const name of namesIn(beforeDash)) add(name, line);
        continue;
      }

      if (TABLE_ROW.test(text)) {
        const header = firstCell(text).toLowerCase();
        let cursor = index + 1;
        while (cursor < lines.length && TABLE_ROW.test(lines[cursor])) cursor += 1;
        const tableBody = lines.slice(index, cursor);
        if (header !== 'export' || tableBody.length < 2) {
          index = cursor - 1;
          continue;
        }
        if (!TABLE_SEPARATOR.test(tableBody[1])) {
          index = cursor - 1;
          continue;
        }
        for (let row = 2; row < tableBody.length; row += 1) {
          const match = /^`([^`]+)`/.exec(firstCell(tableBody[row]));
          if (match !== null) add(match[1], section.line + 1 + index + row);
        }
        index = cursor - 1;
      }
    }
  }

  return found;
}

/**
 * Non-fenced lines that state a hard-coded export or component count.
 *
 * The count is a claim about a moving target: the section is the list, so the
 * number is drift waiting to happen.
 */
export function countStatements(doc: MarkdownDoc): Array<{ line: number; text: string }> {
  const found: Array<{ line: number; text: string }> = [];
  let inFence = false;

  doc.lines.forEach((text, index) => {
    if (FENCE.test(text)) {
      inFence = !inFence;
      return;
    }
    if (inFence) return;
    if (COUNT_PATTERN.test(text)) found.push({ line: index + 1, text: text.trim() });
  });

  return found;
}
