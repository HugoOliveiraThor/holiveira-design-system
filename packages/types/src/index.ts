/**
 * @holiveira/types — Shared TypeScript types
 *
 * Universal, reusable types for the @holiveira framework.
 * Types-only — zero runtime code, zero dependencies.
 */

// Utility
export type { DeepPartial } from "./utility/deep-partial";
export type { Nullable } from "./utility/nullable";
export type { AsyncReturnType } from "./utility/async-return-type";

// React
export type { WithChildren } from "./react/with-children";
export type { WithClassName } from "./react/with-class-name";
export type { WithTestId } from "./react/with-test-id";
export type { InferComponentProps } from "./react/infer-component-props";
export type { SetStateActionType } from "./react/set-state-action-type";

// Domain
export type { IconProps } from "./domain/icon-props";
