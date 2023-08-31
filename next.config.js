/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3001',
            },
        ],
        domains: ['localhost:3001', 'localhost', 'http://localhost:3001', 'http://localhost']
    },
}

module.exports = nextConfig
