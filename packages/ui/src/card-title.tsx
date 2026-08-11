import { cn } from '@ho-dev/utils';

import { forwardRef, type HTMLAttributes } from 'react';

type CardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h2' | 'h3' | 'h4';
};

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ as: Tag = 'h4', className, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={cn(
          'mb-1 text-[20px] leading-[30px] font-medium text-gray-800 dark:text-white/90',
          className,
        )}
        {...props}
      />
    );
  },
);

CardTitle.displayName = 'CardTitle';

export { CardTitle, type CardTitleProps };
