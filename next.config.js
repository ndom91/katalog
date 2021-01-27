const withLess = require('@zeit/next-less')
const withCss = require('@zeit/next-css')
const withReactSvg = require('next-react-svg')
const path = require('path')
const withSourceMaps = require('@zeit/next-source-maps')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')

const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
  VERCEL_GITHUB_COMMIT_SHA,
} = process.env
const basePath = ''

new SentryWebpackPlugin({
  include: '.next',
  ignore: ['node_modules'],
  urlPrefix: '~/_next',
  release: VERCEL_GITHUB_COMMIT_SHA,
})

const nextConfig = {
  include: path.resolve(__dirname, 'src/assets/svg'),
  webpack(config, options) {
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
    }
    if (
      SENTRY_DSN &&
      SENTRY_ORG &&
      SENTRY_PROJECT &&
      SENTRY_AUTH_TOKEN &&
      VERCEL_GITHUB_COMMIT_SHA &&
      NODE_ENV === 'production'
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: '.next',
          ignore: ['node_modules'],
          stripPrefix: ['webpack://_N_E/'],
          urlPrefix: `~${basePath}/_next`,
          release: VERCEL_GITHUB_COMMIT_SHA,
        })
      )
    }
    return config
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
}

module.exports = withSourceMaps(withReactSvg(withCss(withLess(nextConfig))))
