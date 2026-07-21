'use client';

import { cn } from '@holiveira/utils';
import { useIsMobile } from '@holiveira/hooks';
import type { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import type { ChartSeries } from './types';
import { toApexDefaults, useChartTheme } from './chart-defaults';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export interface AreaChartProps {
  series: ChartSeries[];
  height?: number;
  className?: string;
  apexOptions?: Partial<ApexOptions>;
}

export function AreaChart({ series, height = 310, className, apexOptions }: AreaChartProps) {
  const chartTheme = useChartTheme();
  const isMobile = useIsMobile();
  const defaults = toApexDefaults(chartTheme);

  const options: ApexOptions = {
    ...defaults,
    ...apexOptions,
    colors: [chartTheme.primary, chartTheme.secondary],
    chart: {
      ...defaults.chart,
      ...apexOptions?.chart,
      height,
      type: 'area',
    },
    fill: {
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    stroke: {
      curve: 'smooth',
      width: isMobile ? 2 : 3,
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: { show: false },
    tooltip: {
      marker: { show: true },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: { chart: { height: 300 } },
      },
      {
        breakpoint: 1366,
        options: { chart: { height: 320 } },
      },
    ],
  };

  return (
    <div className={cn('-mr-5 -ml-4', className)} style={{ height }}>
      <Chart options={options} series={series} type="area" height={height} />
    </div>
  );
}

AreaChart.displayName = 'AreaChart';
