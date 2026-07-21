import type { ReactNode } from "react"

/** Props for all icon components. Icons inherit text color via `currentColor`. */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** Width/height in px (number) or CSS unit (string). Default 24. */
  size?: number | string
  /** Accessible label. When set, icon becomes `role="img"` with `<title>`. */
  title?: string
}

export interface IconWrapperProps extends IconProps {
  children: ReactNode
  viewBox: string
}
