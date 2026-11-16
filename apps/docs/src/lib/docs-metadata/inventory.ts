/**
 * Export inventory.
 *
 * Every public export of a barrel gets a kind derived from the TypeScript
 * checker, never from a hand-written list. Every component export additionally
 * gets the inventory slug it anchors on, the file that declares it, and its
 * story when the package ships one.
 */
import ts from 'typescript';

import { barrelSymbol, componentSourceFile } from './api';
import { MetadataError } from './registry';
import { resolveStory, storyFileFor, storySlug } from './stories';
import type { ComponentExportRecord, ExportKind, ExportRecord, StoryRecord } from './types';

/** Type-only symbols: an export of one of these never has a runtime value. */
const TYPE_FLAGS =
  ts.SymbolFlags.Interface | ts.SymbolFlags.TypeAlias | ts.SymbolFlags.TypeParameter;

function targetSymbol(checker: ts.TypeChecker, symbol: ts.Symbol): ts.Symbol {
  return (symbol.getFlags() & ts.SymbolFlags.Alias) !== 0
    ? checker.getAliasedSymbol(symbol)
    : symbol;
}

function kindOf(checker: ts.TypeChecker, symbol: ts.Symbol, name: string): ExportKind {
  const target = targetSymbol(checker, symbol);
  if ((target.getFlags() & TYPE_FLAGS) !== 0) return 'type';
  if (/^use[A-Z]/.test(name)) return 'hook';

  const declaration = target.getDeclarations()?.[0];
  if (declaration === undefined) {
    return (target.getFlags() & ts.SymbolFlags.Function) !== 0 ? 'function' : 'constant';
  }
  if (declaration.getSourceFile().fileName.endsWith('.tsx') && /^[A-Z]/.test(name)) {
    return 'component';
  }
  if (ts.isFunctionDeclaration(declaration)) return 'function';

  const type = checker.getTypeOfSymbolAtLocation(target, declaration);
  return type.getCallSignatures().length > 0 ? 'function' : 'constant';
}

/** Every barrel export with its derived kind, sorted by name. */
export function buildExports(
  program: ts.Program,
  root: string,
  packageName: string,
): ExportRecord[] {
  const { checker, symbol } = barrelSymbol(program, root, packageName);
  return checker
    .getExportsOfModule(symbol)
    .map((exported) => ({ name: exported.name, kind: kindOf(checker, exported, exported.name) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * The story of a component export, or `undefined` when the package ships none.
 * A story file that exists but cannot be read still fails: only absence is
 * tolerated, because a package's missing story is documented as package debt.
 */
export function resolveOptionalStory(
  root: string,
  packageName: string,
  exportName: string,
): StoryRecord | undefined {
  if (storyFileFor(root, packageName, exportName) === undefined) return undefined;
  return resolveStory(root, packageName, exportName);
}

/**
 * The component exports of a package, sorted by inventory slug. Two exports
 * that derive the same slug are a catalogue error: one anchor cannot name both.
 */
export function buildComponentExports(
  program: ts.Program,
  root: string,
  packageName: string,
  exports: readonly ExportRecord[],
): ComponentExportRecord[] {
  const seen = new Map<string, string>();
  const records: ComponentExportRecord[] = [];

  for (const entry of exports) {
    if (entry.kind !== 'component') continue;
    const id = storySlug(entry.name);
    const previous = seen.get(id);
    if (previous !== undefined) {
      throw new MetadataError(
        `${packageName} exports ${previous} and ${entry.name}, which share the inventory slug "${id}"`,
      );
    }
    seen.set(id, entry.name);
    const story = resolveOptionalStory(root, packageName, entry.name);
    records.push({
      id,
      exportName: entry.name,
      sourceFile: componentSourceFile(program, root, packageName, entry.name),
      ...(story === undefined ? {} : { story }),
    });
  }

  return records.sort((a, b) => a.id.localeCompare(b.id));
}
