import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { render } from './test-utils';

import { Skeleton } from './index';

afterEach(cleanup);

describe('Skeleton', () => {
  it('renders with default class', () => {
    const { container } = render(<Skeleton />);
    const element = container.querySelector('[class*="animate"]');
    expect(element).toBeInTheDocument();
  });
});
