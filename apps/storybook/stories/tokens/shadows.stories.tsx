import type { Meta, StoryObj } from '@storybook/react';

const SHADOWS = [
  { name: 'shadow-1', class: 'shadow-1', description: 'Default card shadow' },
  { name: 'shadow-card', class: 'shadow-card', description: 'Card hover / elevated' },
  { name: 'shadow-3', class: 'shadow-3', description: 'Modal / dropdown shadow' },
  { name: 'shadow-4', class: 'shadow-4', description: 'Tooltip / popover shadow' },
  { name: 'dark:shadow-card', class: 'dark:shadow-card', description: 'Dark mode card' },
];

function ShadowCards() {
  return (
    <div className="flex flex-wrap gap-6">
      {SHADOWS.map((shadow) => (
        <div
          key={shadow.name}
          className={`dark:bg-gray-dark w-64 rounded-[10px] bg-white p-6 ${shadow.class}`}
        >
          <h3 className="text-dark mb-2 text-base font-semibold dark:text-white">{shadow.name}</h3>
          <p className="text-body-xs text-dark-5">{shadow.description}</p>
        </div>
      ))}
    </div>
  );
}

const meta: Meta = {
  title: 'Design Tokens/Shadows',
  tags: [],
};

export default meta;
type Story = StoryObj;

export const Cards: Story = {
  render: () => <ShadowCards />,
};
