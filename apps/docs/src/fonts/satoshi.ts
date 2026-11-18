import localFont from 'next/font/local';

/**
 * Satoshi is the family the token stack promises, so the portal ships the face
 * itself instead of silently falling back to the system stack. `variable` is the
 * handle `portal.css` consumes; `fallback` makes the swap land on a comparable
 * sans stack.
 *
 * The loader reads the options statically, so the object passed to `localFont`
 * has to be a literal. `satoshiConfig` mirrors it for the test that asserts the
 * contract; keep the two in step.
 */
export const satoshi = localFont({
  src: './Satoshi-Variable.woff2',
  weight: '300 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-satoshi',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
  adjustFontFallback: 'Arial',
  preload: true,
});

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
