/**
 * Editorial records for the component pages.
 *
 * Facts (props, variants, peers, story ids) come from the generated metadata.
 * These records hold only the prose the repository cannot derive; the gate in
 * `check:docs:metadata` validates their structure and relationships.
 */
import type { ComponentDoc } from '../../lib/docs-metadata/types';

import { alertDoc } from './alert';
import { badgeDoc } from './badge';
import { buttonDoc } from './button';
import { dropdownDoc } from './dropdown';
import { inputGroupDoc } from './input-group';
import { tableDoc } from './table';

export const componentDocs: ComponentDoc[] = [
  alertDoc,
  badgeDoc,
  buttonDoc,
  dropdownDoc,
  inputGroupDoc,
  tableDoc,
];
