const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  /**
   * The entry point file
   * [prevent duplication docs](https://webpack.js.org/guides/code-splitting/#prevent-duplication)
   */
  entry: {
    // shared utility
    shared: {
      import: ['bluebird', 'crypto-js'],
    },
    // main script
    index: {
      import: './src/index.js',
      dependOn: ['shared', 'firebase', 'internal'],
    },
    // all imported firebase module
    firebase: {
      import: ['firebase/app', 'firebase/auth'],
      dependOn: 'shared',
    },
    // internal/local utility
    internal: {
      import: ['./src/utils/index.ts'],
      dependOn: 'shared',
    },
  },
  /**
   * The location of the build folder
   */
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  },
  /**
   * Prevent duplication
   * [docs](https://webpack.js.org/guides/code-splitting/#prevent-duplication)
   */
  optimization: {
    // enables you to fine-tune how chunks are generated
    runtimeChunk: 'multiple',
    splitChunks: {
      chunks: 'all',
      // Set to 0 to enforce splitting regardless of size
      minSize: 0,
      cacheGroups: {
        styles: {
          name: 'styles',
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  // Optional and for development only. This provides the ability to
  // map the built code back to the original source format when debugging.
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules|.test.(ts|js)$/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          // Creates `style` nodes from JS strings
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require('node-sass'),
              sassOptions: {
                includePaths: [
                  path.join(__dirname, '../node_modules'),
                  path.join(process.cwd(), 'node_modules'),
                  path.join(__dirname, '../../node_modules'),
                ]
                  .filter(fs.existsSync)
                  .map(str => path.resolve(str))
                  .filter(function (elem, index, self) {
                    return index === self.indexOf(elem);
                  }),
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.*', '.ts', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve('src', 'main.html'),
      publicPath: '/',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
    }),
  ],
  /**
   * [Docs](https://webpack.js.org/configuration/dev-server/)
   * @type {import('webpack-dev-server').Configuration}
   */
  devServer: {
    //static: path.resolve(__dirname, './public'),
    historyApiFallback: true, // enable react-dom-router support
    hot: true, // hot reloading
    port: 4000,
    open: false,
  },
};
