import Link from 'next/link';

import type { Pager as PagerState } from '../../lib/docs-metadata-query';

export interface PagerItem {
  id: string;
  label: string;
  href: string;
}

export function Pager({ pager }: { pager: PagerState<PagerItem> }) {
  if (!pager.previous && !pager.next) return null;
  return (
    <nav
      aria-label="Previous and next"
      className="border-stroke dark:border-stroke-dark mt-12 flex justify-between gap-4 border-t pt-6 text-sm"
    >
      {pager.previous ? (
        <Link
          href={pager.previous.href}
          rel="prev"
          className="text-primary dark:text-blue-light-400 hover:underline"
        >
          Previous: {pager.previous.label}
        </Link>
      ) : (
        <span />
      )}
      {pager.next ? (
        <Link
          href={pager.next.href}
          rel="next"
          className="text-primary dark:text-blue-light-400 ml-auto hover:underline"
        >
          Next: {pager.next.label}
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
