require('ts-node').register({ projectSearchDir: __dirname });

const { encodeURL } = require('hexo-util');
const express = require('express');
const fs = require('fs-extra');
const nunjucks = require('nunjucks');
const path = require('path');
const { writefile } = require('sbg-utility');
const { default: logger } = require('./src/logger');
const sass = require('./src/node-sass-middleware2').default;
const rollup = require('./src/rollup-middleware2').default;
const browserSync = require('browser-sync');
const inject = require('connect-browser-sync');
const { default: git } = require('git-command-helper');
const { isDev } = require('./src/utils');
const { default: minifyHtmlMiddleware } = require('./src/html-render-minifier');
const terser = require('@rollup/plugin-terser');

const console = new logger('server');
const app = express();

// engine start
const view_path = [path.join(__dirname, 'views'), path.join(__dirname, 'views/google')];

const env = nunjucks.configure(view_path, {
  autoescape: true,
  express: app,
  noCache: isDev(),
});
env.addFilter('uriencode', str => {
  return encodeURL(str);
});
env.addFilter('noControlChars', str => {
  return str.replace(/[\x00-\x1F\x7F]/g, ''); // eslint-disable-line no-control-regex
});
// Extract date from datetime
env.addFilter(
  'formatDate',
  /**
   *
   * @param {import('moment-timezone').Moment} input
   * @returns
   */
  input => {
    return input.toISOString().substring(0, 10);
  },
);
env.addGlobal('css', str => {
  return `
<link
	rel="preload"
	href="${str}"
	as="style"
	onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript>
	<link rel="stylesheet" href="${str}" />
</noscript>
	`.trim();
});

app.engine('html', env.render);
app.set('view engine', 'html');

// sass middleware
app.use(
  '/page',
  sass({
    src: path.join(__dirname, 'source'), // Input SASS source folder
    dest: path.join(__dirname, '../page'), // Output CSS destination folder
    debug: false,
    app,
    base: '/page',
    cwd: __dirname,
  }),
);

// rollup middleware
const rollupOpt = {
  src: 'source',
  dest: '../page',
  cwd: __dirname,
  debug: false,
  //prefix: '/js',
  plugins: [],
};
if (!isDev()) rollupOpt.plugins.push(terser());

app.use('/page', rollup(rollupOpt));

// minify html middleware
if (!isDev()) app.use('/page', minifyHtmlMiddleware({ debug: false }));
// engine ends

// browser-sync start
if (isDev()) {
  const bs = browserSync.create().init({
    logSnippet: false,
    files: [
      //__dirname,
      {
        match: ['views/**/*.njk', 'source/**/*.scss', 'source/**/*.js'],
        fn: function (event, file) {
          /** Custom event handler **/
          console.log('[Browsersync]', event, file);
          browserSync.reload();
        },
      },
    ],
    ignore: ['**/.git*', '**/tmp/**', '**/build/**'],
    cors: true,
  });
  app.use(inject(bs));
}
// browser-sync ends

// server static files
// app.use(express.static(path.join(__dirname, '../page')));
app.use('/page/assets', express.static(path.join(__dirname, '../page/assets')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/page/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/favicon.ico', async function (_, res) {
  const read = fs.readFileSync(path.join(__dirname, 'source/assets/img/w-icon-25.png'));
  res.setHeader('content-type', 'image/png');
  res.send(read);
});
// static files ends

let identifier = 'GEN-HASH';

// dynamic routes
app.use('/page/:permalink', async function (req, res) {
  if (identifier === 'GEN-HASH') {
    const github = new git(__dirname);
    identifier = await github.latestCommit();
  }

  let { permalink } = req.params;
  if (permalink.length === 0) permalink = 'index';
  let basename = path.basename(permalink, path.extname(permalink));
  if (basename.length === 0) basename = 'index';
  const dirname = path.dirname(permalink);
  let viewPath = path.join(__dirname, 'views', dirname, basename + '.njk');
  let pathname = new URL('http://' + req.hostname + req.url).pathname;
  if (pathname.length === 0) pathname = 'index';
  if (!fs.existsSync(viewPath)) {
    // resolve real view when first view not exist
    viewPath = path.join(__dirname, 'views', req.originalUrl.replace(/\/page\//, '').replace(/.html$/, '.njk'));
  }
  const viewData = { identifier, dirname, basename, viewPath, permalink };
  writefile('tmp/routes/' + pathname + '.log', JSON.stringify(viewData, null, 2));
  const notfoundlayout = path.join(__dirname, 'views/404.njk');
  if (fs.existsSync(viewPath)) {
    res.render(viewPath, { identifier }, function (err, html) {
      if (err) {
        console.log('fail render', permalink);
        res.render(notfoundlayout, viewData);
      } else {
        console.log('success render', permalink);
        res.send(html);
      }
    });
  } else {
    res.render(notfoundlayout, viewData);
  }
});
//

module.exports = { app };
