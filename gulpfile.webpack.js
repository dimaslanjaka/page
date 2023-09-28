const { spawn } = require('git-command-helper');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');
const babelConfig = require('./.babelrc').config;

if (process.env.TS_NODE_PROJECT) delete process.env.TS_NODE_PROJECT;

/**
 * create webpack config
 * @param {string} entry
 * @param {string} output
 * @returns {webpack.Configuration}
 */
function createConfig(entry, output) {
  const extensions = ['.ts', '.js', '.json'];
  /**
   * @type {webpack.Configuration}
   */
  const override = {
    entry,
    output: {
      filename: path.basename(output),
      path: path.dirname(output)
    },
    resolve: {
      extensions,
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify'),
        buffer: require.resolve('buffer/'),
        constants: require.resolve('constants-browserify'),
        stream: require.resolve('stream-browserify')
      },
      // typescript import paths alias support
      alias: (() => {
        const paths = require('./tsconfig.json').compilerOptions.paths;
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
        { test: /\.ts$/, loader: 'ts-loader' },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: Object.assign(
              {
                cacheDirectory: './tmp/babel',
                presets: ['@babel/preset-env', '@babel/preset-react']
              },
              babelConfig
            )
          }
        }
      ]
    },
    mode: 'production'
  };
  return override;
}

/**
 * build static
 * @param {(...args: any[])=>any} done
 */
const buildStatic = done => {
  webpack(
    [
      createConfig('./src/components/Adsense/utils/index.ts', path.join(__dirname, 'dist/assets/js/r-ads.js')),
      createConfig('./public/page/assets/js/analystic.js', path.join(__dirname, 'dist/assets/js/analystic.js')),
      createConfig('./src/utils/scroll-helper.ts', path.join(__dirname, 'dist/assets/js/remember-scroll-position.js')),
      createConfig('./src/utils/scroll-helper.ts', path.join(__dirname, 'dist/assets/js/scroll-to-hash.js')),
      createConfig('./src/components/Highlight.js/helper.ts', path.join(__dirname, 'dist/assets/js/highlight.js'))
    ],
    (err, stats) => {
      if (stats) {
        process.stdout.write(
          stats.toString({
            // Add console colors
            colors: true
          }) + '\n'
        );
      }
      if (err || stats.hasErrors()) {
        done(err);
      } else {
        // Done processing
        done(null);
      }
    }
  );
};

const buildSite = done =>
  spawn('cross-env-shell', ['NODE_ENV=production', 'webpack', '--mode', 'production'])
    .then(() => done())
    .catch(done);

module.exports = { buildStatic, buildSite };

if (require.main === module) {
  buildStatic(() => {
    //
  });
}
