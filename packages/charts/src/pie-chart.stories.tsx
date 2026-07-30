import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { PieChart } from './pie-chart';

const baseLabels = ['Frontend', 'Backend', 'DevOps', 'Design'];
const baseSeries = [40, 30, 20, 10];

const extendedLabels = ['React', 'Vue', 'Angular', 'Svelte', 'Solid'];
const extendedSeries = [35, 25, 20, 12, 8];

const meta: Meta<typeof PieChart> = {
  title: 'Charts/PieChart',
  component: PieChart,
  tags: ['autodocs'],
  argTypes: {
    series: {
      description: 'Array of numeric values for each slice.',
      control: false,
    },
    labels: {
      description: 'Array of labels corresponding to each slice value.',
      control: false,
    },
    apexOptions: {
      description: 'Overrides for ApexCharts options object. Merged with defaults.',
      control: false,
    },
    height: {
      description: 'Chart height in pixels.',
      control: { type: 'number' },
      table: { defaultValue: { summary: '305' } },
    },
    className: {
      description: 'Additional CSS classes.',
      control: false,
    },
    label: {
      description: 'Accessible label for the chart (aria-label).',
      control: { type: 'text' },
    },
    description: {
      description: 'Additional accessible description (sr-only span).',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    series: baseSeries,
    labels: baseLabels,
  },
};

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

export const SingleSlice: Story = {
  args: {
    series: [100],
    labels: ['All'],
  },
};

export const NoData: Story = {
  args: {
    series: [],
    labels: [],
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
