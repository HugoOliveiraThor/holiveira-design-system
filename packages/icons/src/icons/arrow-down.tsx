import { forwardRef } from 'react';
import { IconWrapper } from '../icon-wrapper';
import type { IconProps } from '../types';

/** Arrow pointing down @public */
export const ArrowDownIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ size, title, ...props }, ref) => (
    <IconWrapper ref={ref} viewBox="0 0 10 10" size={size} title={title} {...props}>
      <path
        fill="currentColor"
        d="M5.643 7.607L9.09 4.255l.909.884L5 10 0 5.139l.909-.884 3.448 3.353V0h1.286v7.607z"
      />
    </IconWrapper>
  ),
);
ArrowDownIcon.displayName = 'ArrowDownIcon';
