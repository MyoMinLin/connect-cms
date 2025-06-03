/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.40.47'],
  images: {
    domains: ['images.ctfassets.net'],
  },
}

module.exports = nextConfig