'use client';

import { cn } from '@ho-dev/utils';

import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

import type { AvatarProps } from './avatar';

const avatarGroupSizes: Record<string, string> = {
  xs: '-space-x-1.5',
  sm: '-space-x-2',
  md: '-space-x-2.5',
  lg: '-space-x-3',
  xl: '-space-x-3.5',
  '2xl': '-space-x-4',
};

const avatarGroupOverflowSizes: Record<string, string> = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-sm',
  xl: 'h-14 w-14 text-sm',
  '2xl': 'h-16 w-16 text-sm',
};

/** @public */
type AvatarGroupProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  size?: AvatarProps['size'];
  max?: number;
};

/**
 * Stacked avatars with overlap. Accepts Avatar children; `size` applies to
 * children lacking an explicit size. Renders a `+N` overflow chip when the
 * child count exceeds `max` (default 4).
 * @public
 */
const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, size = 'md', max = 4, className, ...props }, ref) => {
    const avatars = Children.toArray(children).filter(isValidElement);
    const shown = avatars.slice(0, max);
    const hidden = avatars.length - shown.length;
    const key = size ?? 'md';

    const rendered = useMemo(
      () =>
        shown.map((child) => {
          const props = (child as React.ReactElement<Partial<AvatarProps>>).props;
          const childSize = props.size ?? size;
          return cloneElement(child as React.ReactElement<AvatarProps>, { size: childSize });
        }),
      [shown, size],
    );

    return (
      <div
        ref={ref}
        className={cn('flex items-center', avatarGroupSizes[key], className)}
        {...props}
      >
        {rendered}
        {hidden > 0 && (
          <div
            className={cn(
              'flex items-center justify-center rounded-full bg-gray-200 font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300',
              avatarGroupOverflowSizes[key],
            )}
          >
            +{hidden}
          </div>
        )}
      </div>
    );
  },
);

AvatarGroup.displayName = 'AvatarGroup';

export { AvatarGroup, type AvatarGroupProps };
