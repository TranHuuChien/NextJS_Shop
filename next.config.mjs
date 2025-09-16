/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ['en', 'vi'],  
        defaultLocale: 'en',    
        localeDetection: true,  
    },
    //reactStrictMode: false
};

export default nextConfig;
