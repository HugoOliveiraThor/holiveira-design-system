import { cn } from '@ho-dev/utils';

import type { HTMLAttributes } from 'react';

interface DescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

const Description = ({ className, children, ...props }: DescriptionProps) => {
  return (
    <p className={cn('text-sm text-gray-500 dark:text-gray-400', className)} {...props}>
      {children}
    </p>
  );
};
Description.displayName = 'Description';

export { Description, type DescriptionProps };
