'use client';

import { useIsMobile } from '@ho-dev/hooks';
import { cn } from '@ho-dev/utils';

import type { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

import { toApexDefaults, useChartTheme } from './chart-defaults';
import type { ChartSeries } from './types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export interface AreaChartProps {
  series: ChartSeries[];
  height?: number;
  className?: string;
  apexOptions?: Partial<ApexOptions>;
  label: string;
  description?: string;
}

export function AreaChart({
  series,
  height = 310,
  className,
  apexOptions,
  label,
  description,
}: AreaChartProps) {
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
    <div className={cn('-mr-5 -ml-4', className)} style={{ height }} role="img" aria-label={label}>
      {description && <span className="sr-only">{description}</span>}
      <Chart options={options} series={series} type="area" height={height} />
    </div>
  );
}

AreaChart.displayName = 'AreaChart';
