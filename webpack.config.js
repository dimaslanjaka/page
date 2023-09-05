const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const devMode = /dev/i.test(process.env.NODE_ENV);
const ASSET_PATH = '/page';

/**
 * @type {HtmlWebpackPlugin.Options[]}
 */
const routes = [
  {
    title: 'Login page - WMI',
    filename: 'login.html',
    template: path.resolve(__dirname, 'src', 'main.html'), // source html layout
  },
  {
    title: 'Home page - WMI',
    filename: 'index.html', // create index.html
    template: path.resolve(__dirname, 'src', 'main.html'), // source html layout
  },
];

function createHtml() {
  return routes.map(
    option =>
      new HtmlWebpackPlugin(
        Object.assign(
          {
            filename: 'index.html', // create index.html
            template: path.resolve('src', 'main.html'), // source html layout
            publicPath: ASSET_PATH, // base directory from root domain
            minify: devMode === false, // minify on production
          },
          option,
        ),
      ),
  );
}

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  /**
   * The entry point file
   * [prevent duplication docs](https://webpack.js.org/guides/code-splitting/#prevent-duplication)
   */
  entry: devMode
    ? './src/index.js'
    : {
        // shared utility
        shared: {
          import: ['bluebird', 'crypto-js', 'moment', 'moment-timezone'],
        },
        // main script
        bundle: {
          import: './src/index.js',
          dependOn: ['shared', 'firebase', 'internal'],
        },
        // all imported firebase module
        firebase: {
          import: ['firebase/app', 'firebase/auth'],
          dependOn: 'shared',
        },
        // other external module utility
        /*customModule: {
          import: ['safelinkify'],
          dependOn: 'shared',
        },*/
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
    // output directory
    path: path.resolve(__dirname, 'dist'),
    // dev server filename bundle.js
    // unique chunk filename generation only for production
    filename: devMode ? 'bundle.js' : '[name].[contenthash].js',
    // unique chunk filename generation
    chunkFilename: `[name].[contenthash].js`,
    // base directory from root domain
    publicPath: ASSET_PATH,
  },
  /**
   * Prevent duplication, but disable unique filename chunk generation on dev mode
   * [docs](https://webpack.js.org/guides/code-splitting/#prevent-duplication)
   */
  optimization: devMode
    ? {}
    : {
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
    // This makes it possible for webpack to safely use env vars
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    }),
    ...createHtml(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
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
