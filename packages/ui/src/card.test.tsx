import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { render } from './test-utils';

import { Card, CardContent, CardImage, CardTitle } from './index';

afterEach(cleanup);

describe('Card', () => {
  it('renders with content', () => {
    const { getByText } = render(<Card>Card content</Card>);
    expect(getByText('Card content')).toBeVisible();
  });

  it('renders all variants', () => {
    const variants = ['default', 'bordered', 'ghost'] as const;
    for (const variant of variants) {
      const { container } = render(<Card variant={variant}>{variant}</Card>);
      const card = container.querySelector('[class*="rounded"]');
      expect(card).toBeInTheDocument();
    }
  });

  it('renders with children composition', () => {
    const { getByText } = render(
      <Card>
        <h3>Title</h3>
        <p>Description</p>
      </Card>,
    );
    expect(getByText('Title')).toBeVisible();
    expect(getByText('Description')).toBeVisible();
  });

  it('applies v2 default classes', () => {
    const { container } = render(<Card>content</Card>);
    const card = container.querySelector('[class*="rounded-xl"]') as HTMLElement;
    expect(card).toHaveClass('border-gray-200');
    expect(card).toHaveClass('p-4');
  });

  it('applies bordered shadow', () => {
    const { container } = render(<Card variant="bordered">content</Card>);
    const card = container.querySelector('[class*="rounded-xl"]') as HTMLElement;
    expect(card).toHaveClass('shadow-theme-xs');
  });

  it('applies ghost transparent background', () => {
    const { container } = render(<Card variant="ghost">content</Card>);
    const card = container.querySelector('[class*="rounded-xl"]') as HTMLElement;
    expect(card).toHaveClass('bg-transparent');
  });
});

describe('CardImage', () => {
  it('renders img with src and alt', () => {
    const { getByAltText } = render(<CardImage src="/img.jpg" alt="Test image" />);
    const img = getByAltText('Test image');
    expect(img).toHaveAttribute('src', '/img.jpg');
  });

  it('applies mb-5 wrapper for top orientation', () => {
    const { container } = render(<CardImage src="/img.jpg" alt="Test image" orientation="top" />);
    const wrapper = container.querySelector('[class*="mb-5"]') as HTMLElement;
    expect(wrapper).toHaveClass('overflow-hidden');
  });

  it('applies shrink-0 wrapper for left orientation', () => {
    const { container } = render(<CardImage src="/img.jpg" alt="Test image" orientation="left" />);
    const wrapper = container.querySelector('[class*="shrink-0"]') as HTMLElement;
    expect(wrapper).toHaveClass('overflow-hidden');
    expect(wrapper).not.toHaveClass('mb-5');
  });
});

describe('CardTitle', () => {
  it('renders h4 by default', () => {
    const { container } = render(<CardTitle>Title</CardTitle>);
    expect(container.querySelector('h4')).toBeInTheDocument();
  });

  it('renders h2 via as prop', () => {
    const { container } = render(<CardTitle as="h2">Title</CardTitle>);
    expect(container.querySelector('h2')).toBeInTheDocument();
  });

  it('renders h3 via as prop', () => {
    const { container } = render(<CardTitle as="h3">Title</CardTitle>);
    expect(container.querySelector('h3')).toBeInTheDocument();
  });

  it('applies title classes', () => {
    const { container } = render(<CardTitle>Title</CardTitle>);
    const title = container.querySelector('h4') as HTMLElement;
    expect(title).toHaveClass('text-[20px]');
    expect(title).toHaveClass('font-medium');
  });
});

describe('CardContent', () => {
  it('renders children', () => {
    const { getByText } = render(<CardContent>Body text</CardContent>);
    expect(getByText('Body text')).toBeVisible();
  });
});
