/**
 * Font family definitions.
 * Maps semantic names to font stacks.
 */
export const fontFamily = {
  sans: "'Satoshi', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
} as const;

/**
 * Typography scale.
 * Maps semantic names (heading-1 through body-xs) to `{ fontSize, lineHeight }` objects.
 */
export const text = {
  'heading-1': { fontSize: '60px', lineHeight: '72px' },
  'heading-2': { fontSize: '48px', lineHeight: '58px' },
  'heading-3': { fontSize: '40px', lineHeight: '48px' },
  'heading-4': { fontSize: '35px', lineHeight: '45px' },
  'heading-5': { fontSize: '28px', lineHeight: '40px' },
  'heading-6': { fontSize: '24px', lineHeight: '30px' },
  'body-2xlg': { fontSize: '22px', lineHeight: '28px' },
  'body-sm': { fontSize: '14px', lineHeight: '22px' },
  'body-xs': { fontSize: '12px', lineHeight: '20px' },
} as const;
