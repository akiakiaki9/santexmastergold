/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,

  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com'],
    unoptimized: true,
  },

  // Игнорируем ошибки при сборке
  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  // Добавляем пустые значения для переменных
  env: {
    NEXT_PUBLIC_CATALOG_API: process.env.NEXT_PUBLIC_CATALOG_API || '',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
    STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN || '',
  },

  staticPageGenerationTimeout: 120,
  swcMinify: true,
};

export default nextConfig;