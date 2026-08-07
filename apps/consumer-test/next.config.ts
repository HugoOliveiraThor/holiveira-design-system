import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: [
    '@ho-dev/charts',
    '@ho-dev/config',
    '@ho-dev/constants',
    '@ho-dev/forms',
    '@ho-dev/hooks',
    '@ho-dev/i18n',
    '@ho-dev/icons',
    '@ho-dev/layouts',
    '@ho-dev/primitives',
    '@ho-dev/providers',
    '@ho-dev/theme',
    '@ho-dev/tokens',
    '@ho-dev/types',
    '@ho-dev/ui',
    '@ho-dev/utils',
  ],
};

export default nextConfig;
