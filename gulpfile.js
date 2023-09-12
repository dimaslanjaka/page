const { default: git } = require('git-command-helper');
const gulp = require('gulp');
const { fs, path } = require('sbg-utility');
const Bluebird = require('bluebird');
const glob = require('glob');
const pagepkg = require('./page/package.json');
const safelinkify = require('safelinkify');
const through2 = require('through2');
const { restore } = require('./gulpfile.backup');
require('./gulpfile.webpack');

const pageGit = new git(path.join(__dirname, 'page'));

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
    // copy static files
    {
      src: path.join(__dirname, 'public/page'),
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

  // safelinkify external url
  await new Promise((resolve, reject) => {
    const cwd = path.join(__dirname, 'dist');
    const dest = path.join(__dirname, 'page');
    gulp
      .src('**/*.html', { cwd })
      .on('end', () => resolve(null))
      .on('error', reject)
      .pipe(
        through2.obj(async (vinyl, _enc, callback) => {
          if (vinyl.isNull() || vinyl.isStream()) return callback(); // skip null and stream object
          const safelink = new safelinkify.safelink({
            // exclude patterns (dont anonymize these patterns)
            exclude: [
              /https?:\/\/?(?:([^*]+)\.)?webmanajemen\.com/,
              /([a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?[.])*webmanajemen\.com/,
            ],
            // url redirector
            redirect: 'https://www.webmanajemen.com/page/safelink.html?url=',
            // debug
            verbose: false,
            // encryption type = 'base64' | 'aes'
            type: 'base64',
            // password aes, default = root
            password: 'unique-password',
          });
          let str = Buffer.from(vinyl.contents).toString();
          str = await safelink.parse(str);
          vinyl.contents = Buffer.from(str);
          if (this.push) this.push(vinyl); // emit this file
          callback(null, vinyl); // emit new data
        }),
      )
      .pipe(gulp.dest(dest));
  });
});

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

gulp.task('page:commit', async function () {
  const currentGit = new git(__dirname);
  const currentHash = await currentGit.latestCommit();
  try {
    //await pageGit.reset('gh-pages');
    await pageGit.add('-A');
    const url = `${(await currentGit.getremote()).fetch.url.replace(/(.git|\/)$/, '')}/commit/${currentHash}`;
    await pageGit.commit('update from ' + url);
  } catch {
    //
  }
  await sleep(700);
  let canPush = await pageGit.canPush();
  console.log('is can push', canPush);
  //if (canPush) pageGit.push();
});

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

gulp.task(
  'build',
  gulp.series(
    // reset to latest commit of remote
    restore,
    // build static files
    'build:static',
    // copy ./dist to ./page
    'page:copy',
    // clean node_modules
    'page:clean',
    // commit
    'page:commit',
  ),
);
// gulp.task('build', gulp.series('page'));
// gulp.task('default', gulp.series('page'));

module.exports = gulp;
