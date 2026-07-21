import { forwardRef } from 'react';
import { IconWrapper } from '../icon-wrapper';
import type { IconProps } from '../types';

/** Error alert / exclamation in circle @public */
export const AlertErrorIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ size, title, ...props }, ref) => (
    <IconWrapper ref={ref} viewBox="0 0 32 32" size={size} title={title} {...props}>
      <path
        fill="currentColor"
        d="M12.796 11.723h0l3.698 3.707 3.71-3.692.354.353-.353-.354h0a.756.756 0 011.072 0 .755.755 0 010 1.073h-.001l-3.71 3.693 3.696 3.705s0 0 0 0a.755.755 0 010 1.073l-.353-.354.353.354a.768.768 0 01-.529.219c-.19 0-.39-.08-.529-.22l.354-.353-.354.354-3.71-3.707-3.698 3.706h0a.77.77 0 01-.53.22c-.188 0-.39-.08-.528-.22l.353-.353-.353.354a.755.755 0 010-1.073l3.684-3.705-3.699-3.707s0 0 0 0a.755.755 0 010-1.073.756.756 0 011.073 0z"
      />
    </IconWrapper>
  ),
);
AlertErrorIcon.displayName = 'AlertErrorIcon';
