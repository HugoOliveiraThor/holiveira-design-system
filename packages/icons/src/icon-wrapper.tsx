import { forwardRef, useId } from "react"
import type { IconWrapperProps } from "./types"

export const IconWrapper = forwardRef<SVGSVGElement, IconWrapperProps>(
  ({ children, size = 24, title, viewBox, ...props }, ref) => {
    const titleId = useId()

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={viewBox}
        fill="currentColor"
        aria-hidden={title ? undefined : true}
        role={title ? "img" : "presentation"}
        focusable="false"
        aria-labelledby={title ? titleId : undefined}
        {...props}
      >
        {title && <title id={titleId}>{title}</title>}
        {children}
      </svg>
    )
  },
)

IconWrapper.displayName = "IconWrapper"
