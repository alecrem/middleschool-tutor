/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin')
const nextConfig = nextTranslate({
  reactStrictMode: true,
  turbopack: {}
})

module.exports = nextConfig
