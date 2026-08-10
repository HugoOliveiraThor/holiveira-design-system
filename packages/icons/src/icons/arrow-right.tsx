import { forwardRef } from 'react';

import { IconWrapper } from '../icon-wrapper';
import type { IconProps } from '../types';

/** Arrow pointing right @public */
export const ArrowRightIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ size, title, ...props }, ref) => (
    <IconWrapper ref={ref} viewBox="0 0 18 18" size={size} title={title} {...props}>
      <path
        fill="currentColor"
        d="M2.24922 8.38125H14.2586L9.47734 3.51562C9.22422 3.2625 9.22422 2.86875 9.47734 2.61562C9.73047 2.3625 10.1242 2.3625 10.3773 2.61562L16.1992 8.52187C16.4523 8.775 16.4523 9.16875 16.1992 9.42188L10.3773 15.3281C10.2648 15.4406 10.0961 15.525 9.92734 15.525C9.75859 15.525 9.61797 15.4687 9.47734 15.3562C9.22422 15.1031 9.22422 14.7094 9.47734 14.4563L14.2305 9.64687H2.24922C1.91172 9.64687 1.63047 9.36562 1.63047 9.02812C1.63047 8.6625 1.91172 8.38125 2.24922 8.38125Z"
      />
    </IconWrapper>
  ),
);
ArrowRightIcon.displayName = 'ArrowRightIcon';
