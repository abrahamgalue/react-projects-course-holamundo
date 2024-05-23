/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com']
  },
  compiler: {
    styledComponents: true,
  }
};

export default nextConfig;
