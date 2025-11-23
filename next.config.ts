/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ca-ecommerce-api.onrender.com', 'localhost:5000'],
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },
  turbopack: {},
  experimental: {
    optimizeCss: true,
    turbopackFileSystemCacheForDev: true,
  },
}

export default nextConfig