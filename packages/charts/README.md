# @holiveira/charts

Chart and visualization components.

## Purpose

Bar, area, and pie chart components wrapping ApexCharts with typed props, automatic theme
integration, and responsive sizing. Architectural role: provides composable chart primitives with
consistent theming, isolating ApexCharts internals from consumers.

## Installation

```bash
pnpm add @holiveira/charts
```

Requires `apexcharts`, `react-apexcharts`, and `@holiveira/theme`.

## Usage

```tsx
import { AreaChart, ChartSkeleton } from '@holiveira/charts';
import dynamic from 'next/dynamic';

const LazyChart = dynamic(() => import('@holiveira/charts').then((m) => m.AreaChart), {
  loading: () => <ChartSkeleton />,
  ssr: false,
});

function MyChart() {
  return (
    <LazyChart
      series={[
        {
          name: 'Revenue',
          data: [
            { x: 'Jan', y: 4000 },
            { x: 'Feb', y: 3000 },
          ],
        },
      ]}
      height={350}
    />
  );
}
```

Import chart styles:

```css
@import '@holiveira/charts/chart-styles.css';
```

## Public API

| Export               | Kind      | Description                                           |
| -------------------- | --------- | ----------------------------------------------------- |
| `BarChart`           | component | Bar chart with single/stacked series                  |
| `BarChartProps`      | type      | BarChart component props                              |
| `AreaChart`          | component | Area chart with smooth curve, multi-series            |
| `AreaChartProps`     | type      | AreaChart component props                             |
| `PieChart`           | component | Donut chart with labels and center formatter          |
| `PieChartProps`      | type      | PieChart component props                              |
| `ChartSkeleton`      | component | Skeleton placeholder for chart lazy loading           |
| `ChartSkeletonProps` | type      | ChartSkeleton component props                         |
| `ChartSeries`        | type      | Series data type (`{ name; data: ChartDataPoint[] }`) |
| `ChartDataPoint`     | type      | Data point type (`{ x; y }`)                          |

**CSS:** `@holiveira/charts/chart-styles.css` — ApexCharts CSS overrides.

## Peer Dependencies

| Package            | Version |
| ------------------ | ------- |
| `apexcharts`       | ^4.0.0  |
| `next`             | ^16.0.0 |
| `react`            | ^19.0.0 |
| `react-apexcharts` | ^1.0.0  |
| `react-dom`        | ^19.0.0 |
| `typescript`       | ^5.0.0  |

## Bundle Size

| Budget                 | Limit  | Enforcement |
| ---------------------- | ------ | ----------- |
| Tree-shaken (BarChart) | 157 KB | Block       |
| Full package           | 158 KB | Block       |

## Architecture Contract

**Dependency Level:** 3 — Composition.

**Owns:** Chart component implementations, ApexCharts integration, internal theme adapter,
chart-specific CSS overrides.

**Does not own:** ApexCharts type exposure to consumers (types are internal), data fetching logic,
chart container composition (delegated to consumers via `@holiveira/ui` Card).

See `docs/architecture/contracts/charts.md` for ownership and dependency boundaries.

## Documentation

- **Storybook:**
  https://HugoOliveiraThor.github.io/holiveira-design-system/?path=/docs/components-charts
- [GitHub](https://github.com/HugoOliveiraThor/holiveira-design-system)
- **Contract:** `docs/architecture/contracts/charts.md`

## License

MIT — see [LICENSE](../../LICENSE).

## References

- `@holiveira/theme` — chart theme integration
- `@holiveira/hooks` — responsive hooks
- `@holiveira/utils` — utility functions
