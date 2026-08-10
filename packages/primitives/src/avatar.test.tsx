import { cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';

import { render } from './test-utils';

import { Avatar, AvatarGroup } from './index';

afterEach(cleanup);

describe('Avatar', () => {
  it('renders image with src and alt', () => {
    const { getByAltText } = render(<Avatar src="https://example.com/a.png" alt="User avatar" />);
    expect(getByAltText('User avatar')).toHaveAttribute('src', 'https://example.com/a.png');
  });

  it('renders initials fallback when src absent', () => {
    const { getByText } = render(<Avatar alt="User avatar" name="Hugo Oliveira" />);
    expect(getByText('HO')).toBeVisible();
  });

  it('renders ? when name absent', () => {
    const { getByText } = render(<Avatar alt="User avatar" />);
    expect(getByText('?')).toBeVisible();
  });

  it('falls back to initials when image fails to load', () => {
    const { getByAltText, getByText } = render(
      <Avatar src="https://example.com/broken.png" alt="User avatar" name="Hugo Oliveira" />,
    );
    fireEvent.error(getByAltText('User avatar'));
    expect(getByText('HO')).toBeVisible();
  });

  it.each(['online', 'offline', 'busy'] as const)('renders %s status dot', (status) => {
    const { container } = render(<Avatar alt="User avatar" status={status} />);
    expect(container.querySelector('span[aria-hidden="true"]')).not.toBeNull();
  });

  it('does not render status dot when status absent', () => {
    const { container } = render(<Avatar alt="User avatar" />);
    expect(container.querySelector('span[aria-hidden="true"]')).toBeNull();
  });

  it('maps status dot color', () => {
    const { container } = render(<Avatar alt="User avatar" status="online" />);
    expect(container.querySelector('span[aria-hidden="true"]')).toHaveClass('bg-success-500');
  });

  it('applies size tier to root', () => {
    const { getByText } = render(<Avatar alt="User avatar" size="md" />);
    expect(getByText('?').parentElement).toHaveClass('h-10', 'w-10');
  });
});

describe('AvatarGroup', () => {
  it('renders children up to max with overflow chip', () => {
    const { getByText } = render(
      <AvatarGroup max={2}>
        <Avatar alt="User 1" name="Alice" />
        <Avatar alt="User 2" name="Bob" />
        <Avatar alt="User 3" name="Carol" />
      </AvatarGroup>,
    );
    expect(getByText('+1')).toBeVisible();
  });

  it('renders +N overflow chip', () => {
    const { getByText } = render(
      <AvatarGroup max={2}>
        <Avatar alt="User 1" name="Alice" />
        <Avatar alt="User 2" name="Bob" />
        <Avatar alt="User 3" name="Carol" />
        <Avatar alt="User 4" name="Dave" />
      </AvatarGroup>,
    );
    expect(getByText('+2')).toBeVisible();
  });

  it('applies group size to children without explicit size', () => {
    const { container } = render(
      <AvatarGroup size="lg">
        <Avatar alt="User 1" name="Alice" />
      </AvatarGroup>,
    );
    const root = container.querySelector('[class*="-space-x-"]');
    expect(root).toHaveClass('-space-x-3');
  });
});
