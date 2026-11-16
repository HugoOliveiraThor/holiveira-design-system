/**
 * Component API extraction.
 *
 * Props come from the TypeScript checker over one program built from the
 * public barrels; variants come from a static walk of the component's `cva`
 * call. No package is imported at runtime and no private package is read.
 */
import { join, relative } from 'node:path';

import ts from 'typescript';

import { MetadataError } from './registry';
import { assertUniqueStoryTitles, resolveStory } from './stories';
import type { Catalog, ComponentRecord, PropRecord, VariantRecord } from './types';

/**
 * Inherited native props worth documenting. React's HTML attribute types carry
 * hundreds of props; the API page lists the common ones and the page contract
 * links to the DOM for the rest.
 */
export const NATIVE_PROP_ALLOWLIST = new Set([
  'children',
  'className',
  'id',
  'style',
  'role',
  'title',
  'tabIndex',
  'aria-label',
  'aria-describedby',
  'aria-hidden',
  'disabled',
  'name',
  'value',
  'onClick',
  'onChange',
  'onBlur',
  'onFocus',
  'onKeyDown',
  'placeholder',
  'type',
  'href',
  'target',
  'rel',
  'alt',
  'src',
  'width',
  'height',
  'htmlFor',
  'required',
  'readOnly',
  'checked',
  'multiple',
  'rows',
  'cols',
  'dir',
  'lang',
]);

export function packageDir(packageName: string): string {
  return packageName.replace(/^@[^/]+\//, '');
}

export function barrelPath(root: string, packageName: string): string {
  return join(root, 'packages', packageDir(packageName), 'src', 'index.ts');
}

/** One program over the public barrels; `paths` resolves `@ho-dev/*` to source. */
export function createProgram(root: string, packageNames: string[]): ts.Program {
  const options: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.ReactJSX,
    strict: true,
    skipLibCheck: true,
    esModuleInterop: true,
    noEmit: true,
    baseUrl: root,
    paths: { '@ho-dev/*': ['packages/*/src/index.ts'] },
  };
  return ts.createProgram({
    rootNames: packageNames.map((name) => barrelPath(root, name)),
    options,
  });
}

export function barrelSymbol(program: ts.Program, root: string, packageName: string) {
  const source = program.getSourceFile(barrelPath(root, packageName));
  if (!source) throw new MetadataError(`cannot read the barrel of ${packageName}`);
  const symbol = program.getTypeChecker().getSymbolAtLocation(source);
  if (!symbol) throw new MetadataError(`cannot resolve the barrel symbol of ${packageName}`);
  return { checker: program.getTypeChecker(), source, symbol };
}

export function exportNames(program: ts.Program, root: string, packageName: string): string[] {
  const { checker, symbol } = barrelSymbol(program, root, packageName);
  return checker
    .getExportsOfModule(symbol)
    .map((exported) => exported.name)
    .sort();
}

