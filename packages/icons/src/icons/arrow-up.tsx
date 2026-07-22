import { forwardRef } from 'react';

import { IconWrapper } from '../icon-wrapper';
import type { IconProps } from '../types';

/** Arrow pointing up @public */
export const ArrowUpIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ size, title, ...props }, ref) => (
    <IconWrapper ref={ref} viewBox="0 0 10 10" size={size} title={title} {...props}>
      <path
        fill="currentColor"
        d="M4.357 2.393L.91 5.745 0 4.861 5 0l5 4.861-.909.884-3.448-3.353V10H4.357V2.393z"
      />
    </IconWrapper>
  ),
);
ArrowUpIcon.displayName = 'ArrowUpIcon';
