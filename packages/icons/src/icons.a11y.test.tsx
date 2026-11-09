import { cleanup } from '@testing-library/react';
import type { ComponentType } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import { render } from './test-utils';

import { IconWrapper, type IconProps } from './index';
import * as icons from './index';

afterEach(cleanup);

type IconComponent = ComponentType<IconProps>;

const iconEntries = Object.entries(icons).filter(
  (entry): entry is [string, IconComponent] =>
    entry[0] !== 'IconWrapper' && entry[0].endsWith('Icon') && typeof entry[1] === 'object',
);

describe('Icons — programmatic naming convention', () => {
  it('exports the expected number of icon components', () => {
    expect(iconEntries.length).toBeGreaterThan(40);
  });

  it('IconWrapper is exported for custom icons', () => {
    expect(IconWrapper).toBeTruthy();
  });

  for (const [name, Icon] of iconEntries) {
    it(`${name}: decorative by default, labelled when title is provided`, () => {
      const { container, rerender } = render(<Icon />);
      const decorative = container.querySelector('svg');
      expect(decorative).toHaveAttribute('aria-hidden', 'true');
      expect(decorative).toHaveAttribute('role', 'presentation');

      rerender(<Icon title="Accessible label" />);
      const labelled = container.querySelector('svg');
      expect(labelled).toHaveAttribute('role', 'img');
      expect(labelled).not.toHaveAttribute('aria-hidden');

      const titleId = labelled?.getAttribute('aria-labelledby');
      expect(titleId).toBeTruthy();
      const title = container.querySelector(`#${titleId}`);
      expect(title?.textContent).toBe('Accessible label');
    });
  }
});
