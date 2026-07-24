import type { Meta, StoryObj } from '@storybook/react';

const SPACING = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64,
  72, 80, 96,
];

function SpacingScale() {
  return (
    <div className="space-y-3">
      {SPACING.map((value) => (
        <div key={value} className="flex items-center gap-4">
          <span className="text-body-xs text-dark-5 w-16 shrink-0 text-right font-mono">
            {value}
          </span>
          <div
            className="bg-primary/20 h-6 rounded"
            style={{ width: value > 0 ? `${value * 4}px` : '24px' }}
          />
          <span className="text-body-xs font-mono">{value * 4}px</span>
        </div>
      ))}
    </div>
  );
}

const meta: Meta = {
  title: 'Design Tokens/Spacing',
  tags: [],
};

export default meta;
type Story = StoryObj;

export const Scale: Story = {
  render: () => <SpacingScale />,
};
