/**
 * The assembled guide records.
 *
 * Each section's editorial content lives in a record file beside this one; this
 * module is the single place the app and the gate import the set from. The
 * routes arrive before the content, so the set grows one section at a time and
 * is always sorted by the order the sidebar and the pager read.
 */
import type { GuideDoc } from '../../lib/docs-metadata/guides';

import { architectureGuides } from './architecture';
import { foundationGuides } from './foundations';
import { gettingStartedGuides } from './getting-started';
import { guideFamilyGuides } from './guides';

export const guideDocs: GuideDoc[] = [
  ...gettingStartedGuides,
  ...foundationGuides,
  ...guideFamilyGuides,
  ...architectureGuides,
].sort((a, b) => a.order - b.order);
