import type { Meta, StoryObj } from '@storybook/react';

import { ShowcaseSection } from './showcase-section';

const meta: Meta<typeof ShowcaseSection> = {
  title: 'UI/ShowcaseSection',
  component: ShowcaseSection,
  tags: ['autodocs'],
  args: {
    title: 'Section Title',
  },
  argTypes: {
    title: {
      description: 'Section heading text.',
      control: { type: 'text' },
    },
    children: {
      description: 'Content inside the section.',
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
    title: 'Features Overview',
    children: 'Section content goes here.',
  },
};

export const WithChildren: Story = {
  render: (args) => (
    <ShowcaseSection {...args}>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-medium">Feature A</h3>
          <p className="text-sm text-neutral-500">Description of feature A.</p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-medium">Feature B</h3>
          <p className="text-sm text-neutral-500">Description of feature B.</p>
        </div>
      </div>
    </ShowcaseSection>
  ),
  args: {
    title: 'Features',
  },
};

export const Empty: Story = {
  args: {
    title: 'No Content',
    children: null,
  },
};
