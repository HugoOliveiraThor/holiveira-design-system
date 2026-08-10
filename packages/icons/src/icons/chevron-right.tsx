import { forwardRef } from 'react';

import { IconWrapper } from '../icon-wrapper';
import type { IconProps } from '../types';

/** Chevron pointing right @public */
export const ChevronRightIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ size, title, ...props }, ref) => (
    <IconWrapper ref={ref} viewBox="0 0 17 16" size={size} title={title} {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
      />
    </IconWrapper>
  ),
);
ChevronRightIcon.displayName = 'ChevronRightIcon';
