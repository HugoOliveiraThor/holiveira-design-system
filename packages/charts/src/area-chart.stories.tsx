import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { AreaChart } from './area-chart';
import type { ChartSeries } from './types';

const singleSeries: ChartSeries[] = [
  {
    name: 'Visitors',
    data: [
      { x: 'Jan', y: 200 },
      { x: 'Feb', y: 400 },
      { x: 'Mar', y: 350 },
      { x: 'Apr', y: 500 },
      { x: 'May', y: 480 },
      { x: 'Jun', y: 600 },
    ],
  },
];

const stackedSeries: ChartSeries[] = [
  {
    name: 'Desktop',
    data: [
      { x: 'Jan', y: 200 },
      { x: 'Feb', y: 150 },
      { x: 'Mar', y: 300 },
    ],
  },
  {
    name: 'Mobile',
    data: [
      { x: 'Jan', y: 100 },
      { x: 'Feb', y: 250 },
      { x: 'Mar', y: 200 },
    ],
  },
];

const meta: Meta<typeof AreaChart> = {
  title: 'Charts/AreaChart',
  component: AreaChart,
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
      table: { defaultValue: { summary: '310' } },
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

export const SingleArea: Story = {
  args: {
    series: singleSeries,
  },
};

export const Stacked: Story = {
  args: {
    series: stackedSeries,
    apexOptions: {
      chart: {
        stacked: true,
      },
    },
  },
};

export const GradientFill: Story = {
  args: {
    series: singleSeries,
  },
};

export const DarkMode: Story = {
  args: {
    series: singleSeries,
  },
  parameters: {
    themes: { themeOverride: 'dark' },
  },
};

export const Empty: Story = {
  args: {
    series: [],
  },
};

export const SingleSeries: Story = {
  args: {
    series: [
      {
        name: 'Visitors',
        data: [
          { x: 'Jan', y: 200 },
          { x: 'Feb', y: 400 },
        ],
      },
    ],
  },
};

export const NoData: Story = {
  args: {
    series: [{ name: 'Empty', data: [] }],
  },
};
