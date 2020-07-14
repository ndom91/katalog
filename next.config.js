const withLess = require('@zeit/next-less')

const nextConfig = {
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
}

module.exports = withLess(nextConfig)
