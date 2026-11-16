# `@ho-dev/docs`

Private Next.js app for the Holiveira documentation platform (M12). It builds a static export served
under `/holiveira-design-system/docs`, consumes public `@ho-dev/*` packages, and never imports a
private package or package internals.

## Commands

| Command                                  | Purpose                                          |
| ---------------------------------------- | ------------------------------------------------ |
| `pnpm --filter @ho-dev/docs dev`         | Development server on port 3001                  |
| `pnpm --filter @ho-dev/docs build`       | Static export into `apps/docs/out`               |
| `pnpm --filter @ho-dev/docs test:export` | Build and verify the export contract             |
| `pnpm run generate:docs:metadata`        | Write the generated metadata from source         |
| `pnpm run check:docs:metadata`           | Fail when committed metadata differs from source |

## Generated metadata

Facts come from source; `apps/docs/src/content/catalog.ts` supplies the editorial classification.
Both are validated by `check:docs:metadata`, which runs in `all-checks`. The files are committed so
a metadata change is visible in review, and `apps/docs/src/generated/` is excluded from Prettier
because the renderer owns those bytes.

### `registry.json`

One record per public package, sorted by name:

| Field          | Meaning                                                                |
| -------------- | ---------------------------------------------------------------------- |
| `name`         | Package name (`@ho-dev/<name>`)                                        |
| `version`      | Version from the package manifest                                      |
| `description`  | Manifest description                                                   |
| `private`      | Always `false`; private packages are excluded                          |
| `installState` | `pre-release` while the version is `0.x`, otherwise `published`        |
| `exports`      | Runtime export names from the public barrel, sorted                    |
| `category`     | Catalogue section (`Foundation`, `Utilities`, `Components`, `Tooling`) |

### `api.json`

One record per catalogue component, sorted by id:

| Field        | Meaning                                                                      |
| ------------ | ---------------------------------------------------------------------------- |
| `id`         | Route slug (`button`, `page-header`)                                         |
| `package`    | Owning package                                                               |
| `exportName` | Public export (`Button`)                                                     |
| `props`      | `name`, `type`, `required`, `default`, `origin` (`component` or `inherited`) |
| `variants`   | Per variant: `name`, `values`, `default` from `defaultVariants`              |

Inherited native props are limited to the documented allowlist in
`apps/docs/src/lib/docs-metadata/api.ts`; component-declared props are never filtered.

### `search-index.json`

One record per public package and per catalogue component, sorted by id: `id`, `type` (`package` or
`component`), `title`, `package`, and the planned `path` (`/packages/<slug>/` or
`/components/<id>/`). The M12.3 shell will render it; nothing reads it yet.

## Boundaries

- Public entry points only; no `packages/*/src` imports and no private packages.
- No package API, export, token, or version change.
- `basePath` and `trailingSlash` follow the Pages project site layout.
