import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { DatePicker } from '../index';
import { render } from '../test-utils';

afterEach(cleanup);

describe('DatePicker', () => {
  it('renders with label', () => {
    const { getByText } = render(<DatePicker label="Pick a date" placeholder="mm/dd/yyyy" />);
    expect(getByText('Pick a date')).toBeVisible();
  });
});
