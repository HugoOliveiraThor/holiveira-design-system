import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { BarChart } from './bar-chart';
import type { ChartSeries } from './types';

const singleSeries: ChartSeries[] = [
  {
    name: 'Revenue',
    data: [
      { x: 'Jan', y: 400 },
      { x: 'Feb', y: 300 },
      { x: 'Mar', y: 600 },
      { x: 'Apr', y: 350 },
      { x: 'May', y: 500 },
    ],
  },
];

const multiSeries: ChartSeries[] = [
  {
    name: 'Product A',
    data: [
      { x: 'Jan', y: 400 },
      { x: 'Feb', y: 300 },
      { x: 'Mar', y: 600 },
    ],
  },
  {
    name: 'Product B',
    data: [
      { x: 'Jan', y: 200 },
      { x: 'Feb', y: 100 },
      { x: 'Mar', y: 400 },
    ],
  },
];

const meta: Meta<typeof BarChart> = {
  title: 'Charts/BarChart',
  component: BarChart,
  tags: ['autodocs'],
  argTypes: {
    series: {
      description:
        'Array of data series. Each series has a `name` and `data` array of `{ x, y }` points.',
      control: false,
    },
    apexOptions: {
      description: 'Overrides for ApexCharts options object. Merged with defaults.',
      control: false,
    },
    height: {
      description: 'Chart height in pixels.',
      control: { type: 'number' },
      table: { defaultValue: { summary: '370' } },
    },
    stacked: {
      description: 'Whether to stack bars.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
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
    series: singleSeries,
  },
};

export const SingleSeries: Story = {
  args: {
    series: singleSeries,
  },
};

export const MultiSeries: Story = {
  args: {
    series: multiSeries,
  },
};

export const Stacked: Story = {
  args: {
    series: multiSeries,
    stacked: true,
  },
};

export const Horizontal: Story = {
  args: {
    series: singleSeries,
  },
};

export const DarkMode: Story = {
  args: {
    series: multiSeries,
  },
  parameters: {
    themes: { themeOverride: 'dark' },
  },
};
