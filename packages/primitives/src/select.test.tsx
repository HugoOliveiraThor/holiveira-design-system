import { userEvent } from '@storybook/test';
import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { axe } from 'vitest-axe';

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

  it('fires onChange with the selected value', async () => {
    const onChange = vi.fn();
    const { container } = render(<Select label="Pick" items={items} onChange={onChange} />);
    const select = container.querySelector('select') as HTMLSelectElement;
    await userEvent.selectOptions(select, 'b');
    expect(onChange).toHaveBeenCalled();
    expect(select.value).toBe('b');
  });
});

describe('Select — keyboard', () => {
  it('changes selection with arrow keys', async () => {
    const onChange = vi.fn();
    const { container } = render(<Select label="Pick" items={items} onChange={onChange} />);
    const select = container.querySelector('select') as HTMLSelectElement;
    select.focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(select.selectedIndex).toBe(0);
  });
});

describe('Select — accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(<Select label="Pick" items={items} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations in dark mode', async () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<Select label="Pick" items={items} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
    document.documentElement.classList.remove('dark');
  });
});
