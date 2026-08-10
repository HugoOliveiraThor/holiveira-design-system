import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';
import { Tooltip } from './tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Primitives/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    content: {
      description: 'Tooltip bubble content.',
      control: { type: 'text' },
    },
    placement: {
      description: 'Bubble position relative to the trigger.',
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
      table: { defaultValue: { summary: 'top' } },
    },
    variant: {
      description: 'Bubble style.',
      control: { type: 'select' },
      options: ['default', 'dark'],
      table: { defaultValue: { summary: 'default' } },
    },
    arrow: {
      description: 'Show the pointer arrow.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'true' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const HoverArea = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-center py-10">{children}</div>
);

export const Default: Story = {
  render: (args) => (
    <HoverArea>
      <Tooltip {...args} content="This is a tooltip">
        <Button>Default Tooltip</Button>
      </Tooltip>
    </HoverArea>
  ),
};

export const Dark: Story = {
  render: (args) => (
    <HoverArea>
      <Tooltip {...args} content="This is a tooltip" variant="dark">
        <Button>Dark Tooltip</Button>
      </Tooltip>
    </HoverArea>
  ),
};

export const Placements: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-16">
      <Tooltip {...args} content="This is a tooltip" placement="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip {...args} content="Dark variant tooltip" placement="right">
        <Button>Right</Button>
      </Tooltip>
      <Tooltip {...args} content="Tooltip on bottom" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip {...args} content="Tooltip on left side" placement="left">
        <Button>Left</Button>
      </Tooltip>
    </div>
  ),
};

export const WithoutArrow: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-16">
      <Tooltip {...args} content="This is a tooltip" placement="top" variant="dark" arrow={false}>
        <Button>Top</Button>
      </Tooltip>
      <Tooltip {...args} content="This is a tooltip" placement="right" variant="dark" arrow={false}>
        <Button>Right</Button>
      </Tooltip>
      <Tooltip
        {...args}
        content="This is a tooltip"
        placement="bottom"
        variant="dark"
        arrow={false}
      >
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip {...args} content="This is a tooltip" placement="left" variant="dark" arrow={false}>
        <Button>Left</Button>
      </Tooltip>
    </div>
  ),
};

export const WithoutArrowWhite: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-16">
      <Tooltip {...args} content="This is a tooltip" placement="top" arrow={false}>
        <Button>Top</Button>
      </Tooltip>
      <Tooltip {...args} content="This is a tooltip" placement="right" arrow={false}>
        <Button>Right</Button>
      </Tooltip>
      <Tooltip {...args} content="This is a tooltip" placement="bottom" arrow={false}>
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip {...args} content="This is a tooltip" placement="left" arrow={false}>
        <Button>Left</Button>
      </Tooltip>
    </div>
  ),
};
