import { cva, cn, type VariantProps } from '@ho-dev/utils';

import { forwardRef, type HTMLAttributes } from 'react';

const cardVariants = cva(
  'rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]',
  {
    variants: {
      variant: {
        default: '',
        bordered: 'shadow-theme-xs',
        ghost: 'border-transparent bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(({ variant, className, ...props }, ref) => {
  return <div ref={ref} className={cn(cardVariants({ variant }), className)} {...props} />;
});

Card.displayName = 'Card';

export { Card, cardVariants, type CardProps };
