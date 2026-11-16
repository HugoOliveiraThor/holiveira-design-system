import { cn, cva, type VariantProps } from '@ho-dev/utils';

/** Variants live beside the component and merge through `cn`. */
const badge = cva('inline-flex items-center rounded-full px-2 py-1 text-xs', {
  variants: {
    tone: {
      neutral: 'bg-gray-2 text-dark-4 dark:bg-dark-2 dark:text-dark-6',
      primary: 'bg-primary text-white',
    },
  },
  defaultVariants: { tone: 'neutral' },
});

type BadgeStyleProps = VariantProps<typeof badge>;

export function badgeClassName({ tone, className }: BadgeStyleProps & { className?: string }) {
  return cn(badge({ tone }), className);
}
