const { merge } = require('webpack-merge');
const paths = require('./paths');
const { spawn } = require('git-command-helper');

// run dev server
// build production after compile for dev server

const config = {
  plugins: [
    // run spawn after emit
    {
      /**
       * custom webpack plugin
       * * run exec after asset emitted
       * @param {import('webpack').Compiler} compiler
       */
      apply: compiler => {
        compiler.hooks.afterEmit.tapAsync('AfterEmitPlugin', (_compilation, callback) => {
          // exec('npm run test:dist', {});
          spawn('npm', ['run', 'test:dist'], { stdio: 'inherit', cwd: paths.cwd })
            .catch(console.error)
            .finally(() => callback());
        });
      }
    }
  ]
};

module.exports = merge(require('./webpack.dev'), config);
