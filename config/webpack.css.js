const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// css loader config

/** @type {import('webpack').Configuration} */
const dev = {
  module: {
    rules: [
      {
        test: /\.(s[a|c]ss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  }
};

/** @type {import('webpack').Configuration} */
const prod = {
  module: {
    rules: [
      {
        test: /\.(s[a|c]ss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'runtime/css/[name].[chunkhash].css',
      chunkFilename: 'runtime/css/[id].[chunkhash].css'
    })
  ]
};

module.exports = { cssDev: dev, cssProd: prod };
