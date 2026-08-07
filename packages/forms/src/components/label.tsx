import { cn } from '@ho-dev/utils';

import type { LabelHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

const Label = ({ className, children, ...props }: LabelProps) => {
  return (
    <label
      className={cn('text-body-sm text-dark mb-1 block font-medium dark:text-white', className)}
      {...props}
    >
      {children}
    </label>
  );
};
Label.displayName = 'Label';

export { Label, type LabelProps };
