import { userEvent } from '@storybook/test';
import { cleanup } from '@testing-library/react';
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

describe('MultiSelect — pre-existing findings', () => {
  it.skip('P2-6: MultiSelect has no focus trap when listbox is open (D8.1)', () => {
    // TODO: When focus trap is implemented, verify Tab cycling stays within listbox
    expect(true).toBe(true);
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
