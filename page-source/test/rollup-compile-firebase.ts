import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import * as rollup from 'rollup';
import tsconfig from '../tsconfig.json';
import * as util from 'sbg-utility';

const options: rollup.RollupOptions = {
  // the entry point file described above
  input: 'source/assets/js/google/login.js',
  // the output for the build folder described above
  output: {
    file: 'tmp/bundle.js',
    // Optional and for development only. This provides the ability to
    // map the built code back to the original source format when debugging.
    sourcemap: 'inline',
    // Configure Rollup to convert your module code to a scoped function
    // that "immediate invokes". See the Rollup documentation for more
    // information: https://rollupjs.org/guide/en/#outputformat
    format: 'iife',
  },
  // Add the plugin to map import paths to dependencies
  // installed with npm
  plugins: [
    json(),
    nodeResolve({ preferBuiltins: true }),
    commonjs(),
    typescript(
      Object.assign(tsconfig.compilerOptions, {
        lib: ['es2015', 'dom'],
        module: 'ESNext',
        target: 'es5',
        outputToFilesystem: true,
      }),
    ),
  ],
};

rollup.rollup(options).then(bundler => {
  bundler.generate({ format: 'umd' }).then(output => {
    let code = '';
    for (const chunkOrAsset of output.output) {
      if (chunkOrAsset.type === 'asset') {
        //console.log('Asset', chunkOrAsset);
      } else {
        //console.log('Chunk', chunkOrAsset.module);
        code += chunkOrAsset.code;
      }
    }
    util.writefile('tmp/test/bundle.js', code);
  });
});
