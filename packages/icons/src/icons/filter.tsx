import { forwardRef } from 'react';

import { IconWrapper } from '../icon-wrapper';
import type { IconProps } from '../types';

/** Funnel filter @public */
export const FilterIcon = forwardRef<SVGSVGElement, IconProps>(({ size, title, ...props }, ref) => (
  <IconWrapper ref={ref} viewBox="0 0 20 20" size={size} title={title} {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.29004 5.90393H17.7067C18.1209 5.90393 18.4567 6.23972 18.4567 6.65393C18.4567 7.06815 18.1209 7.40393 17.7067 7.40393H2.29004C1.87583 7.40393 1.54004 7.06815 1.54004 6.65393C1.54004 6.23972 1.87583 5.90393 2.29004 5.90393ZM4.95671 9.63226H15.0433C15.4575 9.63226 15.7933 9.96804 15.7933 10.3823C15.7933 10.7965 15.4575 11.1323 15.0433 11.1323H4.95671C4.5425 11.1323 4.20671 10.7965 4.20671 10.3823C4.20671 9.96804 4.5425 9.63226 4.95671 9.63226ZM7.37337 13.4606H12.6266C13.0408 13.4606 13.3766 13.7964 13.3766 14.2106C13.3766 14.6248 13.0408 14.9606 12.6266 14.9606H7.37337C6.95916 14.9606 6.62337 14.6248 6.62337 14.2106C6.62337 13.7964 6.95916 13.4606 7.37337 13.4606Z"
    />
  </IconWrapper>
));
FilterIcon.displayName = 'FilterIcon';
