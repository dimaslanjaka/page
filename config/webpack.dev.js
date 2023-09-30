const { merge } = require('webpack-merge');
const paths = require('./paths');
const common = require('./webpack.common.js');
const cli = require('./cli');

/**
 * @type {import('webpack').Configuration}
 */
module.exports = merge(common, {
  entry: [paths.src + '/index.tsx'],
  output: {
    filename: 'page/main.js'
  },
  module: {
    rules: [
      {
        test: /\.(s[a|c]ss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    compress: true,
    hot: true,
    // yarn start --port 8888
    port: cli.port || 4000,
    // yarn start --host custom.host.name
    host: cli.host || 'adsense.webmanajemen.com',
    open: false
  }
});
