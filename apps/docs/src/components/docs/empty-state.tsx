import type { ReactNode } from 'react';

/**
 * The designed empty state: a dashed surface with an icon, a bold line and an
 * optional hint. A section with nothing to show renders this instead of a bare
 * paragraph, so an empty section still reads as part of the page.
 */
export function EmptyState({ title, hint }: { title: string; hint?: ReactNode }) {
  return (
    <div
      data-empty-state
      role="note"
      className="flex items-start gap-3 rounded-xl border border-dashed border-[var(--portal-border)] bg-[var(--portal-surface-2)] p-4"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mt-0.5 size-4 shrink-0 text-[var(--portal-muted)]"
      >
        <circle cx="10" cy="10" r="7" />
        <path d="M10 6.5v4M10 13.5h.01" />
      </svg>
      <div>
        <p className="text-body-sm font-medium text-[var(--portal-ink)]">{title}</p>
        {hint !== undefined && (
          <p className="text-body-xs mt-1 text-[var(--portal-muted)]">{hint}</p>
        )}
      </div>
    </div>
  );
}
