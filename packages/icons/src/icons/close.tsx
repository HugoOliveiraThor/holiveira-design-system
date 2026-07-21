import { forwardRef } from 'react';
import { IconWrapper } from '../icon-wrapper';
import type { IconProps } from '../types';

/** Close / dismiss @public */
export const CloseIcon = forwardRef<SVGSVGElement, IconProps>(({ size, title, ...props }, ref) => (
  <IconWrapper ref={ref} viewBox="0 0 25 24" size={size} title={title} {...props}>
    <path
      fill="currentColor"
      d="M12.998 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95 1.414-1.414 4.95 4.95z"
    />
  </IconWrapper>
));
CloseIcon.displayName = 'CloseIcon';
