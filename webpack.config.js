const { path, fs } = require('sbg-utility');
const ResolveTypeScriptPlugin = require('resolve-typescript-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  // config .browserlistrc
  target: 'browserslist',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules|.test.(ts|js)$/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
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
    extensions: ['*', '.ts', '.js', '.jsx'],
    plugins: [new ResolveTypeScriptPlugin()],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      path: require.resolve('path-browserify'),
      fs: false,
      process: false,
    },
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  plugins: [new MiniCssExtractPlugin()],
  /**
   * [Docs](https://webpack.js.org/configuration/dev-server/)
   * @type {import('webpack-dev-server').Configuration}
   */
  devServer: {
    //static: path.resolve(__dirname, './public'),
    historyApiFallback: true,
    hot: false, // disable hot reloading
    compress: true,
    allowedHosts: 'all',
    port: 4000,
    open: false,
  },
  //externals: [nodeExternals()],
  watch: false,
  watchOptions: {
    poll: 10000, // Check for changes every second
    aggregateTimeout: 1000, // delay for compile
    ignored: /node_modules/,
  },
};
