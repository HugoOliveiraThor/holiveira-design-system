'use client';

import { ChevronRightIcon } from '@ho-dev/icons';
import { cn } from '@ho-dev/utils';

import { forwardRef, type HTMLAttributes } from 'react';

const linkClass =
  'flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary';

const currentClass = 'flex items-center gap-1.5 text-sm text-gray-800 dark:text-white/90';

const dividerClass = 'text-gray-500 dark:text-gray-400';

/** @public */
type BreadcrumbItem = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
};

/** @public */
type BreadcrumbProps = HTMLAttributes<HTMLElement> & {
  items: BreadcrumbItem[];
  divider?: 'slash' | 'chevron' | 'dot';
};

/**
 * Content breadcrumb trail (nav > ol > li) with slash/chevron/dot dividers
 * and optional per-item icons. The last item without `href` is the current page.
 * @public
 */
const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, divider = 'slash', className, ...props }, ref) => {
    const gapClass = divider === 'dot' ? 'gap-2' : 'gap-1.5';

    return (
      <nav ref={ref} aria-label="Breadcrumb" className={className} {...props}>
        <ol className={cn('flex flex-wrap items-center', gapClass)}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const dividerEl =
              divider === 'slash' ? (
                <span className={dividerClass}>/</span>
              ) : divider === 'chevron' ? (
                <ChevronRightIcon size={16} className={dividerClass} />
              ) : (
                <span
                  aria-hidden="true"
                  className={cn(dividerClass, 'block h-1 w-1 rounded-full bg-gray-400')}
                />
              );

            return (
              <li key={`${item.label}-${index}`} className="flex items-center">
                {index > 0 && dividerEl}
                {item.href && !isLast ? (
                  <a href={item.href} className={linkClass}>
                    {item.icon && <span className="shrink-0">{item.icon}</span>}
                    {item.label}
                  </a>
                ) : (
                  <span aria-current={isLast ? 'page' : undefined} className={currentClass}>
                    {item.icon && !isLast && <span className="shrink-0">{item.icon}</span>}
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

Breadcrumb.displayName = 'Breadcrumb';

export { Breadcrumb, type BreadcrumbProps, type BreadcrumbItem };
