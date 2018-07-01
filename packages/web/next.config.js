const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config')
const { ANALYZE } = process.env

module.exports = withSass(withCSS({
  webpack: (config, { dev }) => {

    // Enable use of both .sass and .css.
    // Should be a temporary workaround.
    // See https://github.com/zeit/next-plugins/issues/127
    config = commonsChunkConfig(config, /\.(sass|scss|css)$/);

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
