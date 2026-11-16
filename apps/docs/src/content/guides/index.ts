/**
 * The assembled guide records.
 *
 * Each route's editorial content lives in a record file beside this one; this
 * module is the single place the app and the gate import the set from. The
 * routes arrive before the content, so the set starts empty and every route
 * resolves it through `guideBySlug`.
 */
import type { GuideDoc } from '../../lib/docs-metadata/guides';

export const guideDocs: GuideDoc[] = [];
