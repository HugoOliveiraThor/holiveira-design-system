import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/playground',
  trailingSlash: true,
  transpilePackages: [
    '@ho-dev/charts',
    '@ho-dev/forms',
    '@ho-dev/hooks',
    '@ho-dev/i18n',
    '@ho-dev/icons',
    '@ho-dev/layouts',
    '@ho-dev/primitives',
    '@ho-dev/theme',
    '@ho-dev/tokens',
    '@ho-dev/ui',
    '@ho-dev/utils',
  ],
};

export default nextConfig;
