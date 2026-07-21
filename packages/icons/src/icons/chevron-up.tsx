import { forwardRef } from "react"
import { IconWrapper } from "../icon-wrapper"
import type { IconProps } from "../types"

/** Chevron pointing up @public */
export const ChevronUpIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ size, title, ...props }, ref) => (
    <IconWrapper ref={ref} viewBox="0 0 22 22" size={size} title={title} {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.551 7.728a.687.687 0 01.895 0l6.417 5.5a.687.687 0 11-.895 1.044l-5.97-5.117-5.969 5.117a.687.687 0 01-.894-1.044l6.416-5.5z"
      />
    </IconWrapper>
  ),
)
ChevronUpIcon.displayName = "ChevronUpIcon"
