const purgecss = require('@fullhuman/postcss-purgecss');
const postcssPresetEnv = require('postcss-preset-env');

/** @type {Parameters<typeof import('postcss')>[0]} */
module.exports = {
  plugins: () => [
    postcssPresetEnv({ stage: 0 }),
    purgecss({
      content: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
      // Treat every word in the bundle as a CSS selector
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ],
};
