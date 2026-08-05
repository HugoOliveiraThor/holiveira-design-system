'use client';

import { buttonVariants } from '@holiveira/primitives';
import type { ButtonProps } from '@holiveira/primitives';
import { cn } from '@holiveira/utils';

import {
  Children,
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
} from 'react';

interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md';
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

        const positionClasses =
          orientation === 'horizontal'
            ? cn(isFirst && 'rounded-l-lg', !isFirst && '-ml-px', isLast && 'rounded-r-lg')
            : cn(isFirst && 'rounded-t-lg', !isFirst && '-mt-px', isLast && 'rounded-b-lg');

        const buttonChild = child as ReactElement<ButtonProps>;

        return cloneElement(buttonChild, {
          variant,
          size,
          className: cn(
            buttonVariants({ variant, size }),
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
