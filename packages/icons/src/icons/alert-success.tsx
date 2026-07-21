import { forwardRef } from "react"
import { IconWrapper } from "../icon-wrapper"
import type { IconProps } from "../types"

/** Success alert / check in circle @public */
export const AlertSuccessIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ size, title, ...props }, ref) => (
    <IconWrapper ref={ref} viewBox="0 0 32 32" size={size} title={title} {...props}>
      <path
        fill="currentColor"
        d="M23.298 10.827l-.011-.015-.013-.014a.87.87 0 00-1.308-.004l-8.047 8.66-3.862-4.167a.87.87 0 00-1.309.003.976.976 0 000 1.3h0l.005.005 4.114 4.44c.277.305.662.465 1.029.465.396 0 .756-.165 1.028-.465l8.292-8.923a.98.98 0 00.082-1.285z"
      />
    </IconWrapper>
  ),
)
AlertSuccessIcon.displayName = "AlertSuccessIcon"
