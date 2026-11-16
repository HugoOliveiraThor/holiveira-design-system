import { describe, expect, it } from 'vitest';

import { validateComponentDocs, type ContentContext } from './content';
import type { ComponentDoc } from './types';

const CONTEXT: ContentContext = {
  catalogIds: new Set(['button', 'alert']),
  coreIds: ['button', 'alert'],
  playgroundScreens: ['login', 'forms', 'orders', 'settings'],
};

function record(overrides: Partial<ComponentDoc> = {}): ComponentDoc {
  return {
    id: 'button',
    summary: 'Triggers an action.',
    whenToUse: 'Use it for the primary action of a view.',
    whenNotToUse: 'Do not use it for navigation.',
    accessibility: {
      keyboard: 'Activatable with Enter and Space.',
      aria: 'Renders a native button.',
      focus: 'Keeps the browser focus ring.',
    },
    related: ['alert'],
    ...overrides,
  };
}

describe('component content validation', () => {
  it('accepts a complete component record', () => {
    const [doc] = validateComponentDocs([record()], CONTEXT);
    expect(doc).toEqual(record());
  });

  it('fails when a required prose field is empty', () => {
    expect(() => validateComponentDocs([record({ whenNotToUse: '  ' })], CONTEXT)).toThrow(
      /content record button has an empty whenNotToUse/,
    );
    expect(() =>
      validateComponentDocs(
        [record({ accessibility: { keyboard: '', aria: 'Renders a button.', focus: 'Ring.' } })],
        CONTEXT,
      ),
    ).toThrow(/content record button has an empty accessibility.keyboard/);
  });

  it('fails when a related id is not catalogued', () => {
    expect(() => validateComponentDocs([record({ related: ['ghost'] })], CONTEXT)).toThrow(
      /content record button relates to ghost, which is not catalogued/,
    );
  });

  it('fails when a record is not catalogued', () => {
    expect(() => validateComponentDocs([record({ id: 'ghost' })], CONTEXT)).toThrow(
      /content record ghost is not a catalogued component/,
    );
  });

  it('fails when a record relates to itself', () => {
    expect(() => validateComponentDocs([record({ related: ['button'] })], CONTEXT)).toThrow(
      /content record button relates to itself/,
    );
  });

  it('fails when a playground screen does not exist', () => {
    expect(() =>
      validateComponentDocs(
        [record({ playground: 'dashboard' as ComponentDoc['playground'] })],
        CONTEXT,
      ),
    ).toThrow(/content record button names playground dashboard, which does not exist/);
  });

  it('fails when two records share an id', () => {
    expect(() => validateComponentDocs([record(), record()], CONTEXT)).toThrow(
      /component content has a duplicate record for button/,
    );
  });

  it('sorts the records by id and related ids by name', () => {
    const docs = validateComponentDocs(
      [record({ id: 'button', related: ['alert'] }), record({ id: 'alert', related: ['button'] })],
      CONTEXT,
    );
    expect(docs.map((doc) => doc.id)).toEqual(['alert', 'button']);
  });
});
