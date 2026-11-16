import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { Field } from '../index';
import { render } from '../test-utils';

afterEach(cleanup);

describe('Field', () => {
  it('renders label', () => {
    const { getByText } = render(
      <Field label="Full Name">
        <input />
      </Field>,
    );
    expect(getByText('Full Name')).toBeVisible();
  });

  it('renders description', () => {
    const { getByText } = render(
      <Field label="Name" description="Enter your full name">
        <input />
      </Field>,
    );
    expect(getByText('Enter your full name')).toBeVisible();
  });

  it('renders error message', () => {
    const { getByText } = render(
      <Field label="Email" error="Invalid email">
        <input />
      </Field>,
    );
    expect(getByText('Invalid email')).toBeVisible();
  });

  it('uses accessible colours for the description and error', () => {
    const { getByText } = render(
      <Field label="Email" description="Enter your work email" error="Invalid email">
        <input />
      </Field>,
    );
    expect(getByText('Enter your work email').className).toContain('text-gray-600');
    expect(getByText('Invalid email').className).toContain('text-red-700');
  });

  it('renders children', () => {
    const { getByPlaceholderText } = render(
      <Field label="Field">
        <input placeholder="type here" />
      </Field>,
    );
    expect(getByPlaceholderText('type here')).toBeVisible();
  });
});
