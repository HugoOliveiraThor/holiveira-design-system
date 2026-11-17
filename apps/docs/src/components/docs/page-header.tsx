import type { ReactNode } from 'react';

/** The chip the headers use for a category, a version or an install state. */
export const PAGE_CHIP_CLASS =
  'text-body-xs inline-flex items-center rounded-full border border-[var(--portal-border)] bg-[var(--portal-surface-2)] px-2.5 py-0.5 font-medium text-[var(--portal-muted)]';

/** The link treatment every header action and inline link shares. */
export const PAGE_LINK_CLASS =
  'text-body-sm font-medium text-[var(--portal-primary-strong)] hover:underline';

export interface PageHeaderProps {
  /** The one `h1` of the page. */
  title: string;
  /** The catalogue line above the title: package, export or section. */
  eyebrow?: ReactNode;
  /** Status and version chips beside the title. */
  badges?: ReactNode;
  /** The one-sentence summary under the title. */
  summary?: ReactNode;
  /** The links the header exposes, rendered in a labelled navigation. */
  actions?: ReactNode;
  actionsLabel?: string;
}

/**
 * The header every documentation surface renders: an eyebrow, one `h1` with its
 * status chips, the summary and the actions. One component keeps the hierarchy
 * identical on component, package, guide and index pages, so the surfaces cannot
 * drift apart.
 */
export function PageHeader({
  title,
  eyebrow,
  badges,
  summary,
  actions,
  actionsLabel = 'Page links',
}: PageHeaderProps) {
  return (
    <header data-page-header className="space-y-3 border-b border-[var(--portal-border)] pb-6">
      {eyebrow !== undefined && (
        <div className="text-body-xs flex flex-wrap items-center gap-2 text-[var(--portal-muted)]">
          {eyebrow}
        </div>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-heading-4 md:text-heading-3 font-bold text-[var(--portal-ink)]">
          {title}
        </h1>
        {badges}
      </div>
      {summary !== undefined && (
        <p className="text-body-2xlg text-[var(--portal-body)]">{summary}</p>
      )}
      {actions !== undefined && (
        <nav aria-label={actionsLabel} className="flex flex-wrap gap-4">
          {actions}
        </nav>
      )}
    </header>
  );
}
