import { Button } from '@ho-dev/primitives';

import { cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { axe } from 'vitest-axe';

import { render } from './test-utils';

import { ButtonGroup } from './index';

afterEach(cleanup);

describe('ButtonGroup', () => {
  it('renders all children buttons', () => {
    const { getAllByRole } = render(
      <ButtonGroup aria-label="Ações">
        <Button label="Um" />
        <Button label="Dois" />
      </ButtonGroup>,
    );
    expect(getAllByRole('button')).toHaveLength(2);
  });

  it('has role="group"', () => {
    const { getByRole } = render(
      <ButtonGroup aria-label="Ações">
        <Button label="Um" />
      </ButtonGroup>,
    );
    expect(getByRole('group')).toBeInTheDocument();
  });

  it('applies aria-label to the group', () => {
    const { getByRole } = render(
      <ButtonGroup aria-label="Ações da página">
        <Button label="Um" />
      </ButtonGroup>,
    );
    expect(getByRole('group')).toHaveAttribute('aria-label', 'Ações da página');
  });

  it('rounds only the first button left corner in horizontal mode', () => {
    const { getAllByRole } = render(
      <ButtonGroup aria-label="Ações">
        <Button label="Um" />
        <Button label="Dois" />
        <Button label="Três" />
      </ButtonGroup>,
    );
    const [first, middle, last] = getAllByRole('button');
    expect(first).toHaveClass('rounded-l-lg');
    expect(first).not.toHaveClass('rounded-lg');
    expect(last).toHaveClass('rounded-r-lg');
    expect(last).not.toHaveClass('rounded-lg');
    expect(middle).not.toHaveClass('rounded-lg');
  });

  it('overlaps middle buttons with -ml-px in horizontal mode', () => {
    const { getAllByRole } = render(
      <ButtonGroup aria-label="Ações">
        <Button label="Um" />
        <Button label="Dois" />
        <Button label="Três" />
      </ButtonGroup>,
    );
    const [, middle] = getAllByRole('button');
    expect(middle).toHaveClass('-ml-px');
    expect(middle).toHaveClass('rounded-none');
    expect(middle).not.toHaveClass('rounded-l-lg');
    expect(middle).not.toHaveClass('rounded-r-lg');
  });

  it('rounds top and bottom in vertical mode', () => {
    const { getAllByRole } = render(
      <ButtonGroup orientation="vertical" aria-label="Ações">
        <Button label="Um" />
        <Button label="Dois" />
        <Button label="Três" />
      </ButtonGroup>,
    );
    const [first, , last] = getAllByRole('button');
    expect(first).toHaveClass('rounded-t-lg');
    expect(first).not.toHaveClass('rounded-lg');
    expect(last).toHaveClass('rounded-b-lg');
    expect(last).not.toHaveClass('rounded-lg');
  });

  it('renders primary group with first button active and rest inactive', () => {
    const { getAllByRole } = render(
      <ButtonGroup variant="primary" aria-label="Ações">
        <Button label="Um" />
        <Button label="Dois" />
        <Button label="Três" />
      </ButtonGroup>,
    );
    const [first, middle, last] = getAllByRole('button');
    expect(first).toHaveClass('bg-primary', 'text-white');
    expect(middle).toHaveClass('bg-transparent', 'text-primary');
    expect(last).toHaveClass('bg-transparent', 'text-primary');
  });

  it('renders outline group with segment classes', () => {
    const { getAllByRole } = render(
      <ButtonGroup variant="outline" aria-label="Ações">
        <Button label="Um" />
        <Button label="Dois" />
      </ButtonGroup>,
    );
    const [first, second] = getAllByRole('button');
    expect(first).toHaveClass('ring-1', 'ring-inset', 'ring-gray-300', 'text-gray-800');
    expect(second).toHaveClass('ring-1', 'ring-inset', 'ring-gray-300', 'text-gray-700');
  });

  it('propagates size to children', () => {
    const { getAllByRole } = render(
      <ButtonGroup size="sm" aria-label="Ações">
        <Button label="Um" />
        <Button label="Dois" />
      </ButtonGroup>,
    );
    const [first, second] = getAllByRole('button');
    expect(first).toHaveClass('px-4', 'py-3');
    expect(second).toHaveClass('px-4', 'py-3');
  });
});

describe('ButtonGroup — accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <ButtonGroup aria-label="Ações">
        <Button label="Um" />
        <Button label="Dois" />
      </ButtonGroup>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
