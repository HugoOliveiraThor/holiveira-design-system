import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';
import { NotificationBar } from './notification-bar';

const meta: Meta<typeof NotificationBar> = {
  title: 'Primitives/NotificationBar',
  component: NotificationBar,
  tags: ['autodocs'],
  args: {
    title: 'Something happened',
  },
  argTypes: {
    variant: {
      description: 'Status variant.',
      control: { type: 'select' },
      options: ['success', 'info', 'warning', 'error'],
      table: { defaultValue: { summary: 'success' } },
    },
    title: {
      description: 'Notification message.',
      control: { type: 'text' },
    },
    closable: {
      description: 'Show the close button.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'true' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: { variant: 'success', title: 'Success! Action Completed' },
};

export const Info: Story = {
  args: { variant: 'info', title: 'Heads Up! New Information' },
};

export const Warning: Story = {
  args: { variant: 'warning', title: 'Alert: Double Check Required' },
};

export const Error: Story = {
  args: { variant: 'error', title: 'Something Went Wrong' },
};

export const NotClosable: Story = {
  args: { variant: 'info', title: 'Heads Up! New Information', closable: false },
};

export const AnnouncementBar: Story = {
  render: (args) => (
    <div className="flex w-full max-w-[607px] items-start gap-3 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-[#1E2634]">
      <div className="flex-1">
        <h5 className="mb-1 text-base font-medium text-gray-800 dark:text-white/90">
          New update! Available
        </h5>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enjoy improved functionality and enhancements.
        </p>
      </div>
      <div className="flex w-full items-center gap-3 sm:max-w-fit">
        <Button variant="outline">Later</Button>
        <Button>Update Now</Button>
      </div>
    </div>
  ),
};

export const ToastNotification: Story = {
  render: (args) => (
    <div className="relative w-full max-w-[577px] rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#1E2634]">
      <button
        type="button"
        aria-label="Close"
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 dark:hover:text-white/90"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z"
          />
        </svg>
      </button>
      <p className="mb-6 pr-4 text-sm text-gray-700 dark:text-gray-400">
        By Clicking on &quot;Accept&quot;, you agree to the storing of cookies on your device to
        enhance site navigation, analyze site usage, and assist in our marketing efforts.
      </p>
      <div className="flex flex-col justify-end gap-6 sm:flex-row sm:items-center sm:gap-4">
        <button
          type="button"
          className="text-left text-sm font-medium text-gray-700 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Cookie Settings
        </button>
        <div className="flex w-full items-center gap-3 sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            Deny All
          </Button>
          <Button className="w-full sm:w-auto">Accept All</Button>
        </div>
      </div>
    </div>
  ),
};
