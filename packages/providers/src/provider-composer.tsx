import { type ComponentType, type ReactNode } from "react"

/**
 * Standard props interface for any provider in the @holiveira framework.
 * Every provider must accept `children` as its only required prop.
 * @public
 */
export type ProviderProps = {
  children: ReactNode
}

/**
 * Ordered array of provider configurations.
 *
 * Providers are composed left-to-right (outermost to innermost):
 * `[A, B, C]` produces `<A><B><C>{children}</C></B></A>`.
 *
 * @example
 * ```ts
 * const tree: ProviderTree = [
 *   [ThemeProvider, { defaultTheme: "light" }],
 *   [SidebarProvider],
 * ]
 * ```
 * @public
 */
export type ProviderTree = Array<
  [ComponentType<ProviderProps>, Record<string, unknown>?]
>

/**
 * Props for the ProviderComposer component.
 * @public
 */
export type ProviderComposerProps = {
  tree: ProviderTree
  children: ReactNode
}

function composeProviders(tree: ProviderTree, children: ReactNode): ReactNode {
  return tree.reduceRight(
    (acc, [Provider, props]) => <Provider {...props}>{acc}</Provider>,
    children,
  )
}

/**
 * Flattens a ProviderTree into a single React element, replacing
 * deeply nested provider JSX with a declarative array.
 *
 * Each provider in the tree must accept `{ children: ReactNode }`.
 *
 * @example
 * ```tsx
 * const tree: ProviderTree = [
 *   [ThemeProvider, { defaultTheme: "light" }],
 *   [SidebarProvider],
 * ]
 *
 * return <ProviderComposer tree={tree}><App /></ProviderComposer>
 * ```
 * @public
 */
export function ProviderComposer({ tree, children }: ProviderComposerProps) {
  return <>{composeProviders(tree, children)}</>
}

ProviderComposer.displayName = "ProviderComposer"
