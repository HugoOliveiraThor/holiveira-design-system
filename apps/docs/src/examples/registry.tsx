/**
 * The example modules, keyed the same way as `examples.json`.
 *
 * The file is the only place where examples enter the app: the page resolves the
 * component from here and the source from the generated artifact, both by the
 * same `id/kind` pair, so a preview and its code block cannot drift apart.
 */
import type { ComponentType } from 'react';

import type { ExampleKind } from '../lib/docs-metadata/types';

import { AlertMinimal } from './alert/minimal';
import { AlertRealistic } from './alert/realistic';
import { AreaChartMinimal } from './area-chart/minimal';
import { AreaChartRealistic } from './area-chart/realistic';
import { BadgeMinimal } from './badge/minimal';
import { BadgeRealistic } from './badge/realistic';
import { ButtonMinimal } from './button/minimal';
import { ButtonRealistic } from './button/realistic';
import { CardMinimal } from './card/minimal';
import { CardRealistic } from './card/realistic';
import { DropdownMinimal } from './dropdown/minimal';
import { DropdownRealistic } from './dropdown/realistic';
import { FieldMinimal } from './field/minimal';
import { FieldRealistic } from './field/realistic';
import { FormMinimal } from './form/minimal';
import { FormRealistic } from './form/realistic';
import { HeaderMinimal } from './header/minimal';
import { HeaderRealistic } from './header/realistic';
import { InputGroupMinimal } from './input-group/minimal';
import { InputGroupRealistic } from './input-group/realistic';
import { PageHeaderMinimal } from './page-header/minimal';
import { PageHeaderRealistic } from './page-header/realistic';
import { SidebarMinimal } from './sidebar/minimal';
import { SidebarRealistic } from './sidebar/realistic';
import { TableMinimal } from './table/minimal';
import { TableRealistic } from './table/realistic';

type ExampleMap = Record<string, Partial<Record<ExampleKind, ComponentType>>>;

const EXAMPLES: ExampleMap = {
  alert: { minimal: AlertMinimal, realistic: AlertRealistic },
  'area-chart': { minimal: AreaChartMinimal, realistic: AreaChartRealistic },
  badge: { minimal: BadgeMinimal, realistic: BadgeRealistic },
  button: { minimal: ButtonMinimal, realistic: ButtonRealistic },
  card: { minimal: CardMinimal, realistic: CardRealistic },
  dropdown: { minimal: DropdownMinimal, realistic: DropdownRealistic },
  field: { minimal: FieldMinimal, realistic: FieldRealistic },
  form: { minimal: FormMinimal, realistic: FormRealistic },
  header: { minimal: HeaderMinimal, realistic: HeaderRealistic },
  'input-group': { minimal: InputGroupMinimal, realistic: InputGroupRealistic },
  'page-header': { minimal: PageHeaderMinimal, realistic: PageHeaderRealistic },
  sidebar: { minimal: SidebarMinimal, realistic: SidebarRealistic },
  table: { minimal: TableMinimal, realistic: TableRealistic },
};

export function exampleComponent(id: string, kind: ExampleKind): ComponentType | undefined {
  return EXAMPLES[id]?.[kind];
}

/** Every `id/kind` pair the registry can render, sorted, for the wiring test. */
export function exampleKeys(): string[] {
  return Object.entries(EXAMPLES)
    .flatMap(([id, kinds]) => Object.keys(kinds).map((kind) => `${id}/${kind}` as const))
    .sort();
}

export { EXAMPLES };
