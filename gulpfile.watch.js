const gulp = require('gulp');
const spawn = require('child_process').spawn;
require('ts-node').register();

/** @type {import('child_process').ChildProcess[]} */
let childs = [];
// /** @type {AbortController|null} */
// let abortController = null;
/** @type {import('child_process').ChildProcess|null} */
let winIndicator;
let winQueue = false;

const testDist = function (taskDone) {
  /** @type {gulp.TaskFunction} */
  const runTestDist = function (cb) {
    childKill(childs);
    if (process.platform === 'win32') {
      // windows doesnt kill subprocesses
      // if (abortController) abortController.abort();
      // abortController = new AbortController();
      // // yarn build:webpack
      // require('./gulpfile.webpack').buildSite(async () => {
      //   // yarn build:html
      //   await require('./html/generate').generateRouteHtml();
      //   // gulp page:copy
      //   await require('./gulpfile.shared').copy();
      // });
      if (!winIndicator) {
        winIndicator = spawn('yarn', ['test:dist'], { stdio: 'inherit', shell: true }).on('exit', () => {
          winIndicator = null;
          if (winQueue) {
            winQueue = false;
            // re-run current task
            runTestDist(cb);
          } else {
            cb();
          }
        });
      } else {
        console.log('another instance still running', winIndicator.pid);
        winQueue = true;
        cb();
      }
    } else {
      const child = spawn('yarn', ['test:dist'], { stdio: 'inherit', shell: true });
      // child.on('exit', () => cb());
      childs.push(child);
      cb();
    }
  };
  runTestDist(() => {
    //
  });
  const watcher = gulp.watch(
    [
      '.babelrc.js',
      'tsconfig.json',
      'src/**/*.{js,jsx,ts,tsx,scss}',
      'config/**/*.{js,json}',
      'public/**/*.{js,html,json}',
      'html/**/*.{tsx,js,ts}',
      '!page/**/*',
      '!**/node_modules/**',
      '!dist/**/*'
    ],
    runTestDist
  );
  process.once('SIGINT', function () {
    console.log('signint signal received');
    if (watcher) watcher.close();
    childKill(childs);
    taskDone();
  });
};

gulp.task('test:dist', testDist);
gulp.task('td', testDist);

/**
 * kill spawn
 * @param {import('child_process').ChildProcess[]} childs
 */
function childKill(childs) {
  for (let i = 0; i < childs.length; i++) {
    const child = childs.shift();
    if (child) {
      if (child.stdin) child.stdin.pause();
      if (child.stdout) child.stdout.destroy();
      if (child.stderr) child.stderr.destroy();
      if (!child.killed) {
        child.kill();
        if (process.platform === 'win32') {
          spawn('taskkill', ['/pid', child.pid, '/f', '/t'], { shell: true });
        } else {
          spawn('kill', ['-9', child.pid], { stdio: 'inherit' });
        }
      }
    }
    console.log(child.pid, 'killed', child.killed);
  }
}

module.exports = { childKill, testDist };
