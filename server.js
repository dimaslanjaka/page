const express = require('express');
const GulpClient = require('gulp');
const browserSync = require('browser-sync');
require('./gulpfile');
const inject = require('connect-browser-sync');
const { join } = require('path');
const compileNJK = GulpClient.series('compile');
const axios = require('axios');

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
	app.use('/favicon.ico', function (_, res) {
		axios
			.get('http://www.google.com/s2/favicons?domain=www.webmanajemen.com')
			.then(response => {
				console.log(response);
				res.send(response);
			})
			.catch(err => {
				console.log(err);
			});
	});

	app.listen(4000, function () {
		console.log('http://localhost:4000');
	});
});
