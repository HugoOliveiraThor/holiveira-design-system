/**
 * Shapes for the documentation metadata layer.
 *
 * Facts are generated from the repository; the catalogue supplies editorial
 * classification. `render.ts` turns these records into the committed bytes.
 */

export type ExportKind = 'component' | 'hook' | 'function' | 'constant' | 'type';

/** One public export of a package barrel, with the kind the checker derived. */
export interface ExportRecord {
  name: string;
  kind: ExportKind;
}

/** One component export, anchored in its package page inventory. */
export interface ComponentExportRecord {
  id: string;
  exportName: string;
  sourceFile: string;
  story?: StoryRecord;
}

export interface PackageRecord {
  name: string;
  version: string;
  description: string;
  private: false;
  installState: 'pre-release' | 'published';
  exports: ExportRecord[];
  componentExports: ComponentExportRecord[];
  category: string;
  peers: Record<string, string>;
}

export interface PropRecord {
  name: string;
  type: string;
  required: boolean;
  default: string | null;
  origin: 'component' | 'inherited';
}

export interface VariantRecord {
  name: string;
  values: string[];
  default: string | null;
}

/** The Playground screens a component page may link. */
export const PLAYGROUND_SCREENS = ['dashboard', 'login', 'forms', 'orders', 'settings'] as const;

export type PlaygroundScreen = (typeof PLAYGROUND_SCREENS)[number];

export interface ComponentAccessibility {
  keyboard: string;
  aria: string;
  focus: string;
}

/** Editorial content for one component page. Facts are generated, never stored here. */
export interface ComponentDoc {
  id: string;
  summary: string;
  whenToUse: string;
  whenNotToUse: string;
  accessibility: ComponentAccessibility;
  related: string[];
  playground?: PlaygroundScreen;
}

/** The example directories the portal promises per core component. */
export const EXAMPLES_DIR = ['apps', 'docs', 'src', 'examples'] as const;

export type ExampleKind = 'minimal' | 'realistic';

export interface ExampleRecord {
  id: string;
  kind: ExampleKind;
  path: string;
  source: string;
}

export interface StoryRecord {
  title: string;
  id: string;
}

export interface ComponentRecord {
  id: string;
  package: string;
  exportName: string;
  props: PropRecord[];
  variants: Record<string, VariantRecord>;
  story: StoryRecord;
  sourceFile: string;
}

export interface SearchRecord {
  id: string;
  type: 'package' | 'component';
  title: string;
  package: string;
  category: string;
  summary: string;
  keywords: string[];
  path: string;
}

export interface CatalogComponent {
  exportName: string;
  id: string;
  core?: boolean;
}

export interface CatalogPackage {
  name: string;
  category: string;
  components?: CatalogComponent[];
}

export interface Catalog {
  packages: CatalogPackage[];
}

/** The D12.4 core set; every name must exist in the catalogue and the barrels. */
export const CORE_COMPONENTS = [
  'Button',
  'Alert',
  'Badge',
  'InputGroup',
  'Table',
  'Dropdown',
  'Card',
  'PageHeader',
  'Form',
  'Field',
  'AreaChart',
  'Sidebar',
  'Header',
] as const;
