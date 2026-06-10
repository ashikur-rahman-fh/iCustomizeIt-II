import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { securityHeaders } from '@i-customize-it/shared/security/headers';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim();

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: basePath ? basePath : undefined,
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../..'),
  transpilePackages: ['@i-customize-it/shared'],
  headers: securityHeaders,
};

export default nextConfig;
