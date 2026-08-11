import type { Meta, StoryObj } from '@storybook/react';

import { AuthLayout } from './auth-layout';
import { PasswordResetForm } from './password-reset-form';
import { SignInForm } from './sign-in-form';
import { SignUpForm } from './sign-up-form';

function FullPageDecorator(Story: () => React.JSX.Element) {
  return (
    <div className="-m-4 h-screen overflow-auto">
      <Story />
    </div>
  );
}

const meta: Meta<typeof AuthLayout> = {
  title: 'Layouts/AuthLayout',
  component: AuthLayout,
  tags: ['autodocs'],
  decorators: [FullPageDecorator],
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    brandLogo: { control: false, description: 'Logo node rendered on the right brand panel.' },
    brandText: { control: 'text', description: 'Tagline under the logo on the brand panel.' },
    backHref: { control: 'text', description: 'Href of the back-to-dashboard link.' },
    children: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AuthLayout
      brandLogo={<span className="text-2xl font-bold text-white">HO</span>}
      brandText="Engineering-first design system"
    >
      <SignInForm onSubmit={() => {}} />
    </AuthLayout>
  ),
  parameters: { viewport: { defaultViewport: 'desktop' } },
};

export const Mobile: Story = {
  render: () => (
    <AuthLayout
      brandLogo={<span className="text-2xl font-bold text-white">HO</span>}
      brandText="Engineering-first design system"
    >
      <SignInForm onSubmit={() => {}} />
    </AuthLayout>
  ),
  parameters: { viewport: { defaultViewport: '2xsm' } },
};

export const WithBackLink: Story = {
  render: () => (
    <AuthLayout
      brandLogo={<span className="text-2xl font-bold text-white">HO</span>}
      brandText="Tagline here"
      backHref="/custom"
    >
      <SignInForm onSubmit={() => {}} />
    </AuthLayout>
  ),
};

export const SignUp: Story = {
  render: () => (
    <AuthLayout
      brandLogo={<span className="text-2xl font-bold text-white">HO</span>}
      brandText="Engineering-first design system"
    >
      <SignUpForm onSubmit={() => {}} />
    </AuthLayout>
  ),
  parameters: { viewport: { defaultViewport: 'desktop' } },
};

export const PasswordReset: Story = {
  render: () => (
    <AuthLayout
      brandLogo={<span className="text-2xl font-bold text-white">HO</span>}
      brandText="Engineering-first design system"
    >
      <PasswordResetForm onSubmit={() => {}} />
    </AuthLayout>
  ),
  parameters: { viewport: { defaultViewport: 'desktop' } },
};
