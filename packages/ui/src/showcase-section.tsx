import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "@holiveira/utils"

interface ShowcaseSectionProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  children: ReactNode
}

const ShowcaseSection = ({
  title,
  children,
  className,
  ...props
}: ShowcaseSectionProps) => {
  const headingId = title.toLowerCase().replace(/\s+/g, "-")

  return (
    <section aria-labelledby={headingId}>
      <div
        className={cn(
          "rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card",
          className,
        )}
        {...props}
      >
        <h2
          id={headingId}
          className="border-b border-stroke px-4 py-4 font-medium text-dark dark:border-dark-3 dark:text-white sm:px-6 xl:px-7.5"
        >
          {title}
        </h2>

        <div className="p-4 sm:p-6 xl:p-10">{children}</div>
      </div>
    </section>
  )
}

ShowcaseSection.displayName = "ShowcaseSection"

export { ShowcaseSection, type ShowcaseSectionProps }
