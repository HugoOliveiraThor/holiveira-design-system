import Link from 'next/link';

import type { Crumb } from '../../lib/docs-metadata-query';

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  if (crumbs.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb trail" className="mb-6 text-sm">
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;
          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && <span className="text-dark-4 dark:text-dark-6">/</span>}
              {crumb.href && !last ? (
                <Link
                  href={crumb.href}
                  className="text-dark-4 dark:text-dark-6 hover:text-primary dark:text-blue-light-400 dark:text-dark-6"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? 'page' : undefined}
                  className="text-dark-4 dark:text-dark-6"
                >
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
