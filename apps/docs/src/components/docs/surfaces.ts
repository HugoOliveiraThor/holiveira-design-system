/**
 * The surface strings the documentation pages share.
 *
 * One constant per surface keeps the landing tiles, the indexes and the content
 * pages identical; a page that inlines its own card or table drifts away from the
 * rest silently.
 */

/** The card tile: category grids, the component index and the package index. */
export const CARD_CLASS =
  'group flex items-center justify-between gap-4 rounded-xl border border-[var(--portal-border)] bg-[var(--portal-surface)] p-5 transition-colors hover:border-[var(--portal-primary-strong)]';

/** The box a table scrolls inside, so a wide table never widens the page. */
export const TABLE_WRAPPER_CLASS =
  'overflow-x-auto rounded-xl border border-[var(--portal-border)] bg-[var(--portal-surface)]';

export const TABLE_CLASS = 'w-full text-left';

export const TABLE_HEAD_CLASS =
  'border-b border-[var(--portal-border)] bg-[var(--portal-surface-2)]';

export const TABLE_HEAD_CELL_CLASS =
  'text-body-xs px-3 py-2 font-semibold tracking-wide text-[var(--portal-body)] uppercase';

export const TABLE_ROW_CLASS = 'border-b border-[var(--portal-border)] last:border-0';

export const TABLE_CELL_CLASS = 'text-body-sm px-3 py-2 align-top text-[var(--portal-body)]';
