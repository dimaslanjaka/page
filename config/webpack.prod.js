const { merge } = require('webpack-merge');
const paths = require('./paths');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/**
 * @type {import('webpack').Configuration}
 */
module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: paths.build,
    publicPath: paths.base,
    filename: 'runtime/js/[name].[contenthash].bundle.js'
  },
  plugins: [
    // analyze webpack bundle
    new BundleAnalyzerPlugin({
      // report filename
      reportFilename: 'runtime/index.html',
      // generate report file in output directory
      generateStatsFile: true,
      // auto open browser
      openAnalyzer: false,
      // 'static': generate static html on production
      analyzerMode: 'static'
    })
  ]
});
