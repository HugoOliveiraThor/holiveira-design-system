/**
 * @holiveira/tokens — Design Tokens
 *
 * The single source of truth for all visual primitives.
 * CSS custom properties are available via `@import "@holiveira/tokens/tokens.css"`.
 */

export { colors } from "./colors";
export type { ColorKey } from "./colors";

export { containers, breakpoints } from "./spacing";
export type { Breakpoint } from "./spacing";

export { fontFamily, text } from "./typography";

export { shadows } from "./shadows";

/** Generic type for design token string values. */
export type TokenValue = string;
