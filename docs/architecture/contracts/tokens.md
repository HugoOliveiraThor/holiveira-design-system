# Package Contract: @ho-dev/tokens

Level: 1 Category: Foundation

## Purpose

Define the single source of truth for all visual primitives (colors, spacing, typography, shadows,
breakpoints).

## Responsibilities

- Generate CSS custom properties consumed by all packages
- Export TypeScript constants for programmatic access
- Provide design token naming convention

## Allowed Dependencies

- (none)

## Forbidden Dependencies

- Any framework package or application

## Public API

- CSS custom properties (`--color-*`, `--container-*`, `--text-*`, `--shadow-*`, `--breakpoint-*`,
  `--font-*`, `--min-width-*`, `--aspect-*`, `--animate-*`)
- TypeScript token objects (`colors`, `containers`, `breakpoints`, `fontFamily`, `text`, `shadows`)
- Additional token objects (`minWidth`, `aspectRatio`, `animate`)
- `TokenValue` type
- `ColorKey` type
- `Breakpoint` type

TypeScript object keys are the CSS suffix after the token prefix, with CSS escapes resolved (the
typography scale keeps its `fontSize`/`lineHeight` fields): `--container-2_5` → `containers['2_5']`,
`--aspect-4\/3` → `aspectRatio['4/3']`, `--animate-spin-1_5` → `animate['spin-1_5']`.

## Internal API

- (none — tokens have no internal surface)

## Compatibility

`@ho-dev/tokens` records its public surface in `packages/tokens/tokens.snapshot.json`: every
`@theme` custom property and every exported TypeScript token path. `pnpm run check:tokens` compares
the live surface with that snapshot and fails on any difference.

| Change                   | Classification  | Action                                                                   |
| ------------------------ | --------------- | ------------------------------------------------------------------------ |
| Token added              | `added`         | Bump the patch version, then record the snapshot                         |
| Token removed or renamed | `removed`       | Breaking: new ADS approved by the ARB, then a `0.x → 0.(x+1)` minor bump |
| Token value changed      | `value-changed` | Breaking: same as a removal                                              |

A rename appears as a removal plus an addition; the removal makes it breaking.

### Commands

```bash
pnpm run check:tokens                                    # blocking gate
pnpm run generate:tokens:snapshot                        # additive: after a patch bump
pnpm run generate:tokens:snapshot -- --approval ads-NNN  # breaking: after ARB approval
```

The snapshot command refuses to write when the version does not advance, when a breaking change
lacks an approval reference, when the reference matches no `docs/architecture/ads-NNN*.md`, or when
a breaking change is not a breaking bump. A breaking change below `1.0` needs a minor bump; from
`1.0` it needs a major bump. Additions need no approval.

### Baseline corrections

A snapshot that has never been published may be corrected when the recording tool itself was wrong,
for example a parser that dropped declarations. The correction PR states the tooling defect and the
before/after counts; deleting the file and rerunning `pnpm run generate:tokens:snapshot` is allowed
only under that condition. It is never a path to accept a change to a real token: once the snapshot
has shipped, a removal or a repaint needs a new ADS.
