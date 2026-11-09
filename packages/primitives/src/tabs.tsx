'use client';

import { cn } from '@ho-dev/utils';

import { createContext, useContext, forwardRef, useId } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

type TabsContextType = {
  baseId: string;
  value: string;
  onValueChange: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
};

const TabsContext = createContext<TabsContextType | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a <Tabs>');
  }
  return context;
}

type TabsListContextType = {
  variant: 'pills' | 'underline';
};

const TabsListContext = createContext<TabsListContextType>({ variant: 'pills' });

/** @public */
type TabsProps = {
  children: ReactNode;
  value: string;
  onValueChange: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
};

/**
 * Tabs container providing value/orientation context to TabsList,
 * TabsTrigger, and TabsContent. Fully controlled.
 * @public
 */
const Tabs = ({ children, value, onValueChange, orientation = 'horizontal' }: TabsProps) => {
  const baseId = useId();

  return (
    <TabsContext.Provider value={{ baseId, value, onValueChange, orientation }}>
      {children}
    </TabsContext.Provider>
  );
};

/** @public */
type TabsListProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'pills' | 'underline';
};

const NAVIGATION_KEYS = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'];

/**
 * Tab trail. `pills` = contained pill bar; `underline` = underline tab bar.
 * Implements roving tabindex and arrow/Home/End keyboard navigation.
 * @public
 */
const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ variant = 'pills', className, children, ...props }, ref) => {
    const { orientation, onValueChange } = useTabsContext();

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!NAVIGATION_KEYS.includes(event.key)) return;

      const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]'));
      if (tabs.length === 0) return;

      const currentIndex = tabs.indexOf(document.activeElement as HTMLElement);
      let nextIndex = currentIndex;

      if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = tabs.length - 1;
      else if (event.key === 'ArrowRight' || event.key === 'ArrowDown')
        nextIndex = currentIndex + 1 >= tabs.length ? 0 : currentIndex + 1;
      else nextIndex = currentIndex - 1 < 0 ? tabs.length - 1 : currentIndex - 1;

      event.preventDefault();
      const next = tabs[nextIndex];
      next.focus();
      const nextValue = next.dataset.value;
      if (nextValue) onValueChange(nextValue);
    };

    return (
      <TabsListContext.Provider value={{ variant }}>
        <div
          ref={ref}
          role="tablist"
          aria-orientation={orientation}
          onKeyDown={handleKeyDown}
          className={cn(
            'flex overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600',
            variant === 'pills'
              ? 'rounded-lg bg-gray-100 p-1 dark:bg-gray-900 [&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-track]:bg-transparent'
              : 'border-b border-gray-200 dark:border-gray-800',
            orientation === 'vertical' &&
              'w-full flex-row sm:w-[200px] sm:flex-col sm:space-y-2 sm:space-x-0 sm:overflow-x-visible sm:border-b-0',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TabsListContext.Provider>
    );
  },
);

TabsList.displayName = 'TabsList';

/** @public */
type TabsTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
};

/**
 * Tab button. Active styling depends on the parent TabsList variant and orientation.
 * @public
 */
const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, className, children, ...props }, ref) => {
    const { baseId, value: activeValue, onValueChange, orientation } = useTabsContext();
    const { variant } = useContext(TabsListContext);
    const active = value === activeValue;

    const base =
      'inline-flex items-center gap-2 whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out';

    let styleClass: string;
    if (orientation === 'vertical') {
      styleClass = active
        ? 'rounded-lg bg-brand-50 text-brand-500 dark:bg-brand-400/20 dark:text-brand-400'
        : 'rounded-lg bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200';
    } else if (variant === 'underline') {
      styleClass = active
        ? 'border-b-2 border-brand-500 text-brand-500 dark:border-brand-400 dark:text-brand-400'
        : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200';
    } else {
      styleClass = active
        ? 'rounded-md bg-white text-gray-900 shadow-theme-xs dark:bg-white/[0.03] dark:text-white'
        : 'rounded-md bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200';
    }

    return (
      <button
        ref={ref}
        id={`${baseId}-tab-${value}`}
        type="button"
        role="tab"
        aria-selected={active}
        aria-controls={`${baseId}-panel-${value}`}
        tabIndex={active ? 0 : -1}
        data-value={value}
        className={cn(base, styleClass, className)}
        onClick={() => onValueChange(value)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

TabsTrigger.displayName = 'TabsTrigger';

/** @public */
type TabsContentProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
};

/**
 * Tab panel. Renders only when its value matches the active tab.
 * @public
 */
const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, children, ...props }, ref) => {
    const { baseId, value: activeValue } = useTabsContext();
    if (value !== activeValue) return null;

    return (
      <div
        ref={ref}
        id={`${baseId}-panel-${value}`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${value}`}
        tabIndex={0}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TabsContent.displayName = 'TabsContent';

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
};
