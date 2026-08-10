'use client';

import { cva, cn, type VariantProps } from '@ho-dev/utils';

import {
  cloneElement,
  forwardRef,
  isValidElement,
  useId,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

const tooltipVariants = cva(
  'absolute z-50 rounded-lg px-2.5 py-1.5 text-sm whitespace-nowrap transition-opacity',
  {
    variants: {
      variant: {
        default: 'shadow-theme-lg bg-white text-gray-700',
        dark: 'bg-gray-900 text-white',
      },
      placement: {
        top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
        right: 'top-1/2 left-full ml-2 -translate-y-1/2',
        bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
        left: 'top-1/2 right-full mr-2 -translate-y-1/2',
      },
    },
    defaultVariants: {
      variant: 'default',
      placement: 'top',
    },
  },
);

const tooltipArrow = cva('absolute h-2 w-2 rotate-45 border', {
  variants: {
    variant: {
      default: 'border-gray-200 bg-white',
      dark: 'border-gray-900 bg-gray-900',
    },
    placement: {
      top: '-bottom-1 left-1/2 -translate-x-1/2',
      right: 'top-1/2 -left-1 -translate-y-1/2',
      bottom: '-top-1 left-1/2 -translate-x-1/2',
      left: 'top-1/2 -right-1 -translate-y-1/2',
    },
  },
  defaultVariants: {
    variant: 'default',
    placement: 'top',
  },
});

/** @public */
type TooltipProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof tooltipVariants> & {
    content: ReactNode;
    arrow?: boolean;
    children: ReactNode;
  };

/**
 * Self-managed tooltip shown on hover/focus, with placement, variant, and arrow.
 * @public
 */
const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      placement = 'top',
      variant = 'default',
      arrow = true,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const tooltipId = useId();

    const trigger = isValidElement(children)
      ? cloneElement(children as React.ReactElement<{ 'aria-describedby'?: string }>, {
          'aria-describedby': open ? tooltipId : undefined,
        })
      : children;

    return (
      <span
        className="relative inline-flex"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        {trigger}
        <span
          ref={ref}
          role="tooltip"
          id={tooltipId}
          className={cn(
            tooltipVariants({ variant, placement }),
            open ? 'opacity-100' : 'pointer-events-none invisible opacity-0',
            className,
          )}
          {...props}
        >
          {content}
          {arrow && <span aria-hidden="true" className={tooltipArrow({ variant, placement })} />}
        </span>
      </span>
    );
  },
);

Tooltip.displayName = 'Tooltip';

export { Tooltip, tooltipVariants, tooltipArrow, type TooltipProps };
