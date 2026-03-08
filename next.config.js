/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    compress: true,
    images: {
        domains: ['localhost', 'res.cloudinary.com'],
        formats: ['image/avif', 'image/webp'],
    },
    experimental: {
        optimizePackageImports: ['react-icons'],
    },
}

module.exports = nextConfig
