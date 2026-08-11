import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './card';
import { CardContent } from './card-content';
import { CardImage } from './card-image';
import { CardTitle } from './card-title';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    children: 'Card content goes here.',
  },
  argTypes: {
    variant: {
      description: 'Card visual variant.',
      control: { type: 'select' },
      options: ['default', 'bordered', 'ghost'],
      table: { defaultValue: { summary: 'default' } },
    },
    children: {
      description: 'Content inside the card.',
      control: false,
    },
    className: {
      description: 'Additional CSS classes.',
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'This is a default card with border and background.',
  },
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    children: 'This card has a visible border and subtle shadow.',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'This card has no background or border (ghost variant).',
  },
};

export const CardWithImage: Story = {
  render: (args) => (
    <Card {...args}>
      <CardImage
        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop"
        alt="Portrait"
      />
      <CardTitle>Card with Image</CardTitle>
      <CardContent>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          A card layout that includes an image at the top with the title and content below.
        </p>
      </CardContent>
    </Card>
  ),
  args: {
    variant: 'default',
  },
};

export const HorizontalCard: Story = {
  render: (args) => (
    <Card {...args}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
        <CardImage
          orientation="left"
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop"
          alt="Portrait"
        />
        <div>
          <CardTitle>Horizontal Card</CardTitle>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              A horizontal card layout with the image on the left and content on the right.
            </p>
          </CardContent>
        </div>
      </div>
    </Card>
  ),
  args: {
    variant: 'default',
  },
};

export const CardWithLink: Story = {
  render: (args) => (
    <Card {...args}>
      <CardImage
        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop"
        alt="Portrait"
      />
      <CardTitle>Card with Link</CardTitle>
      <CardContent>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          A card with a link action below the content.
        </p>
        <a href="#" className="text-brand-500 hover:text-brand-600 text-sm font-medium">
          View details →
        </a>
      </CardContent>
    </Card>
  ),
  args: {
    variant: 'default',
  },
};

export const CardWithIcon: Story = {
  render: (args) => (
    <Card {...args}>
      <div className="bg-brand-50 text-brand-500 dark:bg-brand-500/10 mb-5 flex h-12 w-12 items-center justify-center rounded-lg">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <CardTitle>Card with Icon</CardTitle>
      <CardContent>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          A card with an icon at the top, followed by the title and content.
        </p>
      </CardContent>
    </Card>
  ),
  args: {
    variant: 'default',
  },
};

export const WithChildren: Story = {
  render: (args) => (
    <Card {...args}>
      <CardTitle>Card Title</CardTitle>
      <CardContent>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          This card contains multiple children elements including a title, description, and action
          button.
        </p>
        <button className="bg-primary rounded-md px-4 py-2 text-white">Action</button>
      </CardContent>
    </Card>
  ),
  args: {
    variant: 'default',
  },
};

export const Clickable: Story = {
  render: (args) => (
    <button type="button" onClick={() => alert('Card clicked')} className="w-full text-left">
      <Card {...args} />
    </button>
  ),
  args: {
    variant: 'bordered',
    children: 'Click this card to trigger an action.',
  },
};
