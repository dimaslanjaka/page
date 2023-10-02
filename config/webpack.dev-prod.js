const { merge } = require('webpack-merge');
const { spawn } = require('child_process');

let child;

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
          if (child) childKill(child);
          child = spawn('yarn', ['test:dist'], { stdio: 'inherit' });
          callback();
        });
      }
    }
  ]
};

module.exports = merge(require('./webpack.dev'), config);

/**
 * kill spawn
 * @param {import('child_process').ChildProcess|null} child
 */
function childKill(child) {
  if (child) {
    if (child.stdin) child.stdin.pause();
    if (!child.killed) {
      child.kill();
      if (process.platform === 'win32') {
        spawn('taskkill', ['/pid', child.pid, '/f', '/t']);
      } else {
        spawn('kill', ['-9', child.pid], { stdio: 'inherit' });
      }
    }
  }
}
