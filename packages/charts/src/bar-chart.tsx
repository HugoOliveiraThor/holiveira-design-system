'use client';

import { cn } from '@holiveira/utils';

import type { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

import { toApexDefaults, useChartTheme } from './chart-defaults';
import type { ChartSeries } from './types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export interface BarChartProps {
  series: ChartSeries[];
  height?: number;
  stacked?: boolean;
  className?: string;
  apexOptions?: Partial<ApexOptions>;
  label: string;
  description?: string;
}

export function BarChart({
  series,
  height = 370,
  stacked = false,
  className,
  apexOptions,
  label,
  description,
}: BarChartProps) {
  const chartTheme = useChartTheme();
  const defaults = toApexDefaults(chartTheme);

  const options: ApexOptions = {
    ...defaults,
    ...apexOptions,
    colors: [chartTheme.primary, chartTheme.secondary],
    chart: {
      ...defaults.chart,
      ...apexOptions?.chart,
      type: 'bar',
      stacked,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 3,
        columnWidth: '25%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'inherit',
      fontWeight: 500,
      fontSize: '14px',
      markers: { size: 9, shape: 'circle' },
    },
    fill: { opacity: 1 },
    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 3,
              columnWidth: '25%',
            },
          },
        },
      },
    ],
  };

  return (
    <div className={cn('mt-3 -ml-3.5', className)} role="img" aria-label={label}>
      {description && <span className="sr-only">{description}</span>}
      <Chart options={options} series={series} type="bar" height={height} />
    </div>
  );
}

BarChart.displayName = 'BarChart';
