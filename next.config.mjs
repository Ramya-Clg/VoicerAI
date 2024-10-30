/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript:{
        ignoreBuildErrors: true
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lovely-flamingo-139.convex.cloud'
            }, {
                protocol: 'https',
                hostname: 'incredible-wombat-979.convex.cloud',
            }, {
                protocol: 'https',
                hostname: 'processed-model-result.s3.us-east-2.amazonaws.com'
            }, {
                protocol: 'https',
                hostname: 'img.clerk.com'
            }
        ]
    }
};

export default nextConfig;
