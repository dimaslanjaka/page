const gulp = require('gulp');
const spawn = require('child_process').spawn;
/** @type {ReturnType<typeof spawn>|null} */
let child = null;

const testDist = function (taskDone) {
  /** @type {gulp.TaskFunction} */
  const runTestDist = function (cb) {
    if (child) {
      // console.log('kill start', child.pid, 'killed', child.killed);
      childKill(child);
      // console.log('kill end', child.pid, 'killed', child.killed);
      child = null;
    }
    child = spawn('yarn', ['test:dist'], { stdio: 'inherit' });
    // child.on('exit', () => cb());
    cb();
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
    childKill(child);
    taskDone();
  });
};

gulp.task('test:dist', testDist);
gulp.task('td', testDist);

/**
 * kill spawn
 * @param {ReturnType<typeof spawn>|null} child
 */
function childKill(child) {
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

module.exports = { childKill, testDist };
