import { cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';

import { render } from './test-utils';

import { List, ListItem } from './index';

afterEach(cleanup);

describe('List', () => {
  it('renders a ul by default', () => {
    const { container } = render(
      <List>
        <ListItem>Item</ListItem>
      </List>,
    );
    expect(container.querySelector('ul')).not.toBeNull();
  });

  it('renders an ol with as prop', () => {
    const { container } = render(
      <List as="ol">
        <ListItem>Item</ListItem>
      </List>,
    );
    expect(container.querySelector('ol')).toHaveClass('list-decimal');
  });

  it('renders horizontal orientation', () => {
    const { container } = render(
      <List orientation="horizontal">
        <ListItem>Item</ListItem>
      </List>,
    );
    expect(container.querySelector('ul')).toHaveClass('md:flex-row');
  });
});

describe('ListItem', () => {
  it('renders text content', () => {
    const { getByText } = render(
      <List>
        <ListItem>Item text</ListItem>
      </List>,
    );
    expect(getByText('Item text')).toBeVisible();
  });

  it('renders dot marker by default', () => {
    const { container } = render(
      <List>
        <ListItem>Item</ListItem>
      </List>,
    );
    expect(container.querySelector('span[aria-hidden="true"]')).toHaveClass('bg-gray-500');
  });

  it('omits dot marker with marker none', () => {
    const { container } = render(
      <List>
        <ListItem marker="none">Item</ListItem>
      </List>,
    );
    expect(container.querySelector('span[aria-hidden="true"]')).toBeNull();
  });

  it('renders icon instead of dot', () => {
    const { container } = render(
      <List>
        <ListItem icon={<span data-testid="icon">i</span>}>Item</ListItem>
      </List>,
    );
    expect(container.querySelector('[data-testid="icon"]')).not.toBeNull();
    expect(container.querySelector('span[aria-hidden="true"]')).toBeNull();
  });

  it('renders a button when asButton', () => {
    const { getByRole } = render(
      <List>
        <ListItem asButton>Action</ListItem>
      </List>,
    );
    expect(getByRole('button')).toBeVisible();
  });

  it('applies hover classes on button item', () => {
    const { getByRole } = render(
      <List>
        <ListItem asButton>Action</ListItem>
      </List>,
    );
    expect(getByRole('button').className).toContain('hover:bg-brand-50');
  });

  it('disables button item', () => {
    const { getByRole } = render(
      <List>
        <ListItem asButton disabled>
          Action
        </ListItem>
      </List>,
    );
    expect(getByRole('button')).toBeDisabled();
  });

  it('applies base classes', () => {
    const { getByText } = render(
      <List>
        <ListItem>Item</ListItem>
      </List>,
    );
    expect(getByText('Item').closest('li')).toHaveClass('px-3', 'py-2.5');
  });
});
