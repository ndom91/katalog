const withLess = require('@zeit/next-less')
const withCss = require('@zeit/next-css')
const withReactSvg = require('next-react-svg')
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

module.exports = withReactSvg(withCss(withLess(nextConfig)))
