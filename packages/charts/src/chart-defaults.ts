import { useTheme } from '@holiveira/theme';

import type { ApexOptions } from 'apexcharts';

interface ChartTheme {
  isDark: boolean;
  foreground: string;
  background: string;
  grid: string;
  primary: string;
  secondary: string;
}

function useChartTheme(): ChartTheme {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return {
    isDark,
    foreground: isDark ? '#AEB7C0' : '#64748B',
    background: isDark ? '#1A222C' : '#FFFFFF',
    grid: isDark ? '#333A48' : '#E2E8F0',
    primary: '#5750F1',
    secondary: '#0ABEF9',
  };
}

function toApexDefaults(theme: ChartTheme): Partial<ApexOptions> {
  return {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      foreColor: theme.foreground,
      background: theme.background,
      toolbar: { show: false },
    },
    grid: {
      borderColor: theme.grid,
      strokeDashArray: 5,
      yaxis: { lines: { show: true } },
    },
    tooltip: {
      theme: theme.isDark ? 'dark' : 'light',
    },
    dataLabels: {
      enabled: false,
    },
  };
}

export { useChartTheme, toApexDefaults };
export type { ChartTheme };
