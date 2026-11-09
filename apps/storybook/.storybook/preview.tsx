import { ThemeProvider } from '@ho-dev/theme';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Decorator, Preview } from '@storybook/react';

import '@ho-dev/theme/theme.css';

/**
 * Single source of truth for the theme: the Storybook toolbar global drives
 * next-themes via `forcedTheme`. `withThemeByClassName` is intentionally not
 * used — it would fight the provider for the `class` attribute.
 */
const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals?.theme as string | undefined) ?? 'light';

  return (
    <ThemeProvider attribute="class" defaultTheme="light" forcedTheme={theme} enableSystem={false}>
      <div className="p-4">
        <Story />
      </div>
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        '2xsm': {
          name: '2xsm — 375px',
          styles: { width: '375px', height: '100%' },
          type: 'mobile',
        },
        xsm: {
          name: 'xsm — 425px',
          styles: { width: '425px', height: '100%' },
          type: 'mobile',
        },
        '3xl': {
          name: '3xl — 2000px',
          styles: { width: '2000px', height: '100%' },
          type: 'desktop',
        },
      },
    },
  },
};

export default preview;
