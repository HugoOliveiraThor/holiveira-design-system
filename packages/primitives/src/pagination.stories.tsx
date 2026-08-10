import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Pagination } from './pagination';

function PaginationDemo(
  props: Omit<React.ComponentProps<typeof Pagination>, 'page' | 'onPageChange'>,
) {
  const [page, setPage] = useState(1);
  return <Pagination {...props} page={page} onPageChange={setPage} />;
}

const meta: Meta<typeof Pagination> = {
  title: 'Primitives/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    totalPages: 10,
  },
  argTypes: {
    page: {
      description: 'Current page (1-based).',
      control: { type: 'number', min: 1 },
    },
    totalPages: {
      description: 'Total number of pages.',
      control: { type: 'number', min: 1 },
    },
    prevLabel: {
      description: 'Previous button label.',
      control: { type: 'text' },
    },
    nextLabel: {
      description: 'Next button label.',
      control: { type: 'text' },
    },
    showNumbers: {
      description: 'Show the number trail.',
      control: { type: 'boolean' },
    },
    showMobileInfo: {
      description: 'Show "Page X of Y" on mobile.',
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithText: Story = {
  render: (args) => <PaginationDemo {...args} totalPages={10} />,
};

export const WithTextAndIcon: Story = {
  render: (args) => <PaginationDemo {...args} totalPages={10} />,
};

export const WithIcon: Story = {
  render: (args) => <PaginationDemo {...args} totalPages={10} prevLabel="" nextLabel="" />,
};

export const FewPages: Story = {
  render: (args) => <PaginationDemo {...args} totalPages={3} />,
};

export const WithoutNumbers: Story = {
  render: (args) => <PaginationDemo {...args} totalPages={10} showNumbers={false} />,
};
