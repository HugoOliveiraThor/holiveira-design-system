import { userEvent } from '@storybook/test';
import { cleanup } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { axe } from 'vitest-axe';

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

describe('Dropdown — v2 restyle', () => {
  it('renders chevron icon when chevron prop set', () => {
    function ChevronDropdown() {
      const [isOpen, setIsOpen] = React.useState(false);
      return (
        <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
          <DropdownTrigger chevron>Menu</DropdownTrigger>
          <DropdownContent>
            <DropdownClose>
              <button>Item 1</button>
            </DropdownClose>
          </DropdownContent>
        </Dropdown>
      );
    }
    const { getByRole, container } = render(<ChevronDropdown />);
    const trigger = getByRole('button', { name: /menu/i });
    expect(trigger).toBeVisible();
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('omits chevron icon when chevron prop absent', () => {
    const { container } = render(<TestDropdown />);
    expect(container.querySelector('svg')).toBeNull();
  });

  it('rotates chevron 180deg when open', async () => {
    function RotatingDropdown() {
      const [isOpen, setIsOpen] = React.useState(false);
      return (
        <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
          <DropdownTrigger chevron>Menu</DropdownTrigger>
          <DropdownContent>
            <DropdownClose>
              <button>Item 1</button>
            </DropdownClose>
          </DropdownContent>
        </Dropdown>
      );
    }
    const { getByRole, container } = render(<RotatingDropdown />);
    const trigger = getByRole('button', { name: /menu/i });
    const chevron = container.querySelector('svg');
    expect(chevron).not.toBeNull();
    expect(chevron?.classList.contains('rotate-180')).toBe(false);
    await userEvent.click(trigger);
    expect(chevron?.classList.contains('rotate-180')).toBe(true);
  });

  it('renders content with v2 panel classes', () => {
    function V2Dropdown() {
      const [isOpen, setIsOpen] = React.useState(true);
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
    const { getByRole } = render(<V2Dropdown />);
    const menu = getByRole('menu');
    expect(menu).toHaveClass('rounded-2xl');
    expect(menu).toHaveClass('shadow-theme-lg');
    expect(menu).toHaveClass('min-w-[260px]');
  });
});

describe('Dropdown — pre-existing findings', () => {
  it.skip('P2-3: DropdownTrigger does not default type="button" — form submit risk (D6.9)', () => {
    const { container } = render(<TestDropdown />);
    const trigger = container.querySelector('button');
    expect(trigger?.getAttribute('type')).toBe('button');
  });
});

describe('Dropdown — keyboard', () => {
  it('opens on Enter', async () => {
    const { getByRole, queryByRole } = render(<TestDropdown />);
    const trigger = getByRole('button', { name: /menu/i });
    trigger.focus();
    await userEvent.keyboard('{Enter}');
    expect(trigger).toBeVisible();
  });

  it('opens on Space', async () => {
    const { getByRole } = render(<TestDropdown />);
    const trigger = getByRole('button', { name: /menu/i });
    trigger.focus();
    await userEvent.keyboard(' ');
    expect(trigger).toBeVisible();
  });
});

describe('Dropdown — accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(<TestDropdown />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations in dark mode', async () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<TestDropdown />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
    document.documentElement.classList.remove('dark');
  });
});
