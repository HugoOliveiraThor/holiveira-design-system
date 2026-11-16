/**
 * Component documentation targets.
 *
 * Every component export of a public package resolves to exactly one place a
 * reader can go: a catalogued component page, a guide route, or the package
 * inventory anchor. The map is editorial and explicit so a new export cannot
 * quietly ship undocumented; `check:docs:metadata` fails on an export with no
 * target and on a target naming a route the portal does not serve.
 *
 * Precedence: catalogue page, then explicit entry, then pattern rule. The
 * catalogue wins because a component page is already the reviewed home; an
 * explicit entry that competes with it is a conflict. The two pattern rules
 * cover the homogeneous families (icons and auth layouts) that would otherwise
 * need forty-eight near-identical lines.
 *
 * Parts of a component (TableBody, DropdownTrigger, TabsList, ...) resolve to
 * their parent's page when they share its source file, so one API is not split
 * across two targets.
 */
import type { Target } from '../lib/docs-metadata/types';

import { catalog } from './catalog';

export interface ComponentTargetEntry {
  package: string;
  exportName: string;
  target: Target;
}

export interface TargetPattern {
  package: string;
  match: (exportName: string) => boolean;
  target: Target;
}

export interface TargetMap {
  entries: readonly ComponentTargetEntry[];
  patterns: readonly TargetPattern[];
}

/** Every non-core component export, one explicit reviewed target each. */
export const COMPONENT_TARGETS: ComponentTargetEntry[] = [
  // @ho-dev/primitives
  {
    package: '@ho-dev/primitives',
    exportName: 'Avatar',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'avatar' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'AvatarGroup',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'avatar-group' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'Breadcrumb',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'breadcrumb' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'Checkbox',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'checkbox' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'DropdownClose',
    target: { kind: 'page', id: 'dropdown' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'DropdownContent',
    target: { kind: 'page', id: 'dropdown' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'DropdownTrigger',
    target: { kind: 'page', id: 'dropdown' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'Link',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'link' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'List',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'list' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'ListItem',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'list' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'Modal',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'modal' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'ModalAlert',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'modal-alert' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'ModalCloseButton',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'modal' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'NotificationBar',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'notification-bar' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'OTPInput',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'otp-input' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'Pagination',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'pagination' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'Progress',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'progress' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'Radio',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'radio' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'Select',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'select' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'Skeleton',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'skeleton' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'Spinner',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'spinner' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'Switch',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'switch' },
  },
  { package: '@ho-dev/primitives', exportName: 'TableBody', target: { kind: 'page', id: 'table' } },
  { package: '@ho-dev/primitives', exportName: 'TableCell', target: { kind: 'page', id: 'table' } },
  {
    package: '@ho-dev/primitives',
    exportName: 'TableFooter',
    target: { kind: 'page', id: 'table' },
  },
  { package: '@ho-dev/primitives', exportName: 'TableHead', target: { kind: 'page', id: 'table' } },
  {
    package: '@ho-dev/primitives',
    exportName: 'TableHeader',
    target: { kind: 'page', id: 'table' },
  },
  { package: '@ho-dev/primitives', exportName: 'TableRow', target: { kind: 'page', id: 'table' } },
  {
    package: '@ho-dev/primitives',
    exportName: 'Tabs',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'tabs' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'TabsContent',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'tabs' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'TabsList',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'tabs' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'TabsTrigger',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'tabs' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'TextArea',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'text-area' },
  },
  {
    package: '@ho-dev/primitives',
    exportName: 'Tooltip',
    target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'tooltip' },
  },
  // @ho-dev/ui
  {
    package: '@ho-dev/ui',
    exportName: 'ButtonGroup',
    target: { kind: 'anchor', package: '@ho-dev/ui', anchor: 'button-group' },
  },
  {
    package: '@ho-dev/ui',
    exportName: 'CardContent',
    target: { kind: 'anchor', package: '@ho-dev/ui', anchor: 'card-content' },
  },
  {
    package: '@ho-dev/ui',
    exportName: 'CardImage',
    target: { kind: 'anchor', package: '@ho-dev/ui', anchor: 'card-image' },
  },
  {
    package: '@ho-dev/ui',
    exportName: 'CardTitle',
    target: { kind: 'anchor', package: '@ho-dev/ui', anchor: 'card-title' },
  },
  {
    package: '@ho-dev/ui',
    exportName: 'ShowcaseSection',
    target: { kind: 'anchor', package: '@ho-dev/ui', anchor: 'showcase-section' },
  },
  // @ho-dev/forms
  {
    package: '@ho-dev/forms',
    exportName: 'DatePicker',
    target: { kind: 'anchor', package: '@ho-dev/forms', anchor: 'date-picker' },
  },
  {
    package: '@ho-dev/forms',
    exportName: 'Description',
    target: { kind: 'anchor', package: '@ho-dev/forms', anchor: 'description' },
  },
  {
    package: '@ho-dev/forms',
    exportName: 'ErrorMessage',
    target: { kind: 'anchor', package: '@ho-dev/forms', anchor: 'error-message' },
  },
  {
    package: '@ho-dev/forms',
    exportName: 'Label',
    target: { kind: 'anchor', package: '@ho-dev/forms', anchor: 'label' },
  },
  {
    package: '@ho-dev/forms',
    exportName: 'MultiSelect',
    target: { kind: 'anchor', package: '@ho-dev/forms', anchor: 'multi-select' },
  },
  {
    package: '@ho-dev/forms',
    exportName: 'Submit',
    target: { kind: 'anchor', package: '@ho-dev/forms', anchor: 'submit' },
  },
  // @ho-dev/layouts
  {
    package: '@ho-dev/layouts',
    exportName: 'HeaderActions',
    target: { kind: 'page', id: 'header' },
  },
  {
    package: '@ho-dev/layouts',
    exportName: 'HeaderToggle',
    target: { kind: 'page', id: 'header' },
  },
  {
    package: '@ho-dev/layouts',
    exportName: 'SidebarProvider',
    target: { kind: 'anchor', package: '@ho-dev/layouts', anchor: 'sidebar-provider' },
  },
  // @ho-dev/charts
  {
    package: '@ho-dev/charts',
    exportName: 'BarChart',
    target: { kind: 'anchor', package: '@ho-dev/charts', anchor: 'bar-chart' },
  },
  {
    package: '@ho-dev/charts',
    exportName: 'ChartSkeleton',
    target: { kind: 'anchor', package: '@ho-dev/charts', anchor: 'chart-skeleton' },
  },
  {
    package: '@ho-dev/charts',
    exportName: 'PieChart',
    target: { kind: 'anchor', package: '@ho-dev/charts', anchor: 'pie-chart' },
  },
  // @ho-dev/providers
  {
    package: '@ho-dev/providers',
    exportName: 'ProviderComposer',
    target: { kind: 'anchor', package: '@ho-dev/providers', anchor: 'provider-composer' },
  },
  // @ho-dev/theme
  {
    package: '@ho-dev/theme',
    exportName: 'ThemeProvider',
    target: { kind: 'guide', slug: 'getting-started/theming' },
  },
];

