const presets = ['@babel/env', '@babel/react', '@babel/preset-typescript'];
const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: ['./src/'],
      alias: {
        '@utils': './src/utils',
        '@components': './src/components',
        '@routes': './src/routes',
        '@assets': './src/assets',
        '@project': './src/project',
        'src': './src'
      }
    }
  ]
];

module.exports.config = { cacheDirectory: './tmp/babel', presets, plugins };

/**
 *
 * @param {*} api
 * @returns
 */
module.exports = function (api) {
  api.cache(true);

  return { presets, plugins };
};
