'use client';

import { cn } from '@ho-dev/utils';

import { createContext, useContext, forwardRef, type HTMLAttributes } from 'react';

type ListContextType = {
  orientation: 'vertical' | 'horizontal';
};

const ListContext = createContext<ListContextType>({ orientation: 'vertical' });

const listItemBase = 'flex items-center gap-2 px-3 py-2.5 text-sm text-gray-500 dark:text-gray-400';

/** @public */
type ListProps = Omit<HTMLAttributes<HTMLOListElement>, 'ref'> & {
  as?: 'ul' | 'ol';
  orientation?: 'vertical' | 'horizontal';
};

/**
 * List container (ul/ol) with vertical or horizontal orientation.
 * @public
 */
const List = forwardRef<HTMLOListElement, ListProps>(
  ({ as = 'ul', orientation = 'vertical', className, children, ...props }, ref) => {
    const Tag = as as 'ul' | 'ol';
    return (
      <ListContext.Provider value={{ orientation }}>
        <Tag
          ref={ref as React.Ref<HTMLUListElement & HTMLOListElement>}
          className={cn(
            'flex flex-col',
            as === 'ol' && 'list-decimal',
            orientation === 'horizontal' && 'md:flex-row',
            className,
          )}
          {...props}
        >
          {children}
        </Tag>
      </ListContext.Provider>
    );
  },
);

List.displayName = 'List';

/** @public */
type ListItemProps = HTMLAttributes<HTMLLIElement> & {
  marker?: 'dot' | 'none';
  icon?: React.ReactNode;
  asButton?: boolean;
  disabled?: boolean;
};

/**
 * List item with dot/icon marker, optional button behavior, and disabled state.
 * @public
 */
const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ marker = 'dot', icon, asButton, disabled, className, children, ...props }, ref) => {
    const { orientation } = useContext(ListContext);
    const borderClass = cn(
      'border-b border-gray-200 last:border-b-0 dark:border-gray-800',
      orientation === 'horizontal' && 'md:border-r md:border-b-0',
    );

    const content = (
      <>
        {icon !== undefined && (
          <span className="text-brand-500 dark:text-brand-400 shrink-0">{icon}</span>
        )}
        {icon === undefined && marker === 'dot' && (
          <span
            aria-hidden="true"
            className="ml-2 block h-[3px] w-[3px] shrink-0 rounded-full bg-gray-500 dark:bg-gray-400"
          />
        )}
        {children}
      </>
    );

    if (asButton) {
      return (
        <li ref={ref} className={cn(borderClass, className)} {...props}>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              listItemBase,
              'hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 w-full font-medium transition-colors disabled:opacity-50 dark:text-gray-400',
            )}
          >
            {content}
          </button>
        </li>
      );
    }

    return (
      <li ref={ref} className={cn(listItemBase, borderClass, className)} {...props}>
        {content}
      </li>
    );
  },
);

ListItem.displayName = 'ListItem';

export { List, ListItem, type ListProps, type ListItemProps };
