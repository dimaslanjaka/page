const path = require('path');

const postcssPresetEnv = require('postcss-preset-env').default;
const devMode = /dev/i.test(process.env.NODE_ENV);

/** @type {Parameters<typeof import('postcss')>[0]} */
module.exports = {
  plugins: () => [
    postcssPresetEnv({
      stage: 0,
      env: devMode ? 'development' : 'production',
      browsers: path.resolve(__dirname, '.browserslistrc'),
    }),
  ],
};
