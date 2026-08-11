import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect, waitFor } from '@storybook/test';
import React from 'react';
import { useState } from 'react';

import { Dropdown, DropdownContent, DropdownTrigger, DropdownClose } from './dropdown';

type DropdownStoryProps = {
  triggerLabel: string;
  items: { label: string; icon?: React.ReactNode }[];
  hint?: string;
  disabled?: boolean;
  dividerAfter?: number;
  chevron?: boolean;
};

function DropdownStory({
  triggerLabel,
  items,
  hint,
  disabled,
  dividerAfter,
  chevron,
}: DropdownStoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger
        className="border-stroke dark:border-dark-3 dark:bg-dark-2 flex items-center gap-2 rounded-lg border px-4 py-2"
        disabled={disabled}
        chevron={chevron}
      >
        {triggerLabel}
      </DropdownTrigger>
      <DropdownContent className="min-w-[240px]">
        {hint && <p className="px-3 py-2 text-sm text-neutral-500">{hint}</p>}
        {items.map((item, i) => (
          <React.Fragment key={item.label}>
            {dividerAfter !== undefined && i === dividerAfter && (
              <hr className="border-stroke dark:border-dark-3 my-1 border-t" />
            )}
            <DropdownClose>
              <button className="dark:hover:bg-dark-3 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left hover:bg-neutral-100">
                {item.icon}
                <span>{item.label}</span>
              </button>
            </DropdownClose>
          </React.Fragment>
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
      chevron
    />
  ),
};

export const Open: Story = {
  render: () => {
    function OpenDropdown() {
      const [isOpen, setIsOpen] = useState(true);
      return (
        <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
          <DropdownTrigger
            className="border-stroke dark:border-dark-3 dark:bg-dark-2 flex items-center gap-2 rounded-lg border px-4 py-2"
            chevron
          >
            Menu
          </DropdownTrigger>
          <DropdownContent>
            {[{ label: 'Profile' }, { label: 'Settings' }, { label: 'Logout' }].map((item) => (
              <DropdownClose key={item.label}>
                <button className="dark:hover:bg-dark-3 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left hover:bg-neutral-100">
                  <span>{item.label}</span>
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Disabled dropdown trigger cannot be clicked', async () => {
      const trigger = canvas.getByRole('button', { name: /menu/i });
      await expect(trigger).toBeDisabled();
    });
  },
};

export const WithDivider: Story = {
  render: () => (
    <DropdownStory
      triggerLabel="Menu"
      items={[
        { label: 'Edit' },
        { label: 'Duplicate' },
        { label: 'Delete' },
        { label: 'Separated action' },
      ]}
      dividerAfter={2}
      chevron
    />
  ),
};

export const WithIcons: Story = {
  render: () => (
    <DropdownStory
      triggerLabel="Actions"
      items={[
        { label: 'Edit', icon: <span aria-hidden="true">✏️</span> },
        { label: 'Duplicate', icon: <span aria-hidden="true">📋</span> },
        { label: 'Delete', icon: <span aria-hidden="true">🗑️</span> },
      ]}
      chevron
    />
  ),
};

export const WithIconsDivider: Story = {
  render: () => (
    <DropdownStory
      triggerLabel="Actions"
      items={[
        { label: 'Edit', icon: <span aria-hidden="true">✏️</span> },
        { label: 'Duplicate', icon: <span aria-hidden="true">📋</span> },
        { label: 'Delete', icon: <span aria-hidden="true">🗑️</span> },
        { label: 'Separated action', icon: <span aria-hidden="true">↪️</span> },
      ]}
      dividerAfter={2}
      chevron
    />
  ),
};

export const KeyboardNavigation: Story = {
  render: () => (
    <DropdownStory
      triggerLabel="Actions"
      items={[{ label: 'Edit' }, { label: 'Duplicate' }, { label: 'Delete' }]}
      chevron
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
      chevron
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
