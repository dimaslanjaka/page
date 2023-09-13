const { spawn } = require('git-command-helper');
const path = require('path');
const webpack = require('webpack');
const babelConfig = require('./.babelrc').config;

/**
 * create webpack config
 * @param {string} entry
 * @param {string} output
 * @returns {webpack.Configuration}
 */
function createConfig(entry, output) {
  /**
   * @type {webpack.Configuration}
   */
  const override = {
    entry,
    output: {
      filename: path.basename(output),
      path: path.dirname(output),
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        { test: /\.ts$/, loader: 'ts-loader' },
        {
          test: /\.js$/,
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
    mode: 'production',
  };
  return override;
}

const buildStatic = done => {
  webpack(
    [
      createConfig('./src/utils/adsense/index.ts', path.join(__dirname, 'dist/assets/js/r-ads.js')),
      createConfig('./public/page/assets/js/analystic.js', path.join(__dirname, 'dist/assets/js/analystic.js')),
    ],
    (err, stats) => {
      if (stats) {
        process.stdout.write(
          stats.toString({
            // Add console colors
            colors: true,
          }) + '\n',
        );
      }
      if (err || stats.hasErrors()) {
        done(err);
      } else {
        // Done processing
        done(null);
      }
    },
  );
};

const buildSite = done =>
  spawn('cross-env-shell', ['NODE_ENV=production', 'webpack', '--mode', 'production'])
    .then(() => done())
    .catch(done);

module.exports = { buildStatic, buildSite };
