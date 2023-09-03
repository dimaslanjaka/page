const TerserPlugin = require('terser-webpack-plugin');
const { resolve } = require('upath');
var webpack = require('webpack');
const ResolveTypeScriptPlugin = require('resolve-typescript-plugin');

/** @type {webpack.Configuration[]} */
const config = [];

function gen(fn) {
  /** @type {webpack.Configuration} */
  const config = {
    entry: './src/index.ts',
    watchOptions: {
      aggregateTimeout: 10000,
      poll: 1000,
      followSymlinks: true,
      ignored: /node_modules|tmp|tests|typings|dist/,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    module: {
      rules: [
        {
          test: /\.(ts|js)?$/,
          use: 'ts-loader',
          exclude: /node_modules|.test.(ts|js)$/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
      plugins: [new ResolveTypeScriptPlugin()],
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        path: require.resolve('path-browserify'),
        fs: false,
      },
    },
    output: {
      filename: fn + '.js',
      path: resolve(__dirname, 'dist'),
      sourceMapFilename: fn + '.map',
      library: 'safelinkify',
      libraryTarget: 'umd',
      globalObject: 'this',
    },
    mode: fn.includes('.min') ? 'production' : 'development',
  };
  return config;
}

['bundle', 'bundle.min'].forEach(function (key) {
  config.push(gen(key));
});

module.exports = config;
