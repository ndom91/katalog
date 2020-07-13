const crypto = require('crypto')
const fs = require('fs')
const glob = require('glob')
const path = require('path')
const withImages = require('next-optimized-images')
const { NormalModuleReplacementPlugin } = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const themeConfig = buildThemeConfig()

const nextConfig = {
  webpack(config, { isServer }) {
    // EUI uses some libraries and features that don't work outside of a
    // browser by default. We need to configure the build so that these
    // features are either ignored or replaced with stub implementations.
    if (isServer) {
      config.externals = config.externals.map(eachExternal => {
        if (typeof eachExternal !== 'function') {
          return eachExternal
        }

        return (context, request, callback) => {
          if (
            request.indexOf('@elastic/eui') > -1 ||
            request.indexOf('react-ace') > -1
          ) {
            return callback()
          }

          return eachExternal(context, request, callback)
        }
      })

      // Replace `react-ace` with an empty module on the server.
      // https://webpack.js.org/loaders/null-loader/
      config.module.rules.push({
        test: /react-ace/,
        use: 'null-loader',
      })

      // Mock HTMLElement on the server-side
      const definePluginId = config.plugins.findIndex(
        p => p.constructor.name === 'DefinePlugin'
      )

      config.plugins[definePluginId].definitions = {
        ...config.plugins[definePluginId].definitions,
        HTMLElement: function () {},
      }
    }

    // Copy theme CSS files into `public`
    config.plugins.push(
      new CopyWebpackPlugin({ patterns: themeConfig.copyConfig }),

      // We don't want to load all highlight.js language - provide a mechanism to register just some.
      // If you need to highlight more than just JSON, edit the file below.
      new NormalModuleReplacementPlugin(
        /^highlight\.js$/,
        path.join(__dirname, `src/lib/highlight.ts`)
      )
    )

    return config
  },
}

function buildThemeConfig() {
  const themeFiles = glob.sync(
    path.join(
      __dirname,
      'node_modules',
      '@elastic',
      'eui',
      'dist',
      'eui_theme_*.min.css'
    )
  )

  const themeConfig = {
    availableThemes: [],
    copyConfig: [],
  }

  for (const each of themeFiles) {
    const basename = path.basename(each, '.min.css')

    const themeId = basename.replace(/^eui_theme_/, '')

    const themeName =
      themeId[0].toUpperCase() + themeId.slice(1).replace(/_/g, ' ')

    const publicPath = `themes/${basename}.${hashFile(each)}.min.css`
    const toPath = path.join(
      __dirname,
      `public`,
      `themes`,
      `${basename}.${hashFile(each)}.min.css`
    )

    themeConfig.availableThemes.push({
      id: themeId,
      name: themeName,
      publicPath,
    })

    themeConfig.copyConfig.push({
      from: each,
      to: toPath,
    })
  }

  return themeConfig
}

function hashFile(filePath) {
  const hash = crypto.createHash(`sha256`)
  const fileData = fs.readFileSync(filePath)
  hash.update(fileData)
  const fullHash = hash.digest(`hex`)

  // Use a hash length that matches what Webpack does
  return fullHash.substr(0, 20)
}

module.exports = withImages(nextConfig)
