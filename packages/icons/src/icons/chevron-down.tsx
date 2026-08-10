import { forwardRef } from 'react';

import { IconWrapper } from '../icon-wrapper';
import type { IconProps } from '../types';

/** Chevron pointing down @public */
export const ChevronDownIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ size, title, ...props }, ref) => (
    <IconWrapper ref={ref} viewBox="0 0 20 20" size={size} title={title} {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.79199 7.396L10.0003 12.6043L15.2087 7.396"
      />
    </IconWrapper>
  ),
);
ChevronDownIcon.displayName = 'ChevronDownIcon';
