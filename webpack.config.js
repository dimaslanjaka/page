const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const postcssPresetEnv = require('postcss-preset-env');
const { webpackHtmlRoutes } = require('./webpack.html');
const babelConfig = require('./.babelrc').config;

const cacheDirectory = path.join(__dirname, 'tmp/webpack');
if (!fs.existsSync(cacheDirectory)) fs.mkdirSync(cacheDirectory, { recursive: true });
const devMode = /dev/i.test(process.env.NODE_ENV);
const ASSET_PATH = '/page';

const stylesLoader = [
  // Creates `style` nodes from JS strings
  devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
  // Translates CSS into CommonJS
  {
    loader: 'css-loader',
    options: {
      // Run `postcss-loader` on each CSS `@import` and CSS modules/ICSS imports, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
      // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
      importLoaders: 1,
      modules: {
        localIdentName: '[hash:base64]', // default
        auto: true, // default
      },
      sourceMap: true,
    },
  },
  {
    loader: 'postcss-loader',
    options: { postcssOptions: { plugins: () => [postcssPresetEnv({ stage: 0 })] } },
  },
];

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
    filename: devMode ? 'runtime/bundle.js' : 'runtime/[name].[contenthash].js',
    // unique chunk filename generation
    chunkFilename: `runtime/[name].[contenthash].js`,
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
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset', // <-- Assets module - asset
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb
          },
        },
        generator: {
          //If emitting file, the file path is
          filename: 'runtime/fonts/[hash][ext][query]',
        },
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource', // <-- Assets module - asset/resource
        generator: {
          filename: 'runtime/images/[hash][ext][query]',
        },
      },
      {
        test: /\.css$/,
        use: stylesLoader,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          ...stylesLoader,
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
      {
        test: /\.less$/i,
        use: [
          ...stylesLoader,
          // compiles Less to CSS
          'less-loader',
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              context: __dirname, // context root
              allowTsInNodeModules: true, // allow recompile .ts files
              transpileOnly: true, // fix hot reloading
              configFile: require.resolve('./tsconfig.json'), // tsconfig
            },
          },
        ],
        exclude: /node_modules|.(test|specs?).(ts|js)$/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: Object.assign(
            {
              cacheDirectory: './tmp/babel',
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
            babelConfig,
          ),
        },
      },
    ],
  },
  resolve: {
    extensions: ['.*', '.ts', '.js', '.jsx', '.tsx', '.json'],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify'),
      buffer: require.resolve('buffer/'),
      constants: require.resolve('constants-browserify'),
      stream: require.resolve('stream-browserify'),
    },
  },
  plugins: [
    // This makes it possible for webpack to safely use env vars
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    }),
    // ignore these patterns to exclude from file watcher
    new webpack.WatchIgnorePlugin({
      paths: ['**/img/**', '**/fonts/**'],
    }),
    // generate html
    ...webpackHtmlRoutes(),
    // minify css
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'runtime/css/[name].[contenthash].css',
      chunkFilename: 'runtime/css/[id].[contenthash].css',
    }),
  ],
  /**
   * [Docs](https://webpack.js.org/configuration/dev-server/)
   * @type {import('webpack-dev-server').Configuration}
   */
  devServer: {
    static: './public',
    historyApiFallback: true, // enable react-dom-router support
    hot: false, // hot reloading
    port: 4000, // dev server port
    open: false, // open browser
    compress: true, // enable gzip compression
    host: 'adsense.webmanajemen.com', // local domain by /etc/hosts
    https: false, // redirect to https
    server: {
      type: 'http',
      options: {
        key: './cert/localhost.key',
        cert: './cert/localhost.crt',
      },
    },
    devMiddleware: {
      index: true,
      mimeTypes: { phtml: 'text/html' },
      publicPath: ASSET_PATH,
      serverSideRender: true,
      writeToDisk: true,
      headers: (_req, res, _context) => {
        res.setHeader('Last-Modified', new Date());
      },
    },
  },
  cache: {
    type: 'filesystem',
    cacheDirectory,
  },
};
