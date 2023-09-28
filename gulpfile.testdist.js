const gulp = require('gulp');
const spawn = require('child_process').spawn;
/** @type {ReturnType<typeof spawn>|null} */
let child = null;

gulp.task('test:dist', function (taskDone) {
  /** @type {gulp.TaskFunction} */
  const runTestDist = function (cb) {
    if (child) {
      console.log('kill start', child.pid, 'killed', child.killed);
      if (child.stdin) child.stdin.pause();
      if (!child.killed) child.kill();
      if (process.platform === 'win32') {
        spawn('taskkill', ['/pid', child.pid, '/f', '/t']);
      } else {
        spawn('kill', ['-9', child.pid], { stdio: 'inherit' });
      }
      console.log('kill end', child.pid, 'killed', child.killed);
      child = null;
    }
    child = spawn('yarn', ['test:dist'], { stdio: 'inherit' });
    // child.on('exit', () => cb());
    cb();
  };
  runTestDist(() => {
    //
  });
  gulp.watch(
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
});
