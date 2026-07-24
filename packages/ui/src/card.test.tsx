import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { render } from './test-utils';

import { Card } from './index';

afterEach(cleanup);

describe('Card', () => {
  it('renders with content', () => {
    const { getByText } = render(<Card>Card content</Card>);
    expect(getByText('Card content')).toBeVisible();
  });

  it('renders all variants', () => {
    const variants = ['default', 'bordered', 'ghost'] as const;
    for (const variant of variants) {
      const { container } = render(<Card variant={variant}>{variant}</Card>);
      const card = container.querySelector('[class*="rounded"]');
      expect(card).toBeInTheDocument();
    }
  });

  it('renders with children composition', () => {
    const { getByText } = render(
      <Card>
        <h3>Title</h3>
        <p>Description</p>
      </Card>,
    );
    expect(getByText('Title')).toBeVisible();
    expect(getByText('Description')).toBeVisible();
  });
});
