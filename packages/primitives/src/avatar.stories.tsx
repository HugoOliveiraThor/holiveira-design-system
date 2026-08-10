import type { Meta, StoryObj } from '@storybook/react';

import { Avatar as AvatarBase } from './avatar';
import { Avatar, AvatarGroup } from './avatar-group';

const meta: Meta<typeof AvatarBase> = {
  title: 'Primitives/Avatar',
  component: AvatarBase,
  tags: ['autodocs'],
  argTypes: {
    src: {
      description: 'Image URL. When absent or failing to load, initials from `name` are shown.',
      control: { type: 'text' },
    },
    alt: {
      description: 'Alternative text (a11y).',
      control: { type: 'text' },
    },
    name: {
      description: 'Name used to derive fallback initials (e.g. "Hugo Oliveira" → "HO").',
      control: { type: 'text' },
    },
    size: {
      description: 'Avatar size tier (24–64px).',
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      table: { defaultValue: { summary: 'md' } },
    },
    status: {
      description: 'Status indicator color.',
      control: { type: 'select' },
      options: ['online', 'offline', 'busy', undefined],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const IMAGE = 'https://i.pravatar.cc/128?img=12';

export const Default: Story = {
  args: {
    src: IMAGE,
    alt: 'User avatar',
    name: 'Hugo Oliveira',
  },
};

export const FallbackInitials: Story = {
  args: {
    name: 'Hugo Oliveira',
    alt: 'User avatar',
  },
};

export const FallbackUnknown: Story = {
  args: {
    alt: 'User avatar',
  },
};

export const StatusOnline: Story = {
  args: {
    src: IMAGE,
    alt: 'User avatar',
    status: 'online',
  },
};

export const StatusBusy: Story = {
  args: {
    src: IMAGE,
    alt: 'User avatar',
    status: 'busy',
  },
};

export const StatusOffline: Story = {
  args: {
    src: IMAGE,
    alt: 'User avatar',
    status: 'offline',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <Avatar key={size} src={IMAGE} alt="User avatar" name="Hugo Oliveira" size={size} />
      ))}
    </div>
  ),
};

export const SizesWithStatus: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <Avatar
          key={size}
          src={IMAGE}
          alt="User avatar"
          name="Hugo Oliveira"
          size={size}
          status="online"
        />
      ))}
    </div>
  ),
};

export const AvatarGroupDemo: Story = {
  render: () => (
    <AvatarGroup size="md">
      <Avatar src={IMAGE} alt="User 1" name="Alice" />
      <Avatar src={IMAGE} alt="User 2" name="Bob" />
      <Avatar src={IMAGE} alt="User 3" name="Carol" />
      <Avatar src={IMAGE} alt="User 4" name="Dave" />
      <Avatar src={IMAGE} alt="User 5" name="Eve" />
      <Avatar src={IMAGE} alt="User 6" name="Frank" />
    </AvatarGroup>
  ),
};

export const AvatarGroupWithMax: Story = {
  render: () => (
    <AvatarGroup size="lg" max={3}>
      <Avatar src={IMAGE} alt="User 1" name="Alice" />
      <Avatar src={IMAGE} alt="User 2" name="Bob" />
      <Avatar src={IMAGE} alt="User 3" name="Carol" />
      <Avatar src={IMAGE} alt="User 4" name="Dave" />
      <Avatar src={IMAGE} alt="User 5" name="Eve" />
    </AvatarGroup>
  ),
};
