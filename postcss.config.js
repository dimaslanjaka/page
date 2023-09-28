const path = require('path');
const fs = require('fs');
// const tailwindcss = require('tailwindcss');
// const postcssPresetEnv = require('postcss-preset-env');
// const devMode = /dev/i.test(process.env.NODE_ENV);

/** @type {Parameters<typeof import('postcss')>[0]} */
module.exports = {
  // plugins: () => [
  // postcssPresetEnv({
  //   stage: 0,
  //   env: devMode ? 'development' : 'production',
  //   browsers: path.resolve(__dirname, '.browserslistrc')
  // }),
  //   'postcss-import',
  //   tailwindcss('../tailwind.config.js'),
  //   require('autoprefixer')
  // ]
  plugins: {
    'postcss-preset-env': {
      stage: 0
    },
    'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: {},
    autoprefixer: {}
  }
};
