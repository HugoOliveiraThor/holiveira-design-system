import { cn } from '@ho-dev/utils';

import { forwardRef, type HTMLAttributes } from 'react';

type CardContentProps = HTMLAttributes<HTMLDivElement>;

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn(className)} {...props} />;
});

CardContent.displayName = 'CardContent';

export { CardContent, type CardContentProps };
