import type { ReactNode } from 'react';

import type { Crumb } from '../../lib/docs-metadata-query';

import { Breadcrumbs } from './breadcrumbs';
import { PageToc, type TocItem } from './page-toc';

export interface PageShellProps {
  breadcrumbs?: Crumb[];
  toc?: TocItem[];
  /** Lets a page with full-width previews drop the prose measure. */
  wide?: boolean;
  children: ReactNode;
}

/**
 * One layout for every documentation page: the breadcrumb trail, a prose column
 * capped at the 820px measure, and the in-page navigation on the right. The TOC
 * rail only exists from the wide breakpoint up, so a narrow window keeps a single
 * column instead of squeezing three.
 */
export function PageShell({ breadcrumbs = [], toc = [], wide = false, children }: PageShellProps) {
  return (
    <div className="w-full">
      {breadcrumbs.length > 0 && <Breadcrumbs crumbs={breadcrumbs} />}
      <div className="flex w-full items-start gap-10">
        <div className={wide ? 'min-w-0 flex-1' : 'w-full max-w-[820px] min-w-0 flex-1'}>
          {children}
        </div>
        {toc.length >= 2 && (
          <aside className="hidden w-[220px] shrink-0 xl:block">
            <PageToc items={toc} />
          </aside>
        )}
      </div>
    </div>
  );
}
