import { cva, cn, type VariantProps } from '@holiveira/utils';

import type { HTMLAttributes } from 'react';

const cardVariants = cva('shadow-1 dark:bg-gray-dark rounded-[10px] bg-white', {
  variants: {
    variant: {
      default: 'dark:shadow-card',
      bordered: 'dark:shadow-card border-stroke dark:border-dark-3 border',
      ghost: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

const Card = ({ variant, className, ...props }: CardProps) => {
  return <div className={cn(cardVariants({ variant }), className)} {...props} />;
};

Card.displayName = 'Card';

export { Card, cardVariants, type CardProps };
