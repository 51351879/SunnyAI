/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['images.pexels.com']
  },
  
  // 优化配置
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  // 配置 webpack 以优化性能
  webpack: (config, { dev, isServer }) => {
    // 在开发模式下优化内存使用
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules', '**/.next'],
      };
    }
    
    // 优化模块解析
    config.resolve.symlinks = false;
    
    return config;
  },
  
  // 编译器配置
  compiler: {
    // 移除 console.log (生产环境)
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // 性能优化
  poweredByHeader: false,
  compress: true,
  
  // 静态优化
  trailingSlash: false,
};

module.exports = nextConfig;