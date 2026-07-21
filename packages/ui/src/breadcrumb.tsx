import Link from "next/link"
import type { HTMLAttributes } from "react"
import { cn } from "@holiveira/utils"

interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  pageName: string
}

const Breadcrumb = ({ pageName, className, ...props }: BreadcrumbProps) => {
  return (
    <div
      className={cn(
        "mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
      {...props}
    >
      <h2 className="text-[26px] font-bold leading-[30px] text-dark dark:text-white">
        {pageName}
      </h2>

      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href="/">
              Dashboard /
            </Link>
          </li>
          <li aria-current="page" className="font-medium text-primary">
            {pageName}
          </li>
        </ol>
      </nav>
    </div>
  )
}

Breadcrumb.displayName = "Breadcrumb"

export { Breadcrumb, type BreadcrumbProps }
