const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { terser } = require('rollup-plugin-terser');
const json = require('@rollup/plugin-json');
const typescript = require('@rollup/plugin-typescript');
const tsconfig = require('./tsconfig.json');
const tsbase = require('./tsconfig.base.json');
const lib = require('./package.json');
const polyfill = require('rollup-plugin-polyfill-node');
const { deepmerge } = require('deepmerge-ts');
const glob = require('glob');
const path = require('upath');
const { writefile } = require('sbg-utility');

/**
 * @type {Parameters<typeof typescript['default']>[0]}
 */
const tsOpt = deepmerge(tsbase, tsconfig, {
  compilerOptions: {
    module: 'esnext',
    lib: ['es2020', 'dom'],
    target: 'es5',
    allowSyntheticDefaultImports: true,
    skipLibCheck: true,
  },
  outputToFilesystem: true,
});
if (tsOpt.extends) delete tsOpt.extends;

/**
 * default options
 * @type {import('rollup').RollupOptions}
 */
const defaultOpt = {
  output: {
    //file: `dist/browser/${outputFileName}`,
    //name,
    format: 'umd',
    exports: 'default',
    banner: `// ${lib.name} v${lib.version} Copyright (c) ${new Date().getFullYear()} ${lib.author}`,
  },
  plugins: [
    typescript(tsOpt),
    // const json = require('@rollup/plugin-json');
    json(),
    // const polyfill = require('rollup-plugin-polyfill-node');
    polyfill(),
    // const resolve = require('@rollup/plugin-node-resolve');
    resolve.default({
      // To provide stubbed versions of Node built-ins with plugin rollup-plugin-polyfill-node
      preferBuiltins: false,
      // To instructs the plugin to use the browser module resolutions in package.json and adds 'browser' to exportConditions
      browser: true,
    }),
    // const commonjs = require('@rollup/plugin-commonjs');
    commonjs.default({
      include: /node_modules/,
      requireReturnsDefault: 'auto', // solves default issue
    }),
    // const { terser } = require('rollup-plugin-terser');
    terser(),
  ],
  external: ['moment', 'bluebird'],
};

/** @type {import('rollup').RollupOptions[]} */
const rollupOpt = glob
  .sync(['**/*.ts', '**/*.js'], {
    cwd: path.join(__dirname, 'public'),
    posix: true,
    ignore: ['**/country/**', '**/aes.js'],
  })
  .map(input => {
    return deepmerge(defaultOpt, {
      input: path.join('public', input),
      output: {
        file: path.join(__dirname, input),
        name: 'lenarox',
        format: 'iife',
        exports: undefined,
        banner: `// ${lib.name} v${lib.version} Copyright (c) ${new Date().getFullYear()} ${lib.author}`,
      },
    });
  });

console.log(writefile('tmp/dump/rollupConfig.json', { rollupOpt, tsOpt }).file);

module.exports = rollupOpt;
