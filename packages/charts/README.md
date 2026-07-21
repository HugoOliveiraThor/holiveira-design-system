# @holiveira/charts

Chart and visualization components.

## Purpose

Bar, area, and pie chart components wrapping ApexCharts with typed props and theme integration.
Architectural role: provides composable chart primitives with consistent theming.

## Installation

```bash
pnpm add @holiveira/charts
```

Requires `apexcharts`, `react-apexcharts`, and a configured `@holiveira/theme` instance.

## Usage

```tsx
import { BarChart } from '@holiveira/charts';

function MyChart() {
  return (
    <BarChart
      series={[{ name: 'Sales', data: [30, 40, 35, 50] }]}
      categories={['Jan', 'Feb', 'Mar', 'Apr']}
    />
  );
}
```

Import chart styles separately:

```css
@import '@holiveira/charts/chart-styles.css';
```

## Public API

| Export           | Kind      | Description          |
| ---------------- | --------- | -------------------- |
| `BarChart`       | component | Vertical bar chart   |
| `AreaChart`      | component | Area chart with fill |
| `PieChart`       | component | Pie/donut chart      |
| `ChartSeries`    | type      | Series data type     |
| `ChartDataPoint` | type      | Data point type      |

**CSS:** `@holiveira/charts/chart-styles.css` — ApexCharts CSS overrides.

## Architecture Contract

**Dependency Level:** 3 — Composition.

**Owns:** Chart component implementations, ApexCharts integration, chart theme integration,
chart-specific CSS overrides.

**Does not own:** ApexCharts type exposure to consumers (types are internal), chart theming API
(theme integration is internal), or data fetching logic.

See `docs/architecture/contracts/charts.md` for ownership and dependency boundaries.

## References

- `@holiveira/theme` — chart theme integration
- `@holiveira/hooks` — responsive hooks
- `@holiveira/utils` — utility functions
