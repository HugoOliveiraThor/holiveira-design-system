import { cn } from '@ho-dev/utils';

import { forwardRef } from 'react';
import type { HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from 'react';

/** @public */
type TableProps = HTMLAttributes<HTMLTableElement> & {
  'aria-label'?: string;
};

/**
 * Table wrapper with scroll container. Compound with TableHeader, TableBody,
 * TableFooter, TableRow, TableHead, and TableCell sub-components.
 * @public
 */
const Table = forwardRef<HTMLDivElement, TableProps>(({ className, ...props }, ref) => (
  <div ref={ref} className="relative w-full overflow-auto">
    <table className={cn('w-full', className)} {...props} />
  </div>
));

Table.displayName = 'Table';

/**
 * Table `<thead>` wrapper.
 * @public
 */
function TableHeader({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn('border-b border-gray-100 dark:border-white/[0.05]', className)}
      {...props}
    />
  );
}

TableHeader.displayName = 'TableHeader';

/**
 * Table `<tbody>` wrapper.
 * @public
 */
function TableBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={cn('divide-y divide-gray-100 dark:divide-white/[0.05]', className)}
      {...props}
    />
  );
}

TableBody.displayName = 'TableBody';

/**
 * Table `<tfoot>` wrapper.
 * @public
 */
function TableFooter({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tfoot
      className={cn(
        'border-t bg-neutral-100/50 font-medium dark:bg-neutral-800/50 [&>tr]:last:border-b-0',
        className,
      )}
      {...props}
    />
  );
}

TableFooter.displayName = 'TableFooter';

/**
 * Table `<tr>` wrapper.
 * @public
 */
function TableRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        'border-b border-gray-100 transition-colors hover:bg-gray-50 data-[state=selected]:bg-gray-50 dark:border-white/[0.05] dark:hover:bg-white/[0.03] dark:data-[state=selected]:bg-white/[0.03]',
        className,
      )}
      {...props}
    />
  );
}

TableRow.displayName = 'TableRow';

/**
 * Table `<th>` wrapper.
 * @public
 */
function TableHead({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        'px-5 py-3 text-start align-middle text-xs font-medium text-gray-500 dark:text-gray-400 [&:has([role=checkbox])]:pr-0',
        className,
      )}
      {...props}
    />
  );
}

TableHead.displayName = 'TableHead';

/**
 * Table `<td>` wrapper.
 * @public
 */
function TableCell({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn(
        'px-5 py-4 align-middle text-sm text-gray-500 dark:text-gray-400 [&:has([role=checkbox])]:pr-0',
        className,
      )}
      {...props}
    />
  );
}

TableCell.displayName = 'TableCell';

export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell };
