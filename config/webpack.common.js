const paths = require('./paths');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  title: 'Website Manajemen Indonesia',
  template: paths.public + '/index.html', // template file
  filename: 'index.html' // output file
});
/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: [paths.src + '/index.tsx'],
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    chunkFilename: `runtime/chunk/[name].[chunkhash].js`,
    assetModuleFilename: 'runtime/media/[name][hash][ext][query]',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(t|j|cj|mj)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(s[a|c]ss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(), htmlPlugin],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss'],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify'),
      buffer: require.resolve('buffer/'),
      constants: require.resolve('constants-browserify'),
      stream: require.resolve('stream-browserify')
    }
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: paths.tmp
  }
};
