import { userEvent } from '@storybook/test';
import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { render } from './test-utils';

import { TextArea } from './index';

afterEach(cleanup);

describe('TextArea', () => {
  it('renders with label', () => {
    const { getByLabelText } = render(<TextArea label="Message" placeholder="Write..." />);
    expect(getByLabelText('Message')).toBeVisible();
  });

  it('renders with error', () => {
    const { getByText } = render(<TextArea label="Comment" placeholder="..." error="Too short" />);
    expect(getByText('Too short')).toBeVisible();
  });

  it('handles text input', async () => {
    const { getByRole } = render(<TextArea label="Write" placeholder="..." />);
    const textarea = getByRole('textbox');

    await userEvent.type(textarea, 'Sample text');
    expect(textarea).toHaveValue('Sample text');
  });
});
