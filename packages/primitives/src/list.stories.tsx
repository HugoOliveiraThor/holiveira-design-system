import { CheckIcon, CloseIcon } from '@ho-dev/icons';

import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './checkbox';
import { List, ListItem } from './list';
import { Radio } from './radio';

const meta: Meta<typeof List> = {
  title: 'Primitives/List',
  component: List,
  tags: ['autodocs'],
  argTypes: {
    as: {
      description: 'List tag.',
      control: { type: 'select' },
      options: ['ul', 'ol'],
      table: { defaultValue: { summary: 'ul' } },
    },
    orientation: {
      description: 'Layout direction.',
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      table: { defaultValue: { summary: 'vertical' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  'Lorem ipsum dolor sit amet',
  'It is a long established fact reader',
  'Lorem ipsum dolor sit amet',
  'Lorem ipsum dolor sit amet',
  'Lorem ipsum dolor sit amet',
];

export const Unordered: Story = {
  render: (args) => (
    <List {...args} className="w-fit rounded-lg border border-gray-200 dark:border-gray-800">
      {items.map((item) => (
        <ListItem key={item}>{item}</ListItem>
      ))}
    </List>
  ),
};

export const Ordered: Story = {
  render: (args) => (
    <List
      {...args}
      as="ol"
      className="w-fit rounded-lg border border-gray-200 dark:border-gray-800"
    >
      {items.map((item) => (
        <ListItem key={item} marker="none">
          {item}
        </ListItem>
      ))}
    </List>
  ),
};

export const WithButton: Story = {
  render: (args) => (
    <List
      {...args}
      className="w-[228px] overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800"
    >
      {(['Inbox', 'Sent', 'Drafts', 'Trash', 'Spam'] as const).map((label, i) => (
        <ListItem key={label} asButton disabled={i === 4}>
          {label}
        </ListItem>
      ))}
    </List>
  ),
};

export const WithIcon: Story = {
  render: (args) => (
    <List {...args} className="w-fit rounded-lg border border-gray-200 dark:border-gray-800">
      {items.map((item) => (
        <ListItem key={item} icon={<CheckIcon size={16} />}>
          {item}
        </ListItem>
      ))}
    </List>
  ),
};

export const Horizontal: Story = {
  render: (args) => (
    <List
      {...args}
      orientation="horizontal"
      className="w-fit rounded-lg border border-gray-200 dark:border-gray-800"
    >
      {items.slice(0, 4).map((item) => (
        <ListItem key={item} icon={<CheckIcon size={16} />}>
          {item}
        </ListItem>
      ))}
    </List>
  ),
};

export const WithCheckbox: Story = {
  render: (args) => (
    <List {...args} className="w-fit rounded-lg border border-gray-200 dark:border-gray-800">
      {items.map((item, i) => (
        <ListItem key={item} marker="none">
          <Checkbox label={item} id={`checkbox-${i}`} />
        </ListItem>
      ))}
    </List>
  ),
};

export const WithRadio: Story = {
  render: (args) => (
    <List {...args} className="w-fit rounded-lg border border-gray-200 dark:border-gray-800">
      {items.map((item, i) => (
        <ListItem key={item} marker="none">
          <Radio label={item} name="list-radio" id={`radio-${i}`} />
        </ListItem>
      ))}
    </List>
  ),
};

export const WithCloseIcon: Story = {
  render: (args) => (
    <List {...args} className="w-fit rounded-lg border border-gray-200 dark:border-gray-800">
      {items.map((item) => (
        <ListItem key={item} icon={<CloseIcon size={16} />}>
          {item}
        </ListItem>
      ))}
    </List>
  ),
};
