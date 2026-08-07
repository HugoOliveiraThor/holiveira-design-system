import { Button } from '@ho-dev/primitives';

import type { Meta, StoryObj } from '@storybook/react';

import { ButtonGroup } from './button-group';

const meta: Meta<typeof ButtonGroup> = {
  title: 'UI/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Visual style propagated to all child buttons.',
      control: { type: 'select' },
      options: ['primary', 'outline'],
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      description: 'Size propagated to all child buttons.',
      control: { type: 'select' },
      options: ['sm', 'md'],
      table: { defaultValue: { summary: 'md' } },
    },
    orientation: {
      description: 'Group layout direction.',
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      table: { defaultValue: { summary: 'horizontal' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    'aria-label': 'Primary group',
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button label="Button Text" />
      <Button label="Button Text" />
      <Button label="Button Text" />
    </ButtonGroup>
  ),
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    'aria-label': 'Outline group',
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button label="Button Text" />
      <Button label="Button Text" />
      <Button label="Button Text" />
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    'aria-label': 'Vertical group',
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button label="Button Text" />
      <Button label="Button Text" />
      <Button label="Button Text" />
    </ButtonGroup>
  ),
};

export const WithIcons: Story = {
  args: {
    variant: 'primary',
    'aria-label': 'Group with icons',
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button label="Save" icon={<span>&#10003;</span>} />
      <Button label="Cancel" icon={<span>&#10005;</span>} />
    </ButtonGroup>
  ),
};
