import type { HTMLAttributes } from "react"
import { cva, cn, type VariantProps } from "@holiveira/utils"

const cardVariants = cva(
  "rounded-[10px] bg-white shadow-1 dark:bg-gray-dark",
  {
    variants: {
      variant: {
        default: "dark:shadow-card",
        bordered:
          "dark:shadow-card border border-stroke dark:border-dark-3",
        ghost: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = ({
  variant,
  className,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
}

Card.displayName = "Card"

export { Card, cardVariants, type CardProps }
