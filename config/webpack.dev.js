const { merge } = require('webpack-merge');
// const paths = require('./paths');
const common = require('./webpack.common.js');
/**
 * @type {import('webpack').Configuration}
 */
module.exports = merge(common, {
  output: {
    filename: 'page/main.js'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 4000,
    host: 'adsense.webmanajemen.com',
    open: false
  }
});
