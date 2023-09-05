const { default: git } = require('git-command-helper');
const gulp = require('gulp');
const { fs, path } = require('sbg-utility');
const Bluebird = require('bluebird');
const glob = require('glob');
const pagepkg = require('./page/package.json');
const { buildPage } = require('./page-source/build');

gulp.task('page:copy', async function () {
  // copy non-compiled files

  const option = [
    // copy workflow
    {
      src: path.join(__dirname, '.github'),
      dest: path.join(__dirname, 'page/.github'),
    },
    // copy dist
    {
      src: path.join(__dirname, 'dist'),
      dest: path.join(__dirname, 'page'),
    },
  ];

  // delete bundled react folder
  const runtimeFolder = path.join(__dirname, 'page/runtime');
  if (fs.existsSync(runtimeFolder)) {
    await fs.rm(runtimeFolder, { recursive: true, force: true });
  }

  await Bluebird.all(option).each(item => {
    // delete destination path except root path
    if (fs.existsSync(item.dest) && item.dest !== path.join(__dirname, 'page')) {
      fs.rmSync(item.dest, { force: true, recursive: true });
    }
    return fs.copy(item.src, item.dest, { overwrite: true });
  });
});

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

gulp.task('page:commit', async function () {
  const currentGit = new git(__dirname);
  const pageGit = new git(path.join(__dirname, 'page'));
  const currentHash = await currentGit.latestCommit();
  try {
    await pageGit.reset('origin/gh-pages');
    await pageGit.add('-A');
    const url = `${(await currentGit.getremote()).fetch.url.replace(/(.git|\/)$/, '')}/commit/${currentHash}`;
    await pageGit.commit('update from ' + url);
  } catch {
    //
  }
  await sleep(700);
  let canPush = await pageGit.canPush();
  if (canPush) pageGit.push();
});

gulp.task('page:build', buildPage);

gulp.task('page:clean', function () {
  return new Promise(resolve => {
    const base = path.join(__dirname, 'page');
    const devPagePkg = Object.keys(pagepkg.devDependencies).map(str => '**/' + str + '/**');
    const unusedFilesInNodeModules = Bluebird.all(
      glob.glob(
        [
          '**/*.md',
          '**/*.html',
          '**/*.flow',
          '**/bower.json',
          '**/*.d.ts',
          '**/.eslint*',
          '**/eslintrc*',
          '**/nodejs-package-types',
          '**/git-command-helper',
          '**/hexo-*',
          '**/cross-spawn',
          '**/@expo',
          '**/binary-collections',
          '**/deepmerge-ts',
          '**/.package-lock.json',
          '**/execa',
          '**/sbg-*',
          '**/@types',
          '**/@eslint',
          '**/@typescript',
          '**/rmdir',
        ].concat(devPagePkg),
        {
          cwd: path.join(base, 'node_modules'),
        },
      ),
    )
      .map(str => path.join(base, 'node_modules', str))
      .each(str => fs.rmSync(str, { recursive: true, force: true }));

    Bluebird.all(unusedFilesInNodeModules).finally(() => {
      resolve(null);
    });
  });
});

gulp.task('page', gulp.series('page:build', 'page:copy', 'page:clean', 'page:commit'));
// gulp.task('build', gulp.series('page'));
// gulp.task('default', gulp.series('page'));
module.exports = gulp;
