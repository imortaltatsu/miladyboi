/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  transpilePackages: ['@deadwood/shared'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
