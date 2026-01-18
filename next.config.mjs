/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // API routes configuration
  async headers() {
    return [
      {
        source: '/api/instrumentation/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.AUTHORIZED_CALLER_ORIGINS?.split(',')[0] || '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
