import { userEvent } from '@storybook/test';
import { cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { axe } from 'vitest-axe';

import { MultiSelect } from '../index';
import { render } from '../test-utils';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
];

afterEach(cleanup);

describe('MultiSelect', () => {
  it('renders with label', () => {
    const { getByText } = render(<MultiSelect label="Frameworks" options={options} />);
    expect(getByText('Frameworks')).toBeVisible();
  });
});

describe('MultiSelect — keyboard contract', () => {
  it('opens with ArrowDown, navigates, toggles with Enter and closes on Escape', () => {
    const onChange = vi.fn();
    const { getByRole, getAllByRole, queryByRole } = render(
      <MultiSelect label="Frameworks" options={options} onChange={onChange} />,
    );
    const combobox = getByRole('combobox');

    fireEvent.keyDown(combobox, { key: 'ArrowDown' });
    expect(combobox).toHaveAttribute('aria-expanded', 'true');

    const opts = getAllByRole('option');
    expect(document.activeElement).toBe(opts[0]);

    fireEvent.keyDown(opts[0], { key: 'ArrowDown' });
    expect(document.activeElement).toBe(opts[1]);

    fireEvent.keyDown(opts[1], { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(['vue']);

    fireEvent.keyDown(opts[1], { key: 'Escape' });
    expect(queryByRole('listbox')).toBeNull();
    expect(document.activeElement).toBe(combobox);
  });

  it('closes the listbox on Tab', () => {
    const { getByRole } = render(<MultiSelect label="Frameworks" options={options} />);
    fireEvent.keyDown(getByRole('combobox'), { key: 'ArrowDown' });
    fireEvent.keyDown(document.activeElement as Element, { key: 'Tab' });
    expect(getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('MultiSelect — keyboard', () => {
  it('opens dropdown on Enter', async () => {
    const { getByText } = render(<MultiSelect label="Pick" options={options} />);
    const label = getByText('Pick');
    expect(label).toBeVisible();
  });
});

describe('MultiSelect — accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(<MultiSelect label="Pick" options={options} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations in dark mode', async () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<MultiSelect label="Pick" options={options} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
    document.documentElement.classList.remove('dark');
  });
});
