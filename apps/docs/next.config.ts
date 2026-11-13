import type { NextConfig } from 'next';

import { DOCS_BASE_PATH } from './site.config';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: DOCS_BASE_PATH,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['127.0.0.1'],
  transpilePackages: ['@ho-dev/theme', '@ho-dev/utils'],
};

export default nextConfig;
