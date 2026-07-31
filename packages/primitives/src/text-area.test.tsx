import { userEvent } from '@storybook/test';
import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { axe } from 'vitest-axe';

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

describe('TextArea — value', () => {
  it('renders defaultValue', () => {
    const { container } = render(<TextArea label="Bio" defaultValue="Hello" />);
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea.value).toBe('Hello');
  });
});

describe('TextArea — keyboard', () => {
  it('focuses on Tab', async () => {
    const { getByRole } = render(<TextArea label="Message" placeholder="..." />);
    const textarea = getByRole('textbox');
    textarea.focus();
    expect(textarea).toHaveFocus();
  });

  it('accepts text input', async () => {
    const { getByRole } = render(<TextArea label="Write" placeholder="..." />);
    const textarea = getByRole('textbox');

    await userEvent.type(textarea, 'keyboard input');
    expect(textarea).toHaveValue('keyboard input');
  });
});

describe('TextArea — accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(<TextArea label="Message" placeholder="..." />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations in dark mode', async () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<TextArea label="Dark" placeholder="..." />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
    document.documentElement.classList.remove('dark');
  });
});
