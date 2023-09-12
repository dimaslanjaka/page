const { spawn } = require('git-command-helper');
const path = require('path');
const webpack = require('webpack');

const config = {
  entry: './src/utils/adsense/index.ts',
  output: {
    filename: 'r-ads.js',
    path: path.resolve(__dirname, 'dist/assets/js'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }],
  },
};

const buildStatic = done => {
  webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
      done(err);
    }
    // Done processing
    done(null);
  });
};

const buildSite = done =>
  spawn('cross-env-shell', ['NODE_ENV=production', 'webpack', '--mode', 'production'])
    .then(() => done())
    .catch(done);

module.exports = { buildStatic, buildSite };
