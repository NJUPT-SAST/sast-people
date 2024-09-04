/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: ['*.sast.fun', '127.0.0.1', 'localhost'],
        },
    },
};

export default nextConfig;
