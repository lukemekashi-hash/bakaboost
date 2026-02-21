/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
            {
                protocol: 'https',
                hostname: 'storage.ko-fi.com',
            },
            {
                protocol: 'https',
                hostname: 'ko-fi.com',
            },
        ],
    },
};

export default nextConfig;
