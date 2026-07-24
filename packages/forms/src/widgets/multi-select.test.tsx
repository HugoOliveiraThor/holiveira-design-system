import { cleanup } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';

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
