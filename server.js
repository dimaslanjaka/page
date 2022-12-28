const express = require('express');
const GulpClient = require('gulp');
const browserSync = require('browser-sync');
require('./gulpfile');
const inject = require('connect-browser-sync');
const { join } = require('path');
const compileNJK = GulpClient.series('compile');
const { mkdirpSync, existsSync, readFileSync } = require('fs-extra');

const tmpdir = join(__dirname, 'tmp');
if (!existsSync(tmpdir)) mkdirpSync(tmpdir);

compileNJK(function () {
	const app = express();
	const bs = browserSync.create().init({
		logSnippet: false,
		files: [
			__dirname,
			{
				match: ['**/*.njk', '**/*.scss'],
				fn: function (event, file) {
					/** Custom event handler **/
					console.log('[Browsersync]', event, file);
					compileNJK(null);
				},
			},
		],
		ignore: ['**/.git*', '**/tmp/**', '**/build/**'],
		cors: true,
	});

	app.use(inject(bs));

	app.use(express.static(__dirname));
	app.use('/page', express.static(__dirname));
	app.use('/node_modules', express.static(join(__dirname, 'node_modules')));
	app.use('/favicon.ico', async function (_, res) {
		const read = readFileSync(join(__dirname, 'assets/img/w-icon-25.png'));
		res.setHeader('content-type', 'image/png');
		res.send(read);
	});

	app.listen(4000, function () {
		console.log('http://localhost:4000');
	});
});
