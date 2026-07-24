import { cleanup } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { Form } from '../index';
import { render } from '../test-utils';

afterEach(cleanup);

describe('Form', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Form onSubmit={() => {}}>
        <span>Form content</span>
      </Form>,
    );
    expect(getByText('Form content')).toBeVisible();
  });
});
