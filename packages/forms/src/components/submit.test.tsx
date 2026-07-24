import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { Submit } from '../index';
import { render } from '../test-utils';

afterEach(cleanup);

describe('Submit', () => {
  it('renders with children', () => {
    const { getByRole } = render(<Submit>Save</Submit>);
    expect(getByRole('button', { name: /save/i })).toBeVisible();
  });

  it('renders disabled', () => {
    const { getByRole } = render(<Submit disabled>Disabled</Submit>);
    expect(getByRole('button', { name: /disabled/i })).toBeDisabled();
  });
});
