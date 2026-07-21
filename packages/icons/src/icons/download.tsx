import { forwardRef } from "react"
import { IconWrapper } from "../icon-wrapper"
import type { IconProps } from "../types"

/** Download arrow @public */
export const DownloadIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ size, title, ...props }, ref) => (
    <IconWrapper ref={ref} viewBox="0 0 20 20" size={size} title={title} {...props}>
      <path
        fill="currentColor"
        d="M10.461 13.755a.625.625 0 01-.922 0L6.205 10.11a.625.625 0 11.923-.843l2.247 2.457V2.5a.625.625 0 111.25 0v9.223l2.247-2.457a.625.625 0 01.923.843l-3.334 3.646z"
      />
      <path
        fill="currentColor"
        d="M3.125 12.5a.625.625 0 10-1.25 0v.046c0 1.14 0 2.058.097 2.78.101.75.317 1.382.818 1.884.502.501 1.133.717 1.884.818.722.097 1.64.097 2.78.097h5.092c1.14 0 2.058 0 2.78-.097.75-.101 1.382-.317 1.884-.818.501-.502.717-1.134.818-1.884.097-.722.097-1.64.097-2.78V12.5a.625.625 0 10-1.25 0c0 1.196-.001 2.03-.086 2.66-.082.611-.233.935-.463 1.166-.23.23-.555.38-1.166.463-.63.085-1.464.086-2.66.086h-5c-1.196 0-2.03-.001-2.66-.086-.611-.082-.935-.233-1.166-.463-.23-.23-.38-.555-.463-1.166-.085-.63-.086-1.464-.086-2.66z"
      />
    </IconWrapper>
  ),
)
DownloadIcon.displayName = "DownloadIcon"
