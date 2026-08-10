import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from './button';
import { InputGroup } from './input-group';
import { Modal, ModalCloseButton } from './modal';
import { ModalAlert } from './modal-alert';

function ModalDemo(props: Partial<React.ComponentProps<typeof Modal>>) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} {...props}>
      <ModalCloseButton onClick={() => setIsOpen(false)} />
      <div>
        <h4 className="text-title-sm mb-7 font-semibold text-gray-800 dark:text-white/90">
          Modal Heading
        </h4>
        <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod est quis
          mauris lacinia pharetra. Sed a ligula ac odio condimentum aliquet a nec nulla.
        </p>
        <p className="mt-5 text-sm leading-6 text-gray-500 dark:text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod est quis
          mauris lacinia pharetra.
        </p>
        <div className="mt-8 flex w-full items-center justify-end gap-3">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button onClick={() => setIsOpen(false)}>Save Changes</Button>
        </div>
      </div>
    </Modal>
  );
}

function ModalAlertDemo({ variant }: { variant: 'success' | 'info' | 'warning' | 'danger' }) {
  const [isOpen, setIsOpen] = useState(true);
  const titles = {
    success: 'Well Done!',
    info: 'Information Alert!',
    warning: 'Warning Alert!',
    danger: 'Danger Alert!',
  } as const;
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="md">
      <ModalCloseButton onClick={() => setIsOpen(false)} />
      <ModalAlert
        variant={variant}
        title={titles[variant]}
        description="Lorem ipsum dolor sit amet consectetur. Feugiat ipsum libero tempor felis risus nisi non."
      >
        <Button
          variant={variant === 'success' ? 'green' : 'primary'}
          onClick={() => setIsOpen(false)}
        >
          Okay, Got It
        </Button>
      </ModalAlert>
    </Modal>
  );
}

const meta: Meta<typeof Modal> = {
  title: 'Primitives/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: 'Panel width.',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'md' } },
    },
    centered: {
      description: 'Vertically center the content.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'true' } },
    },
    fullScreen: {
      description: 'Full-screen panel.',
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ModalDemo />,
};

export const VerticallyCentered: Story = {
  render: () => (
    <ModalDemo centered>
      <div className="text-center">
        <h4 className="sm:text-title-sm mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          All Done! Success Confirmed
        </h4>
        <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="mt-8 flex w-full items-center justify-center gap-3">
          <Button variant="outline">Close</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </ModalDemo>
  ),
};

export const FormInModal: Story = {
  render: () => (
    <ModalDemo>
      <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
        Personal Information
      </h4>
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        <InputGroup label="First Name" placeholder="Musharof" />
        <InputGroup label="Last Name" placeholder="Chowdhury" />
        <InputGroup label="Email Address" type="email" placeholder="randomuser@pimjo.com" />
        <InputGroup label="Phone" placeholder="+09 363 398 46" />
      </div>
    </ModalDemo>
  ),
};

export const FullScreen: Story = {
  render: () => (
    <ModalDemo fullScreen>
      <ModalCloseButton />
      <div className="overflow-y-auto">
        <h4 className="text-title-sm mb-7 font-semibold text-gray-800 dark:text-white/90">
          Modal Heading
        </h4>
        <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod est quis
          mauris lacinia pharetra.
        </p>
      </div>
      <div className="mt-8 flex w-full items-center justify-end gap-3 pb-16">
        <Button variant="outline">Close</Button>
        <Button>Save Changes</Button>
      </div>
    </ModalDemo>
  ),
};

export const AlertSuccess: Story = {
  render: () => <ModalAlertDemo variant="success" />,
};

export const AlertInfo: Story = {
  render: () => <ModalAlertDemo variant="info" />,
};

export const AlertWarning: Story = {
  render: () => <ModalAlertDemo variant="warning" />,
};

export const AlertDanger: Story = {
  render: () => <ModalAlertDemo variant="danger" />,
};
