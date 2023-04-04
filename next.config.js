/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  poweredByHeader: false,
  swcMinify: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,

  /** Использовать только на клиенте */
  publicRuntimeConfig: {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  },
};

module.exports = nextConfig;
