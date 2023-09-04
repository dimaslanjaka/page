const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  // https://webpack.js.org/configuration/dev-server/
  /**
   * @type {import('webpack-dev-server').Configuration}
   */
  devServer: {
    static: path.resolve(__dirname, './public'),
    hot: true,
    compress: true,
    allowedHosts: 'all',
    port: 4000,
    open: false,
  },
};
