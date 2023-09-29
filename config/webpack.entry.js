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
    // 'crypto-js': {
    //   import: 'crypto-js'
    // }
    // initStyle: {
    //   import: ['autoprefixer']
    // },
    // rsuite: {
    //   import: ['rsuite', '@rsuite/icons'],
    //   dependOn: ['bootstrap', 'initStyle']
    // },
    // bootstrap: {
    //   import: ['bootstrap', '@popperjs/core'],
    //   dependOn: ['initStyle']
    // },
    // axios: {
    //   import: ['axios', 'axios-cache-interceptor']
    // },
    // moment: {
    //   import: 'moment'
    // },
    // 'moment-timezone': {
    //   import: 'moment-timezone',
    //   dependOn: 'moment'
    // },
    // safelinkify: {
    //   import: 'safelinkify',
    //   dependOn: ['crypto', 'moment', 'moment-timezone']
    // },
    // firebase: {
    //   import: ['firebase/auth', 'firebase/app'],
    //   dependOn: ['bluebird']
    // }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
          name: 'vendor-react',
          chunks: 'all'
        },
        corejsVendor: {
          test: /[\\/]node_modules[\\/](core-js)[\\/]/,
          name: 'vendor-corejs',
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

/** @type {import('webpack').Configuration} */
const _defaults = {
  entry: [index]
};

/** @type {import('webpack').Configuration} */

const _test = {
  entry: {
    main: {
      import: index
    }
  }
};

module.exports = _mainEntry;
