/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'lovely-flamingo-139.convex.cloud'
            },{
                protocol: 'https',
                hostname: 'incredible-wombat-979.convex.cloud',
            },{
                protocol: 'https',
                hostname: 'processed-model-result.s3.us-east-2.amazonaws.com'
            }
        ]
    }
};

export default nextConfig;
