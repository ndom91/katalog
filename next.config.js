const withLess = require('@zeit/next-less')
const withCss = require('@zeit/next-css')
const withImages = require('next-images')
const path = require('path')

const nextConfig = {
  include: path.resolve(__dirname, 'src/assets/svg'),
  webpack(config, options) {
    return config
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
}

module.exports = withImages(withCss(withLess(nextConfig)))
