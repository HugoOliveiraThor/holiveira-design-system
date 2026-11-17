import localFont from 'next/font/local';

/**
 * Satoshi is the family the token stack promises, so the portal ships the face
 * itself instead of silently falling back to the system stack. `variable` is the
 * handle `portal.css` consumes; `fallback` makes the swap land on a comparable
 * sans stack.
 */
export const satoshiConfig = {
  src: './Satoshi-Variable.woff2',
  weight: '300 900',
  style: 'normal',
  display: 'swap' as const,
  variable: '--font-satoshi' as const,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
  adjustFontFallback: 'Arial' as const,
  preload: true,
};

export const satoshi = localFont(satoshiConfig);
