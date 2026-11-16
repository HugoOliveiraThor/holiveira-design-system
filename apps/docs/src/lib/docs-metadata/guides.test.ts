import { describe, expect, it } from 'vitest';

import { GUIDE_ROUTES } from './coverage';
import {
  GUIDE_SECTIONS,
  guideSectionOfRoute,
  validateGuideDocs,
  type GuideValidationContext,
} from './guides';

const CONTEXT: GuideValidationContext = {
  packages: ['@ho-dev/icons', '@ho-dev/primitives', '@ho-dev/tokens'],
  componentExports: [
    { package: '@ho-dev/icons', exportName: 'AlertErrorIcon' },
    { package: '@ho-dev/primitives', exportName: 'Button' },
  ],
};

const GUIDE = {
  slug: 'guides/icons',
  section: 'Guides',
  title: 'Icons',
  summary: 'How to use the icon set.',
  order: 11,
  sections: [{ id: 'usage', title: 'Usage', prose: ['Import the icon you need.'] }],
  snippets: ['apps/docs/src/examples/guides/icons.tsx'],
  related: { packages: ['@ho-dev/icons'], components: ['AlertErrorIcon'] },
  sources: ['docs/architecture/contracts/icons.md'],
};

function validate(overrides: Record<string, unknown> = {}) {
  return validateGuideDocs([{ ...GUIDE, ...overrides }], CONTEXT);
}

describe('guide routes', () => {
  it('lists the twelve guide routes from the spec', () => {
    expect([...GUIDE_ROUTES]).toEqual([
      'getting-started',
      'getting-started/installation',
      'getting-started/theming',
      'foundations/tokens',
      'foundations/styling',
      'foundations/accessibility',
      'guides/providers',
      'guides/forms',
      'guides/charts',
      'guides/layouts',
      'guides/icons',
      'architecture',
    ]);
  });

  it('assigns every route to exactly one section', () => {
    for (const route of GUIDE_ROUTES) {
      expect(guideSectionOfRoute(route), route).toBeDefined();
      expect(GUIDE_SECTIONS).toContain(guideSectionOfRoute(route));
    }
    expect(guideSectionOfRoute('packages/primitives')).toBeUndefined();
  });

  it('maps the four sections in the advertised order', () => {
    expect([...GUIDE_SECTIONS]).toEqual([
      'Getting Started',
      'Foundations',
      'Guides',
      'Architecture',
    ]);
    expect(guideSectionOfRoute('getting-started/theming')).toBe('Getting Started');
    expect(guideSectionOfRoute('foundations/tokens')).toBe('Foundations');
    expect(guideSectionOfRoute('guides/icons')).toBe('Guides');
    expect(guideSectionOfRoute('architecture')).toBe('Architecture');
  });
});

describe('guide records', () => {
  it('returns the valid record with every field normalised', () => {
    const [record] = validate();
    expect(record).toEqual(GUIDE);
  });

  it('sorts the records by order', () => {
    const first = { ...GUIDE, order: 1, slug: 'getting-started', section: 'Getting Started' };
    const docs = validateGuideDocs([{ ...GUIDE, order: 11 }, first], CONTEXT);
    expect(docs.map((doc) => doc.slug)).toEqual(['getting-started', 'guides/icons']);
    expect(docs.map((doc) => doc.order)).toEqual([1, 11]);
  });

  it('fails when a guide field is empty', () => {
    for (const field of ['title', 'summary']) {
      expect(() => validate({ [field]: '   ' })).toThrow(
        new RegExp(`guide guides/icons has an empty ${field}`),
      );
    }
    expect(() => validate({ sections: [] })).toThrow(/guide guides\/icons has an empty sections/);
    expect(() => validate({ snippets: [] })).toThrow(/guide guides\/icons has an empty snippets/);
    expect(() => validate({ snippets: [''] })).toThrow(
      /guide guides\/icons has an empty snippet path/,
    );
    expect(() => validate({ sources: [] })).toThrow(/guide guides\/icons has an empty sources/);
    expect(() => validate({ related: undefined })).toThrow(
      /guide guides\/icons has an empty related/,
    );
    expect(() => validate({ sections: [{ id: 'usage', title: 'Usage', prose: [] }] })).toThrow(
      /guide guides\/icons has an empty prose of section usage/,
    );
    expect(() => validate({ sections: [{ id: 'usage', title: 'Usage', prose: [''] }] })).toThrow(
      /guide guides\/icons has an empty prose in section usage/,
    );
  });

  it('fails when a guide route is not one of the twelve', () => {
    expect(() => validate({ slug: 'guides/ghost', section: 'Guides' })).toThrow(
      /guide guides\/ghost is not one of the twelve guide routes/,
    );
  });

  it('fails when a guide is in a section its route does not belong to', () => {
    expect(() => validate({ section: 'Foundations' })).toThrow(
      /guide guides\/icons is in section Foundations, but its route belongs to Guides/,
    );
    expect(() => validate({ section: 'Recipes' })).toThrow(
      /guide guides\/icons has an unknown section Recipes/,
    );
  });

  it('fails when two guides share an order', () => {
    const second = { ...GUIDE, slug: 'guides/layouts', order: GUIDE.order };
    expect(() => validateGuideDocs([GUIDE, second], CONTEXT)).toThrow(
      /guides guides\/icons and guides\/layouts share the order 11/,
    );
  });

  it('fails when two records use the same slug', () => {
    expect(() => validateGuideDocs([GUIDE, GUIDE], CONTEXT)).toThrow(
      /guide content has two records for guides\/icons/,
    );
  });

  it('fails when a section id repeats', () => {
    expect(() =>
      validate({
        sections: [
          { id: 'usage', title: 'Usage', prose: ['One.'] },
          { id: 'usage', title: 'Usage again', prose: ['Two.'] },
        ],
      }),
    ).toThrow(/guide guides\/icons has two sections with id usage/);
  });

  it('fails when a guide links to an unknown page', () => {
    expect(() => validate({ related: { packages: ['@ho-dev/ghost'], components: [] } })).toThrow(
      /guide guides\/icons relates to package @ho-dev\/ghost, which does not exist/,
    );
    expect(() => validate({ related: { packages: [], components: ['GhostButton'] } })).toThrow(
      /guide guides\/icons relates to component GhostButton, which does not exist/,
    );
    expect(() => validate({ related: { packages: [''], components: [] } })).toThrow(
      /guide guides\/icons has an empty related package/,
    );
  });

  it('fails when a snippet is not a guides example file', () => {
    expect(() => validate({ snippets: ['apps/docs/src/examples/icons.tsx'] })).toThrow(
      /guide guides\/icons names snippet apps\/docs\/src\/examples\/icons.tsx, which is not a .tsx file under apps\/docs\/src\/examples\/guides\//,
    );
  });

  it('fails when a source is not a tracked document', () => {
    expect(() => validate({ sources: ['packages/icons/README.md'] })).toThrow(
      /guide guides\/icons names source packages\/icons\/README.md, which is not a tracked document under docs\//,
    );
  });
});
