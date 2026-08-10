'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@ho-dev/icons';
import { cn } from '@ho-dev/utils';

import { forwardRef, type HTMLAttributes } from 'react';

const navButtonClass =
  'flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 sm:px-3.5 sm:py-2.5';

const pageButtonClass = 'flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium';

const pageActiveClass = 'bg-primary text-white';

const pageInactiveClass =
  'text-gray-700 hover:bg-primary hover:text-white dark:text-gray-400 dark:hover:text-white';

/** @public */
type PaginationProps = HTMLAttributes<HTMLElement> & {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  prevLabel?: string;
  nextLabel?: string;
  showNumbers?: boolean;
  showMobileInfo?: boolean;
};

/**
 * Builds the page-number window (1 … page-1 page page+1 … totalPages).
 * Exported for testing.
 * @public
 */
function getPageItems(page: number, totalPages: number): Array<number | '...'> {
  const pages = new Set<number>();
  pages.add(1);
  pages.add(totalPages);
  for (let p = page - 1; p <= page + 1; p++) {
    if (p >= 1 && p <= totalPages) pages.add(p);
  }

  const sorted = Array.from(pages).sort((a, b) => a - b);
  const result: Array<number | '...'> = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) result.push('...');
    result.push(p);
    prev = p;
  }
  return result;
}

/**
 * Pagination with number trail (automatic ellipsis), prev/next buttons,
 * optional labels and icons.
 * @public
 */
const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      page,
      totalPages,
      onPageChange,
      prevLabel = 'Previous',
      nextLabel = 'Next',
      showNumbers = true,
      showMobileInfo = true,
      className,
      ...props
    },
    ref,
  ) => {
    const items = getPageItems(page, totalPages);

    return (
      <nav ref={ref} aria-label="Pagination" className={cn('px-6 py-4', className)} {...props}>
        <div className="flex items-center justify-between gap-2 sm:justify-normal">
          <button
            type="button"
            className={navButtonClass}
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            <ArrowLeftIcon size={20} />
            <span className="hidden sm:inline">{prevLabel}</span>
          </button>

          {showMobileInfo && (
            <span className="block text-sm font-medium text-gray-700 sm:hidden dark:text-gray-400">
              Page {page} of {totalPages}
            </span>
          )}

          {showNumbers && (
            <ul className="hidden items-center gap-0.5 sm:flex">
              {items.map((item, i) =>
                item === '...' ? (
                  <li key={`ellipsis-${i}`}>
                    <span className={cn(pageButtonClass, 'text-gray-700 dark:text-gray-400')}>
                      ...
                    </span>
                  </li>
                ) : (
                  <li key={item}>
                    <button
                      type="button"
                      className={cn(
                        pageButtonClass,
                        item === page ? pageActiveClass : pageInactiveClass,
                      )}
                      aria-current={item === page ? 'page' : undefined}
                      onClick={() => onPageChange(item)}
                    >
                      {item}
                    </button>
                  </li>
                ),
              )}
            </ul>
          )}

          <button
            type="button"
            className={navButtonClass}
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            <span className="hidden sm:inline">{nextLabel}</span>
            <ArrowRightIcon size={20} />
          </button>
        </div>
      </nav>
    );
  },
);

Pagination.displayName = 'Pagination';

export { Pagination, getPageItems, type PaginationProps };
