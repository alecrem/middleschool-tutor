const nextTranslate = require('next-translate-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
}

module.exports = nextTranslate(nextConfig)
