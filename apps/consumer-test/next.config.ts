import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: [
    '@holiveira/charts',
    '@holiveira/config',
    '@holiveira/constants',
    '@holiveira/forms',
    '@holiveira/hooks',
    '@holiveira/i18n',
    '@holiveira/icons',
    '@holiveira/layouts',
    '@holiveira/primitives',
    '@holiveira/providers',
    '@holiveira/theme',
    '@holiveira/tokens',
    '@holiveira/types',
    '@holiveira/ui',
    '@holiveira/utils',
  ],
};

export default nextConfig;
