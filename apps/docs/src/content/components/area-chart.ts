import type { ComponentDoc } from '../../lib/docs-metadata/types';

export const areaChartDoc: ComponentDoc = {
  id: 'area-chart',
  summary: 'Shows a trend across a continuous axis.',
  whenToUse:
    'Use it when the change over time matters more than the exact value at one point: revenue, traffic, latency. Give it a label, because the chart is exposed as an image, and a description when the trend needs a sentence.',
  whenNotToUse:
    'Do not use it to compare categories, for a single value, or when readers must read exact numbers; a table or a bar chart serves those better. Do not label two charts on one screen with the same text.',
  accessibility: {
    keyboard:
      'The chart has no focusable points and the tooltip is pointer-driven. When the values matter, publish them in a table next to the chart.',
    aria: 'The public AreaChart renders role="img" with aria-label from the label prop and puts the description in a screen-reader-only span. While the chart module loads, the lazy wrapper shows a status region that announces the chart is loading.',
    focus: 'Nothing inside receives focus; the loading state is announced without moving focus.',
  },
  related: ['card', 'table'],
  playground: 'dashboard',
};
