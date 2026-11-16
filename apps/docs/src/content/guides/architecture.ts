import type { GuideDoc } from '../../lib/docs-metadata/guides';

export const architectureGuides: GuideDoc[] = [
  {
    slug: 'architecture',
    section: 'Architecture',
    title: 'Architecture',
    summary:
      'The repository is a pnpm workspace and Turborepo pipeline over nineteen packages in dependency levels; dependency ownership is explicit, and every package boundary is recorded in a contract.',
    order: 12,
    sections: [
      {
        id: 'layers',
        title: 'Layers run in one direction',
        prose: [
          'The packages sit in six dependency levels. Level 0 is the core: types, constants and config. Level 1 is the foundation: tokens, utils and i18n. Level 2 is the primitives: hooks, icons and primitives. Level 3 is composition: theme, ui, forms, charts, layouts and providers. Level 4 is services: auth, api and db. Level 5 is the platform: eslint and testing.',
          'A package may depend only on the levels below it, and every contract states its allowed and forbidden dependencies. A composition package such as ui therefore consumes primitives and utils, and never the services above it.',
        ],
      },
      {
        id: 'ownership',
        title: 'Every dependency has one owner',
        prose: [
          'A dependency belongs wherever its import statement lives. A dependency the package imports is that package dependency; a framework that must not be duplicated is a peer dependency the consumer provides; root is a workspace orchestrator and owns no dependency that satisfies a package import.',
          'The dependency ownership spec records the matrix and the rules, including that the import statement decides the owner and that no package may rely on pnpm hoisting to satisfy an import.',
        ],
      },
      {
        id: 'contracts',
        title: 'The contract is the boundary',
        prose: [
          'Every public package has a contract under docs/architecture/contracts that fixes its purpose, responsibilities, excluded responsibilities, allowed and forbidden dependencies, public API and internal API. The portal links the contract and the README from every package page, and its gate fails a package page whose README or contract is missing.',
          'The contract is what a reviewer reads before a new export: a name that the contract does not allow is a design change, not an implementation detail.',
        ],
      },
      {
        id: 'release',
        title: 'Publishing follows the same boundaries',
        prose: [
          'Release is per package through changesets: sixteen packages publish and four stay private. The release specification fixes the publish set, the dist-only exports map, the CSS copies and the consumer validation that runs before publish, so a package is validated from a consumer perspective before it reaches the registry.',
        ],
      },
      {
        id: 'portal',
        title: 'This portal is a consumer',
        prose: [
          'The documentation portal reads the packages, never changes them. It derives its facts from the barrels, sources, stories and READMEs, generates registry, api, example and snippet artifacts from them, and fails its own gate when an export, a guide, a snippet or a link no longer matches the repository.',
        ],
      },
    ],
    snippets: ['apps/docs/src/examples/guides/architecture.tsx'],
    related: {
      packages: ['@ho-dev/types', '@ho-dev/tokens', '@ho-dev/utils'],
      components: ['Card'],
    },
    sources: [
      'docs/superpowers/specs/dependency-ownership-architecture.md',
      'docs/architecture/contracts/types.md',
      'docs/architecture/contracts/tokens.md',
      'docs/architecture/contracts/utils.md',
      'docs/architecture/ads-010-release.md',
      'docs/architecture/ads-011-documentation-platform.md',
    ],
  },
];
