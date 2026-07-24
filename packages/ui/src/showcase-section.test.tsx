import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { render } from './test-utils';

import { ShowcaseSection } from './index';

afterEach(cleanup);

describe('ShowcaseSection', () => {
  it('renders with title', () => {
    const { getByText } = render(<ShowcaseSection title="Features" />);
    expect(getByText('Features')).toBeVisible();
  });

  it('renders with children', () => {
    const { getByText } = render(
      <ShowcaseSection title="Section">
        <p>Child content</p>
      </ShowcaseSection>,
    );
    expect(getByText('Child content')).toBeVisible();
  });
});
