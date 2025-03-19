/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')();

const nextConfig = withPWA({
    eslint: {
        ignoreDuringbuilds: true,
    },
    pwa: {
        dest: 'public',
        register: true,
        skipWaiting: true,
        // disable: process.env.NODE.env === 'development' // disable PWA in development mode
    }
});

export default nextConfig;
