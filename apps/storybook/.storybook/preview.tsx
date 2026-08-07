import { ThemeProvider } from '@ho-dev/theme';

import { withThemeByClassName } from '@storybook/addon-themes';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from '@storybook/react';

import '@ho-dev/theme/theme.css';

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    (Story) => (
      <ThemeProvider>
        <div className="p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
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