function canonicalType(text: string): string {
  if (!text.includes(' | ')) return text;
  const parts = text.split(' | ').map((part) => part.trim());
  if (parts.some((part) => /[<{(]/.test(part))) return text;
  return [...new Set(parts)].sort().join(' | ');
}

export function extractProps(
  program: ts.Program,
  root: string,
  packageName: string,
  exportName: string,
  variantDefaults: Record<string, string> = {},
): PropRecord[] {
  const { checker, source, symbol } = barrelSymbol(program, root, packageName);
  const exported = checker.getExportsOfModule(symbol).find((entry) => entry.name === exportName);
  if (!exported) throw new MetadataError(`${packageName} does not export ${exportName}`);

  const componentType = checker.getTypeOfSymbolAtLocation(exported, source);
  const signature = componentType.getCallSignatures()[0];
  const parameter = signature?.getParameters()[0];
  if (!parameter) {
    throw new MetadataError(`cannot resolve props type for ${exportName}`);
  }
  const propsType = checker.getTypeOfSymbolAtLocation(parameter, source);
  if ((propsType.flags & ts.TypeFlags.Any) !== 0) {
    throw new MetadataError(`cannot resolve props type for ${exportName}`);
  }
  const componentRoot = join(root, 'packages', packageDir(packageName), 'src');

  return checker
    .getPropertiesOfType(propsType)
    .map((property): PropRecord | null => {
      const declarations = property.getDeclarations() ?? [];
      const local = declarations.find((entry) =>
        entry.getSourceFile().fileName.startsWith(componentRoot),
      );
      const inherited = local === undefined;
      if (inherited && !NATIVE_PROP_ALLOWLIST.has(property.name)) return null;
      return {
        name: property.name,
        type: canonicalType(
          checker.typeToString(checker.getTypeOfSymbolAtLocation(property, source)),
        ),
        required: (property.getFlags() & ts.SymbolFlags.Optional) === 0,
        default: variantDefaults[property.name] ?? null,
        origin: inherited ? ('inherited' as const) : ('component' as const),
      };
    })
    .filter((prop): prop is PropRecord => prop !== null)
    .sort((a, b) => a.name.localeCompare(b.name));
}

function literalName(name: ts.PropertyName | ts.BindingName): string | null {
  if (ts.isIdentifier(name)) return name.text;
  if (ts.isStringLiteral(name)) return name.text;
  return null;
}

function variantValues(node: ts.Expression): string[] {
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.filter(ts.isStringLiteral).map((element) => element.text);
  }
  if (ts.isObjectLiteralExpression(node)) {
    return node.properties
      .map((property) => (ts.isPropertyAssignment(property) ? literalName(property.name) : null))
      .filter((value): value is string => value !== null);
  }
  throw new MetadataError('cannot read cva variant values');
}

/**
 * The CVA call that belongs to a component: `<camelCase(exportName)>Variants`
 * in the component's own declaration file. A file with no such call yields no
 * variants rather than guessing at a sibling call.
 */
export function extractVariants(
  program: ts.Program,
  root: string,
  packageName: string,
  exportName: string,
): { variants: Record<string, VariantRecord>; defaults: Record<string, string> } {
  const { checker, symbol } = barrelSymbol(program, root, packageName);
  const exported = checker.getExportsOfModule(symbol).find((entry) => entry.name === exportName);
  const target =
    exported !== undefined && (exported.getFlags() & ts.SymbolFlags.Alias) !== 0
      ? checker.getAliasedSymbol(exported)
      : exported;
  const declaration = target?.getDeclarations()?.[0];
  if (!declaration) throw new MetadataError(`cannot resolve the declaration of ${exportName}`);
  const sourceFile = declaration.getSourceFile();
  const expected = `${exportName.charAt(0).toLowerCase()}${exportName.slice(1)}Variants`;

  const findCall = (node: ts.Node): ts.CallExpression | null => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === expected &&
      node.initializer !== undefined &&
      ts.isCallExpression(node.initializer) &&
      ts.isIdentifier(node.initializer.expression) &&
      node.initializer.expression.text === 'cva'
    ) {
      return node.initializer;
    }
    let found: ts.CallExpression | null = null;
    ts.forEachChild(node, (child) => {
      if (found !== null) return;
      found = findCall(child);
    });
    return found;
  };

  const call = findCall(sourceFile);
  if (call === null) return { variants: {}, defaults: {} };

  const options = call.arguments[1];
  if (options === undefined || !ts.isObjectLiteralExpression(options)) {
    return { variants: {}, defaults: {} };
  }

  const defaults: Record<string, string> = {};
  const defaultVariants = options.properties.find(
    (property): property is ts.PropertyAssignment =>
      ts.isPropertyAssignment(property) && literalName(property.name) === 'defaultVariants',
  );
  if (defaultVariants !== undefined && ts.isObjectLiteralExpression(defaultVariants.initializer)) {
    for (const property of defaultVariants.initializer.properties) {
      if (!ts.isPropertyAssignment(property)) continue;
      const name = literalName(property.name);
      if (name !== null && ts.isStringLiteral(property.initializer)) {
        defaults[name] = property.initializer.text;
      }
    }
  }

  const variantsObject = options.properties.find(
    (property): property is ts.PropertyAssignment =>
      ts.isPropertyAssignment(property) && literalName(property.name) === 'variants',
  );
  const variants: Record<string, VariantRecord> = {};
  if (variantsObject !== undefined && ts.isObjectLiteralExpression(variantsObject.initializer)) {
    for (const property of variantsObject.initializer.properties) {
      if (!ts.isPropertyAssignment(property)) continue;
      const name = literalName(property.name);
      if (name === null) continue;
      variants[name] = {
        name,
        values: variantValues(property.initializer),
        default: defaults[name] ?? null,
      };
    }
  }

  return { variants, defaults };
}

/** The repo-relative source file that declares the exported component. */
export function componentSourceFile(
  program: ts.Program,
  root: string,
  packageName: string,
  exportName: string,
): string {
  const { checker, symbol } = barrelSymbol(program, root, packageName);
  const exported = checker.getExportsOfModule(symbol).find((entry) => entry.name === exportName);
  const target =
    exported !== undefined && (exported.getFlags() & ts.SymbolFlags.Alias) !== 0
      ? checker.getAliasedSymbol(exported)
      : exported;
  const declaration = target?.getDeclarations()?.[0];
  if (!declaration) throw new MetadataError(`cannot resolve the declaration of ${exportName}`);
  return relative(root, declaration.getSourceFile().fileName).split(/[\\/]/).join('/');
}

/** One API record per catalog component, sorted by id. */
export function buildApi(program: ts.Program, root: string, catalog: Catalog): ComponentRecord[] {
  const records: ComponentRecord[] = [];
  for (const pkg of catalog.packages) {
    for (const component of pkg.components ?? []) {
      const { variants, defaults } = extractVariants(program, root, pkg.name, component.exportName);
      const props = extractProps(program, root, pkg.name, component.exportName, defaults);
      records.push({
        id: component.id,
        package: pkg.name,
        exportName: component.exportName,
        props,
        variants,
        story: resolveStory(root, pkg.name, component.exportName),
        sourceFile: componentSourceFile(program, root, pkg.name, component.exportName),
      });
    }
  }
  records.sort((a, b) => a.id.localeCompare(b.id));
  assertUniqueStoryTitles(
    records.map((record) => ({
      id: record.id,
      exportName: record.exportName,
      title: record.story.title,
    })),
  );
  return records;
}
