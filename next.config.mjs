import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
    eslint: {
        ignoreDuringbuilds: true,
    },
    pwa: {
        dest: 'public',
        register: true,
        skipWaiting: true,
    },
});

export default nextConfig;
