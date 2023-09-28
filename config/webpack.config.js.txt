/* eslint-disable @typescript-eslint/no-var-requires */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
// const fs = require('fs');
const ASSET_PATH = '/page/';
const extensions = ['.scss', '.css', '.less', '.html', '.ts', '.js', '.jsx', '.tsx', '.json'];
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const tsconfigJson = require('./tsconfig.json');
const { webpackHtmlRoutes } = require('./webpack.html');

module.exports = {
  devServer: {
    host: 'adsense.webmanajemen.com', // local domain by /etc/hosts
    historyApiFallback: true,
    compress: true,
    port: 4000
  },
  entry: './src/index.js',
  output: {
    filename: 'runtime/bundle.js',
    // unique chunk filename generation
    chunkFilename: `runtime/chunk/[name].[chunkhash].js`,
    assetModuleFilename: 'runtime/media/[name][hash][ext][query]',
    path: __dirname + '/dist',
    publicPath: ASSET_PATH
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    extensions,
    // typescript import paths alias support
    alias: (() => {
      const paths = tsconfigJson.compilerOptions.paths;
      for (const key in paths) {
        if (Object.hasOwnProperty.call(paths, key)) {
          const resolvedValues = Array.isArray(paths[key])
            ? paths[key].map(source => {
                // resolve absolute path source
                return path.resolve(__dirname, source);
              })
            : path.resolve(__dirname, paths[key]);
          paths[key] = resolvedValues;
        }
      }
      return paths;
    })(),
    plugins: [
      // typescript import paths alias support
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, './tsconfig.json'),
        extensions,
        baseUrl: path.resolve(__dirname, '.')
      })
    ]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.(t|j|cj|mj)sx?$/,
        use: {
          loader: 'babel-loader?babelrc&cacheDirectory',
          options: require('./.babelrc').config
        }
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        use: {
          loader: 'source-map-loader'
        }
      },
      {
        test: /\.(less|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader?javascriptEnabled=true']
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader?javascriptEnabled=true',
            options: {
              // Prefer `dart-sass`
              implementation: require('node-sass'),
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'node_modules')]
              }
            }
          }
        ]
      }
    ]
  },

  plugins: [
    // generate html
    ...webpackHtmlRoutes(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'runtime/css/[name].css',
      chunkFilename: 'runtime/css/[id].css'
    })
  ],

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};
