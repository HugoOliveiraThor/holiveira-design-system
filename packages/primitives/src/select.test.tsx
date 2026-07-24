import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { render } from './test-utils';

import { Select } from './index';

const items = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

afterEach(cleanup);

describe('Select', () => {
  it('renders with label', () => {
    const { getByLabelText } = render(<Select label="Choose" items={items} />);
    expect(getByLabelText('Choose')).toBeVisible();
  });

  it('renders options', () => {
    const { container } = render(<Select label="Pick" items={items} />);
    const select = container.querySelector('select') as HTMLSelectElement;
    expect(select.options.length).toBe(3);
  });

  it('renders with placeholder', () => {
    const { container } = render(<Select label="Pick" items={items} placeholder="Select one..." />);
    const select = container.querySelector('select') as HTMLSelectElement;
    expect(select.options[0].text).toBe('Select one...');
  });

  it('renders with error', () => {
    const { getByText } = render(<Select label="Pick" items={items} error="Selection required" />);
    expect(getByText('Selection required')).toBeVisible();
  });
});
