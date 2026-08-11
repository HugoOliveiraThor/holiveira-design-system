import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import { useState } from 'react';

import { TwoStepVerificationForm } from './two-step-verification-form';

function ControlledVerification(args: React.ComponentProps<typeof TwoStepVerificationForm>) {
  const [submitting, setSubmitting] = useState(false);
  return (
    <TwoStepVerificationForm
      {...args}
      submitting={submitting}
      onSubmit={() => {
        setSubmitting(true);
        setTimeout(() => setSubmitting(false), 1200);
      }}
    />
  );
}

const meta: Meta<typeof TwoStepVerificationForm> = {
  title: 'Layouts/TwoStepVerificationForm',
  component: TwoStepVerificationForm,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { control: false },
    error: { control: 'text' },
    resendHref: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TwoStepVerificationForm onSubmit={() => {}} />,
};

export const Submitting: Story = {
  render: () => <TwoStepVerificationForm onSubmit={() => {}} submitting />,
};

export const WithError: Story = {
  render: () => <TwoStepVerificationForm onSubmit={() => {}} error="Invalid code" />,
};

export const CompleteCode: Story = {
  render: () => <TwoStepVerificationForm onSubmit={() => {}} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox');
    for (const [i, digit] of ['1', '2', '3', '4', '5', '6'].entries()) {
      await userEvent.type(inputs[i], digit);
    }
    await expect(inputs[5]).toHaveValue('6');
  },
};

export const Interactive: Story = {
  render: () => <ControlledVerification />,
};
