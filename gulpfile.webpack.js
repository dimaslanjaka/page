const path = require('path');
const webpack = require('webpack');
const gulp = require('gulp');

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

gulp.task('build:static', function (done) {
  webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
      done(err);
    }
    // Done processing
    done(null);
  });
});