const AUTH_LAYOUTS = new Set([
  'AuthLayout',
  'SignInForm',
  'SignUpForm',
  'PasswordResetForm',
  'TwoStepVerificationForm',
]);

/** The only pattern rules: homogeneous families that need no per-export line. */
export const TARGET_PATTERNS: TargetPattern[] = [
  {
    package: '@ho-dev/icons',
    match: (exportName) => exportName.endsWith('Icon') || exportName === 'IconWrapper',
    target: { kind: 'guide', slug: 'guides/icons' },
  },
  {
    package: '@ho-dev/layouts',
    match: (exportName) => AUTH_LAYOUTS.has(exportName),
    target: { kind: 'guide', slug: 'guides/layouts' },
  },
];

/** The catalogue already documents these exports on their own component page. */
function cataloguedPage(packageName: string, exportName: string): string | undefined {
  for (const entry of catalog.packages) {
    if (entry.name !== packageName) continue;
    const component = (entry.components ?? []).find(
      (candidate) => candidate.exportName === exportName,
    );
    if (component !== undefined) return component.id;
  }
  return undefined;
}

/**
 * Resolve one component export. Throws when the map is ambiguous or when an
 * explicit entry competes with the catalogue page that already documents it.
 */
export function resolveTarget(
  packageName: string,
  exportName: string,
  map: TargetMap = { entries: COMPONENT_TARGETS, patterns: TARGET_PATTERNS },
): Target | undefined {
  const page = cataloguedPage(packageName, exportName);
  const explicit = map.entries.filter(
    (entry) => entry.package === packageName && entry.exportName === exportName,
  );
  if (explicit.length > 1) {
    throw new Error(`targets.ts maps ${packageName} ${exportName} more than once`);
  }
  if (page !== undefined) {
    if (explicit.length === 1) {
      throw new Error(
        `targets.ts maps ${exportName} explicitly, but ${packageName} already documents it on the ${page} page`,
      );
    }
    return { kind: 'page', id: page };
  }
  if (explicit.length === 1) return explicit[0].target;
  return map.patterns.find(
    (pattern) => pattern.package === packageName && pattern.match(exportName),
  )?.target;
}
