/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        CLIENT_ID: process.env.CLIENT_ID,
        BASE_URL: process.env.BASE_URL,
    }
}

module.exports = nextConfig
