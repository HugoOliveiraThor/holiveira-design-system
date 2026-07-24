import type { Meta, StoryObj } from '@storybook/react';

import { PieChart } from './pie-chart';

const baseLabels = ['Frontend', 'Backend', 'DevOps', 'Design'];
const baseSeries = [40, 30, 20, 10];

const extendedLabels = ['React', 'Vue', 'Angular', 'Svelte', 'Solid'];
const extendedSeries = [35, 25, 20, 12, 8];

const meta: Meta<typeof PieChart> = {
  title: 'Charts/PieChart',
  component: PieChart,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Pie: Story = {
  args: {
    series: baseSeries,
    labels: baseLabels,
  },
};

export const Donut: Story = {
  args: {
    series: baseSeries,
    labels: baseLabels,
  },
};

export const WithLegend: Story = {
  args: {
    series: extendedSeries,
    labels: extendedLabels,
  },
};

export const DarkMode: Story = {
  args: {
    series: baseSeries,
    labels: baseLabels,
  },
  parameters: {
    themes: { themeOverride: 'dark' },
  },
};
