import { cn } from '@ho-dev/utils';

import { forwardRef, type HTMLAttributes } from 'react';

type CardImageProps = Omit<HTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
  src: string;
  alt: string;
  orientation?: 'top' | 'left';
};

const CardImage = forwardRef<HTMLImageElement, CardImageProps>(
  ({ src, alt, orientation = 'top', className, ...props }, ref) => {
    return (
      <div
        className={cn(
          'overflow-hidden rounded-lg',
          orientation === 'top' ? 'mb-5' : 'shrink-0',
          className,
        )}
      >
        <img
          ref={ref}
          src={src}
          alt={alt}
          className="w-full overflow-hidden rounded-lg"
          {...props}
        />
      </div>
    );
  },
);

CardImage.displayName = 'CardImage';

export { CardImage, type CardImageProps };
