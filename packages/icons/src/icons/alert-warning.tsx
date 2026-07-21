import { forwardRef } from "react"
import { IconWrapper } from "../icon-wrapper"
import type { IconProps } from "../types"

/** Warning alert / exclamation in triangle @public */
export const AlertWarningIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ size, title, ...props }, ref) => (
    <IconWrapper ref={ref} viewBox="0 0 36 36" size={size} title={title} {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 16.68c0-2.664 0-3.997.315-4.445.314-.448 1.567-.877 4.072-1.734l.478-.164c1.306-.447 1.959-.67 2.635-.67.676 0 1.33.223 2.635.67l.478.164c2.505.857 3.758 1.286 4.072 1.734.315.448.315 1.78.315 4.445v1.313c0 4.698-3.532 6.978-5.749 7.946-.601.263-.902.394-1.751.394-.85 0-1.15-.131-1.751-.394-2.216-.968-5.749-3.248-5.749-7.946V16.68zm7.5-2.639c.345 0 .625.28.625.625V18a.625.625 0 11-1.25 0v-3.334c0-.345.28-.625.625-.625zm0 7.292a.833.833 0 100-1.666.833.833 0 000 1.666z"
      />
    </IconWrapper>
  ),
)
AlertWarningIcon.displayName = "AlertWarningIcon"
