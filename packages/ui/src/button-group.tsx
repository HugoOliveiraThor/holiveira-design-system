'use client';

import type { ButtonProps } from '@holiveira/primitives';
import { cn } from '@holiveira/utils';

import {
  Children,
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
} from 'react';

const segmentClasses: Record<'primary' | 'outline', Record<'active' | 'inactive', string>> = {
  primary: {
    active: 'bg-primary text-white ring-1 ring-inset ring-primary hover:bg-primary/90',
    inactive:
      'bg-transparent text-primary ring-1 ring-inset ring-primary hover:bg-primary hover:text-white',
  },
  outline: {
    active:
      'bg-transparent text-gray-800 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:bg-white/[0.03] dark:text-gray-200 dark:ring-gray-700 dark:hover:bg-white/[0.03]',
    inactive:
      'bg-transparent text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03]',
  },
};

const sizeClasses = {
  sm: 'px-4 py-3 text-sm',
  md: 'px-5 py-3.5 text-sm',
} as const;

interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'outline';
  size?: keyof typeof sizeClasses;
  orientation?: 'horizontal' | 'vertical';
}

const ButtonGroup = ({
  variant = 'primary',
  size = 'md',
  orientation = 'horizontal',
  className,
  children,
  ...props
}: ButtonGroupProps) => {
  const count = Children.count(children);

  const groupClasses = cn(
    'shadow-theme-xs inline-flex items-center',
    orientation === 'vertical' && 'flex-col items-stretch',
    className,
  );

  return (
    <div role="group" className={groupClasses} {...props}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;

        const isFirst = index === 0;
        const isLast = index === count - 1;

        const segment = isFirst ? 'active' : 'inactive';
        const segmentClassesValue = segmentClasses[variant][segment];

        const positionClasses =
          orientation === 'horizontal'
            ? cn(
                'rounded-none',
                isFirst && 'rounded-l-lg',
                !isFirst && '-ml-px',
                isLast && 'rounded-r-lg',
              )
            : cn(
                'rounded-none',
                isFirst && 'rounded-t-lg',
                !isFirst && '-mt-px',
                isLast && 'rounded-b-lg',
              );

        const buttonChild = child as ReactElement<ButtonProps>;

        return cloneElement(buttonChild, {
          className: cn(
            'inline-flex items-center justify-center gap-2 font-medium transition disabled:cursor-not-allowed disabled:opacity-50',
            sizeClasses[size],
            segmentClassesValue,
            positionClasses,
            buttonChild.props.className,
          ),
        });
      })}
    </div>
  );
};

ButtonGroup.displayName = 'ButtonGroup';

export { ButtonGroup, type ButtonGroupProps };
