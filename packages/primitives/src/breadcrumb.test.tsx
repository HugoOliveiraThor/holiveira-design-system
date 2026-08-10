import { cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';

import { render } from './test-utils';

import { Breadcrumb } from './index';

afterEach(cleanup);

const items = [
  { label: 'Home', href: '/' },
  { label: 'Ui Kits', href: '/ui-kits' },
  { label: 'Avatar' },
];

describe('Breadcrumb', () => {
  it('renders navigation landmark', () => {
    const { getByRole } = render(<Breadcrumb items={items} />);
    expect(getByRole('navigation', { name: /breadcrumb/i })).toBeVisible();
  });

  it('renders clickable items as links', () => {
    const { getByRole } = render(<Breadcrumb items={items} />);
    expect(getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(getByRole('link', { name: 'Ui Kits' })).toHaveAttribute('href', '/ui-kits');
  });

  it('marks last item without href as current page', () => {
    const { getByText } = render(<Breadcrumb items={items} />);
    const current = getByText('Avatar').closest('span');
    expect(current).toHaveAttribute('aria-current', 'page');
  });

  it('defaults to slash divider', () => {
    const { getAllByText } = render(<Breadcrumb items={items} />);
    expect(getAllByText('/').length).toBeGreaterThan(0);
  });

  it('renders chevron divider', () => {
    const { container } = render(<Breadcrumb items={items} divider="chevron" />);
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('renders dot divider', () => {
    const { container } = render(<Breadcrumb items={items} divider="dot" />);
    expect(container.querySelector('span[aria-hidden="true"]')).toHaveClass('bg-gray-400');
  });

  it('renders item icon', () => {
    const { getByRole } = render(
      <Breadcrumb
        items={[
          { label: 'Home', href: '#', icon: <span data-testid="home-icon">h</span> },
          { label: 'Page' },
        ]}
      />,
    );
    expect(getByRole('link', { name: /home/i })).toContainElement(
      document.querySelector('[data-testid="home-icon"]'),
    );
  });
});
