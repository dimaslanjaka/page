const gulp = require('gulp');
const { restore, backup } = require('./gulpfile.backup');
const { buildStatic } = require('./gulpfile.webpack');
const purgeCSSExecutor = require('./gulpfile.purgecss');
const { copy, commit, clean } = require('./gulpfile.shared');
require('./gulpfile.watch');

gulp.task('page:copy', copy);

gulp.task('page:commit', commit);

gulp.task('page:clean', clean);

gulp.task('purgecss', gulp.series(purgeCSSExecutor));

gulp.task(
  'build',
  gulp.series(
    // reset to latest commit of remote
    restore,
    // build static files
    buildStatic,
    // purge css (remove unused css from dist files)
    //'purgecss',
    // copy ./dist to ./page
    'page:copy',
    // clean node_modules
    'page:clean',
    // commit
    'page:commit'
  )
);

// remove ./page/\n
gulp.task('backup', gulp.series(backup));
// restore to latest origin/gh-pages
gulp.task('restore', gulp.series(restore));
// default task is build task
gulp.task('default', gulp.series('build'));

module.exports = gulp;
