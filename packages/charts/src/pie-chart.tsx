'use client';

import { cn } from '@holiveira/utils';

import type { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

import { toApexDefaults, useChartTheme } from './chart-defaults';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export interface PieChartProps {
  series: number[];
  labels: string[];
  height?: number;
  className?: string;
  apexOptions?: Partial<ApexOptions>;
}

export function PieChart({ series, labels, height = 305, className, apexOptions }: PieChartProps) {
  const chartTheme = useChartTheme();
  const defaults = toApexDefaults(chartTheme);

  const options: ApexOptions = {
    ...defaults,
    ...apexOptions,
    chart: {
      ...defaults.chart,
      ...apexOptions?.chart,
      type: 'donut',
    },
    colors: ['#5750F1', '#5475E5', '#8099EC', '#ADBCF2'],
    labels,
    legend: {
      show: true,
      position: 'bottom',
      itemMargin: { horizontal: 10, vertical: 5 },
      formatter: (legendName, opts) => {
        const { seriesPercent } = opts.w.globals;
        return `${legendName}: ${seriesPercent[opts.seriesIndex]}%`;
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '80%',
          background: 'transparent',
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: 'Total',
              fontSize: '16px',
              fontWeight: '400',
            },
            value: {
              show: true,
              fontSize: '28px',
              fontWeight: 'bold',
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 2600,
        options: { chart: { width: 415 } },
      },
      {
        breakpoint: 640,
        options: { chart: { width: '100%' } },
      },
      {
        breakpoint: 370,
        options: { chart: { width: 260 } },
      },
    ],
  };

  return (
    <div className={cn('grid place-items-center', className)}>
      <Chart options={options} series={series} type="donut" height={height} />
    </div>
  );
}

PieChart.displayName = 'PieChart';
