# Package Contract: @ho-dev/charts

Level: 3 Category: Composition

## Purpose

Provide chart component primitives abstracting the underlying charting library (ApexCharts).

## Responsibilities

- Expose typed chart components (BarChart, AreaChart, PieChart)
- Apply design system theme colors automatically via internal theme adapter
- Handle responsive sizing internally
- Isolate ApexCharts — no ApexCharts types in public API

## Allowed Dependencies

- `@ho-dev/hooks` (L2) — responsive chart sizing
- `@ho-dev/theme` (L3) — theme context for dark mode
- `@ho-dev/types` (L0) — shared types (peer)

## Forbidden Dependencies

- `@ho-dev/ui` (L3) — no ChartContainer; Card is composed by consumers
- `@ho-dev/primitives` (L2) — charts use chart primitives, not UI primitives
- `@ho-dev/auth` (L4) — unrelated
- `@ho-dev/data` (L4) — data is consumed by the app, not by chart components

## Public API

### Stable

| Export               | Type      | Description                                                                           |
| -------------------- | --------- | ------------------------------------------------------------------------------------- |
| `BarChart`           | Component | Bar chart. Supports single and stacked series.                                        |
| `BarChartProps`      | Type      | `series: ChartSeries[]`, `height?: number`, `stacked?: boolean`, apexOptions override |
| `AreaChart`          | Component | Area chart. Smooth curve. Supports multi-series. Responsive stroke width.             |
| `AreaChartProps`     | Type      | `series: ChartSeries[]`, `height?: number`, apexOptions override                      |
| `PieChart`           | Component | Donut chart. Labels + center label formatter.                                         |
| `PieChartProps`      | Type      | `series: number[]`, `labels: string[]`, `height?: number`, apexOptions override       |
| `ChartSeries`        | Type      | `{ name: string; data: ChartDataPoint[] }`                                            |
| `ChartDataPoint`     | Type      | `{ x: string \| number; y: number }`                                                  |
| `ChartSkeleton`      | Component | Skeleton placeholder for chart lazy loading.                                          |
| `ChartSkeletonProps` | Type      | `height?: number`, `className?: string`                                               |

**Total: 4 components + 6 types = 10 public exports.**

### Deferred

LineChart, RadarChart. No consumers yet.

### Removed from original contract

- `ChartContainer` — YAGNI. Card from @ho-dev/ui + manual composition.
- `useChartTheme` — Internal. Components handle theme automatically.
- `ChartConfig`, `ChartOptions` — Replaced by ChartSeries + ChartDataPoint.
- `_ChartContext`, `_ApexChartWrapper`, `_defaultChartOptions` — Internal implementation.

## Internal API (not exported)

- `chart-defaults.ts` — `useChartTheme()`, `toApexDefaults()`, `ChartTheme` type

## Package Boundaries

@ho-dev/charts provides:

- BarChart, AreaChart, PieChart (chart rendering only)
- ChartSeries, ChartDataPoint (data contract types)
- Internal theme adapter (dark mode, design colors)

App layer provides:

- Card/container (from @ho-dev/ui)
- Data fetching (services)
- Business widgets (WeeksProfit, CampaignVisitors, etc.)
- PeriodPicker, timeframe extraction
- Titles, labels, business copy
