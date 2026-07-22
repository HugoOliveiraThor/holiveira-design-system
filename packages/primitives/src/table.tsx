import { cn } from '@holiveira/utils';
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
    <table className={cn('w-full caption-bottom text-sm', className)} {...props} />
  </div>
));

Table.displayName = 'Table';

/**
 * Table `<thead>` wrapper.
 * @public
 */
function TableHeader({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn('[&_tr]:border-b', className)} {...props} />;
}

TableHeader.displayName = 'TableHeader';

/**
 * Table `<tbody>` wrapper.
 * @public
 */
function TableBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />;
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
        'dark:border-dark-3 dark:hover:bg-dark-2 border-b transition-colors hover:bg-neutral-100/50 data-[state=selected]:bg-neutral-100 dark:data-[state=selected]:bg-neutral-800',
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
        'h-12 px-4 text-left align-middle font-medium text-neutral-500 dark:text-neutral-400 [&:has([role=checkbox])]:pr-0',
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
    <td className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)} {...props} />
  );
}

TableCell.displayName = 'TableCell';

export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell };
