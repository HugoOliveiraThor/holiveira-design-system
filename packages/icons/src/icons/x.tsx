import { forwardRef } from 'react';
import { IconWrapper } from '../icon-wrapper';
import type { IconProps } from '../types';

/** X / close / dismiss @public */
export const XIcon = forwardRef<SVGSVGElement, IconProps>(({ size, title, ...props }, ref) => (
  <IconWrapper ref={ref} viewBox="0 0 11 11" size={size} title={title} {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.23529 2.29669C0.942402 2.00379 0.942402 1.52892 1.23529 1.23603C1.52819 0.943134 2.00306 0.943134 2.29596 1.23603L5.37433 4.3144L8.45261 1.23612C8.7455 0.943225 9.22038 0.943225 9.51327 1.23612C9.80616 1.52901 9.80616 2.00389 9.51327 2.29678L6.43499 5.37506L9.51327 8.45334C9.80616 8.74624 9.80616 9.22111 9.51327 9.514C9.22038 9.8069 8.7455 9.8069 8.45261 9.514L5.37433 6.43572L2.29596 9.51409C2.00306 9.80699 1.52819 9.80699 1.23529 9.51409C0.942402 9.2212 0.942402 8.74633 1.23529 8.45343L4.31367 5.37506L1.23529 2.29669Z"
    />
  </IconWrapper>
));
XIcon.displayName = 'XIcon';
