const paths = require('./paths');

const index = paths.src + '/index.tsx';

/** @type {import('webpack').Configuration} */
const _mainEntry = {
  entry: {
    bluebird: {
      import: 'bluebird'
    },
    utils: paths.src + '/utils/index.ts',
    adsense: paths.src + '/components/Adsense/utils/index.ts'
    // highlightjs: paths.src + '/components/Highlight.js/helper.ts'
  },
  module: {
    rules: [
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8kb
          }
        },
        generator: {
          // If emitting file, the file path is
          filename: 'runtime/fonts/[hash][ext][query]'
        }
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'runtime/images/[hash][ext][query]'
        }
      }
      // {
      //   test: /\.json$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'runtime/json/[hash][ext][query]'
      //   }
      // }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // dataVendor: {
        //   test: /\.json$/i,
        //   name: 'vendor-data',
        //   chunks: 'all'
        // },
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|@remix-run|react-router|react-router-dom)[\\/]/,
          name: 'vendor-react',
          chunks: 'all'
        },
        corejsVendor: {
          test: /[\\/]node_modules[\\/](core-js)[\\/]/,
          name: 'vendor-corejs',
          chunks: 'all'
        },
        safelinkVendor: {
          test: /[\\/]node_modules[\\/](safelinkify|crypto-js)[\\/]/,
          name: 'vendor-safelink',
          chunks: 'all'
        },
        axiosVendor: {
          test: /[\\/]node_modules[\\/](axios|axios-cache-interceptor)[\\/]/,
          name: 'vendor-axios',
          chunks: 'all'
        },
        tslibVendor: {
          test: /[\\/]node_modules[\\/](tslib)[\\/]/,
          name: 'vendor-tslib',
          chunks: 'all'
        },
        momentVendor: {
          test: /[\\/]node_modules[\\/](moment|moment-timezone)[\\/]/,
          name: 'vendor-moment',
          chunks: 'all'
        },
        lodashVendor: {
          test: /[\\/]node_modules[\\/](lodash)[\\/]/,
          name: 'vendor-lodash',
          chunks: 'all'
        },
        highlightjsVendor: {
          test: /[\\/]node_modules[\\/](highlight.js)[\\/]/,
          name: 'vendor-highlightjs',
          chunks: 'all'
        },
        firebaseVendor: {
          test: /[\\/]node_modules[\\/](firebase|@firebase)[\\/]/,
          name: 'vendor-firebase',
          chunks: 'all'
        },
        rsuiteVendor: {
          test: /[\\/]node_modules[\\/](rsuite|@rsuite)[\\/]/,
          name: 'vendor-rsuite',
          chunks: 'all'
        },
        bootstrapVendor: {
          test: /[\\/]node_modules[\\/](bootstrap|@popperjs)[\\/]/,
          name: 'vendor-bootstrap',
          chunks: 'all'
        },
        mockVendor: {
          test: /[\\/]node_modules[\\/](@faker-js)[\\/]/,
          name: 'vendor-mock',
          chunks: 'all'
        }
      }
    }
  }
};

_mainEntry.entry.main = {
  import: [index],
  dependOn: Object.keys(_mainEntry.entry)
};

module.exports = _mainEntry;
