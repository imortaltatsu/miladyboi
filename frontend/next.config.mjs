/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  transpilePackages: ['@deadwood/shared'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
