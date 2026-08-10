import { cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';

import { render } from './test-utils';

import { Badge } from './index';

afterEach(cleanup);

describe('Badge', () => {
  it('renders text content', () => {
    const { getByText } = render(<Badge>Primary</Badge>);
    expect(getByText('Primary')).toBeVisible();
  });

  it('defaults to primary light variant', () => {
    const { getByText } = render(<Badge>Primary</Badge>);
    expect(getByText('Primary').className).toContain('bg-primary/10');
  });

  it.each([
    ['primary', 'text-primary'],
    ['success', 'bg-success-50'],
    ['error', 'bg-error-50'],
    ['warning', 'bg-warning-50'],
    ['info', 'bg-blue-light-50'],
    ['light', 'bg-gray-100'],
    ['dark', 'bg-gray-500'],
  ] as const)('renders %s variant', (variant, expectedClass) => {
    const { getByText } = render(<Badge variant={variant}>{variant}</Badge>);
    expect(getByText(variant).className).toContain(expectedClass);
  });

  it('renders solid fill', () => {
    const { getByText } = render(
      <Badge variant="success" fill="solid">
        Success
      </Badge>,
    );
    expect(getByText('Success').className).toContain('bg-success-500');
  });

  it('renders icon on the left by default', () => {
    const { getByText, container } = render(
      <Badge icon={<span data-testid="icon">i</span>}>Label</Badge>,
    );
    const badge = getByText('Label').closest('span');
    const icon = container.querySelector('[data-testid="icon"]');
    expect(icon).not.toBeNull();
    expect(badge?.firstElementChild?.contains(icon)).toBe(true);
  });

  it('renders icon on the right', () => {
    const { getByText, container } = render(
      <Badge icon={<span data-testid="icon">i</span>} iconPosition="right">
        Label
      </Badge>,
    );
    const badge = getByText('Label').closest('span');
    const icon = container.querySelector('[data-testid="icon"]');
    expect(badge?.lastElementChild?.contains(icon)).toBe(true);
  });
});
