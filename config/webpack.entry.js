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
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-(dom|window|router|is)|@remix-run|react-router-dom)[\\/]/,
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
        dateVendor: {
          test: /[\\/]node_modules[\\/](moment|moment-timezone|date-fns)[\\/]/,
          name: 'vendor-date',
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
          test: /[\\/]node_modules[\\/](rsuite|@rsuite|rsuite-table)[\\/]/,
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
