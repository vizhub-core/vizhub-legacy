const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const { ANALYZE } = process.env

module.exports = withSass(withCSS({
  webpack: (config, { dev }) => {
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true
      }))
    }
    return config
  }
}));
