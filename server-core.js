require('ts-node').register({ projectSearchDir: __dirname });

const express = require('express');
const browserSync = require('browser-sync');
const inject = require('connect-browser-sync');
const fs = require('fs-extra');
const nunjucks = require('nunjucks');
const path = require('path');
const { writefile } = require('sbg-utility');
const sass = require('./src/node-sass-middleware2').default;

const app = express();

// browser-sync start
const bs = browserSync.create().init({
	logSnippet: false,
	files: [
		//__dirname,
		{
			match: ['**/*.njk', '**/*.scss'],
			fn: function (event, file) {
				/** Custom event handler **/
				console.log('[Browsersync]', event, file);
			},
		},
	],
	ignore: ['**/.git*', '**/tmp/**', '**/build/**'],
	cors: true,
});
app.use(inject(bs));
// browser-sync ends

// engine start
app.engine('html', nunjucks.render);
nunjucks.configure('views', {
	autoescape: true,
	express: app,
});

app.set('view engine', 'html');

app.use(
	'/page',
	sass({
		src: path.join(__dirname, 'source'), // Input SASS source folder
		dest: path.join(__dirname, 'page'), // Output CSS destination folder
		debug: true,
		app,
		base: '/page',
		cwd: __dirname,
	}),
);
// engine ends

// server static files
app.use(express.static(path.join(__dirname, 'source')));
app.use('/page', express.static(path.join(__dirname, 'source')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/page/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/favicon.ico', async function (_, res) {
	const read = fs.readFileSync(path.join(__dirname, 'source/page/assets/img/w-icon-25.png'));
	res.setHeader('content-type', 'image/png');
	res.send(read);
});
// static files ends

// dynamic routes
app.use('/page/:permalink', function (req, res) {
	const { permalink } = req.params;
	const basename = path.basename(permalink, path.extname(permalink));
	const dirname = path.dirname(permalink);
	const realpath = path.join(__dirname, 'views', dirname, basename + '.njk');
	const pathname = new URL('http://' + req.hostname + req.url).pathname;
	writefile('tmp/node-sass-middleware/' + pathname + '.log', JSON.stringify({ dirname, basename, realpath }, null, 2));
	res.render(realpath, {}, function (err, html) {
		if (err) {
			console.log('fail render', permalink);
			res.render('404.njk');
		} else {
			console.log('success render', permalink);
			res.send(html);
		}
	});
});
//

module.exports = app;
