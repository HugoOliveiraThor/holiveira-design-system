import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect, waitFor } from '@storybook/test';
import React from 'react';
import { useState } from 'react';

import { Dropdown, DropdownContent, DropdownTrigger, DropdownClose } from './dropdown';

type DropdownStoryProps = {
  triggerLabel: string;
  items: { label: string }[];
  hint?: string;
  disabled?: boolean;
};

function DropdownStory({ triggerLabel, items, hint, disabled }: DropdownStoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger
        className="border-stroke dark:border-dark-3 dark:bg-dark-2 flex items-center gap-2 rounded-lg border px-4 py-2"
        disabled={disabled}
      >
        {triggerLabel}
      </DropdownTrigger>
      <DropdownContent className="border-stroke dark:border-dark-3 dark:bg-dark-2 min-w-40 rounded-lg border bg-white p-2 shadow-lg">
        {hint && <p className="px-3 py-2 text-sm text-neutral-500">{hint}</p>}
        {items.map((item) => (
          <DropdownClose key={item.label}>
            <button className="dark:hover:bg-dark-3 w-full rounded px-3 py-2 text-left hover:bg-neutral-100">
              {item.label}
            </button>
          </DropdownClose>
        ))}
      </DropdownContent>
    </Dropdown>
  );
}

const meta: Meta<typeof Dropdown> = {
  title: 'Primitives/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      description: 'Controlled open state of the dropdown.',
      control: { type: 'boolean' },
    },
    children: {
      description: 'Content composed with DropdownTrigger and DropdownContent.',
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DropdownStory
      triggerLabel="Menu"
      items={[{ label: 'Profile' }, { label: 'Settings' }, { label: 'Logout' }]}
    />
  ),
};

export const Open: Story = {
  render: () => {
    function OpenDropdown() {
      const [isOpen, setIsOpen] = useState(true);
      return (
        <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
          <DropdownTrigger className="border-stroke dark:border-dark-3 dark:bg-dark-2 flex items-center gap-2 rounded-lg border px-4 py-2">
            Menu
          </DropdownTrigger>
          <DropdownContent className="border-stroke dark:border-dark-3 dark:bg-dark-2 min-w-40 rounded-lg border bg-white p-2 shadow-lg">
            {[{ label: 'Profile' }, { label: 'Settings' }, { label: 'Logout' }].map((item) => (
              <DropdownClose key={item.label}>
                <button className="dark:hover:bg-dark-3 w-full rounded px-3 py-2 text-left hover:bg-neutral-100">
                  {item.label}
                </button>
              </DropdownClose>
            ))}
          </DropdownContent>
        </Dropdown>
      );
    }
    return <OpenDropdown />;
  },
};

export const Disabled: Story = {
  render: () => (
    <DropdownStory
      triggerLabel="Menu"
      items={[{ label: 'Profile' }, { label: 'Settings' }, { label: 'Logout' }]}
      disabled
    />
  ),
};

export const WithDivider: Story = {
  render: () => (
    <DropdownStory
      triggerLabel="Menu"
      items={[{ label: 'Edit' }, { label: 'Duplicate' }, { label: 'Delete' }]}
    />
  ),
};

export const WithIcons: Story = {
  render: () => (
    <DropdownStory
      triggerLabel="Actions"
      items={[{ label: 'Edit' }, { label: 'Duplicate' }, { label: 'Delete' }]}
    />
  ),
};

export const TriggerAndContent: Story = {
  render: () => (
    <DropdownStory
      triggerLabel="Menu"
      items={[{ label: 'Profile' }, { label: 'Settings' }, { label: 'Logout' }]}
    />
  ),
};

export const KeyboardNavigation: Story = {
  render: () => (
    <DropdownStory
      triggerLabel="Actions"
      items={[{ label: 'Edit' }, { label: 'Duplicate' }, { label: 'Delete' }]}
    />
  ),
};

export const CloseOnEscape: Story = {
  render: () => (
    <DropdownStory
      triggerLabel="Open Menu"
      items={[{ label: 'Close' }]}
      hint="Press Escape to close"
    />
  ),
};

export const Interactive: Story = {
  render: () => (
    <DropdownStory
      triggerLabel="Open"
      items={[{ label: 'Item 1' }, { label: 'Item 2' }, { label: 'Item 3' }]}
    />
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /open/i });

    await step('Click trigger to open dropdown', async () => {
      await userEvent.click(trigger);
      const menu = canvas.getByRole('menu');
      await expect(menu).toBeVisible();
    });

    await step('Navigate with ArrowDown', async () => {
      const menu = canvas.getByRole('menu');
      await userEvent.keyboard('{ArrowDown}');
      const items = within(menu).getAllByRole('button');
      await expect(items[0]).toHaveFocus();
    });

    await step('Close with Escape', async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(canvas.queryByRole('menu')).not.toBeInTheDocument();
      });
    });
  },
};
