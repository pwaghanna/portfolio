/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  

  
  // Option 2: For project repo (e.g., portfolio)
  basePath: '/portfolio',
  assetPrefix: '/portfolio',
  
  images: {
    unoptimized: true
  },
  
  // Ensure trailing slashes for better compatibility
  trailingSlash: true,
}

export default nextConfig
