import { cleanup } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { render } from './test-utils';

import { Dropdown, DropdownContent, DropdownTrigger, DropdownClose } from './index';

afterEach(cleanup);

function TestDropdown() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger>Menu</DropdownTrigger>
      <DropdownContent>
        <DropdownClose>
          <button>Item 1</button>
        </DropdownClose>
      </DropdownContent>
    </Dropdown>
  );
}

describe('Dropdown', () => {
  it('renders trigger button', () => {
    const { getByRole } = render(<TestDropdown />);
    expect(getByRole('button', { name: /menu/i })).toBeVisible();
  });
});
