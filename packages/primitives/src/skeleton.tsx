import { cn } from "@holiveira/utils"
import type { HTMLAttributes } from "react"

/** @public */
type SkeletonProps = HTMLAttributes<HTMLDivElement>

/**
 * Loading placeholder with pulse animation.
 * @public
 */
function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden={true}
      className={cn(
        "animate-pulse rounded-md bg-neutral-100 dark:bg-dark-2",
        className,
      )}
      {...props}
    />
  )
}

Skeleton.displayName = "Skeleton"

export { Skeleton, type SkeletonProps }
