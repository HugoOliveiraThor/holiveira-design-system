'use client';

import { cva, cn, type VariantProps } from '@ho-dev/utils';

import { forwardRef, useMemo, useState, type HTMLAttributes } from 'react';

const avatarVariants = cva('relative shrink-0 rounded-full', {
  variants: {
    size: {
      xs: 'h-6 w-6',
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-14 w-14',
      '2xl': 'h-16 w-16',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const avatarStatusVariants = cva(
  'absolute right-0 bottom-0 rounded-full border-[1.5px] border-white dark:border-gray-900',
  {
    variants: {
      size: {
        xs: 'h-1.5 w-1.5',
        sm: 'h-2 w-2',
        md: 'h-2.5 w-2.5',
        lg: 'h-3 w-3',
        xl: 'h-3.5 w-3.5',
        '2xl': 'h-4 w-4',
      },
      status: {
        online: 'bg-success-500',
        offline: 'bg-error-500',
        busy: 'bg-warning-500',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

/** @public */
type AvatarProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof avatarVariants> & {
    src?: string;
    alt: string;
    name?: string;
    status?: 'online' | 'offline' | 'busy';
  };

/**
 * Circular avatar with optional status indicator and initials fallback.
 * @public
 */
const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, name, size, status, className, ...props }, ref) => {
    const [error, setError] = useState(false);
    const showImage = src !== undefined && !error;

    const initials = useMemo(() => {
      if (!name) return '?';
      return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase() ?? '')
        .join('');
    }, [name]);

    return (
      <div ref={ref} className={cn(avatarVariants({ size }), className)} {...props}>
        {showImage ? (
          <img
            src={src}
            alt={alt}
            onError={() => setError(true)}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            {initials}
          </div>
        )}
        {status && <span aria-hidden="true" className={avatarStatusVariants({ size, status })} />}
      </div>
    );
  },
);

Avatar.displayName = 'Avatar';

export { Avatar, avatarVariants, avatarStatusVariants, type AvatarProps };
