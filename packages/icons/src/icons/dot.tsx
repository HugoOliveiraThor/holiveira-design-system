import { forwardRef } from "react"
import { IconWrapper } from "../icon-wrapper"
import type { IconProps } from "../types"

/** Dot / status indicator @public */
export const DotIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ size, title, ...props }, ref) => (
    <IconWrapper ref={ref} viewBox="0 0 2 3" size={size} title={title} {...props}>
      <circle cx={1} cy={1.5} r={1} fill="currentColor" />
    </IconWrapper>
  ),
)
DotIcon.displayName = "DotIcon"
