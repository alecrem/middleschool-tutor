/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin')
const nextConfig = nextTranslate(
  {
    reactStrictMode: true,
    turbopack: {},
    i18n: {
      locales: ['en', 'ja'],
      defaultLocale: 'en'
    }
  },
  { turbopack: true }
)

module.exports = nextConfig
