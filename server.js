const express = require('express');
const GulpClient = require('gulp');
const browserSync = require('browser-sync');
const _fs = require('fs');
const _path = require('path');
require('./gulpfile');
const inject = require('connect-browser-sync');
const compileNJK = GulpClient.series('compile');

compileNJK(function () {
	const app = express();
	const bs = browserSync.create().init({
		logSnippet: false,
		files: [
			__dirname,
			{
				match: ['**/*.njk'],
				fn: function (event, file) {
					/** Custom event handler **/
					console.log('[browser-sync]', event, file);
					compileNJK(null);
				},
			},
		],
		cors: true,
	});

	app.use(inject(bs));

	app.use(express.static(__dirname));
	app.use('/page', express.static(__dirname));

	app.listen(4000, function () {
		console.log('http://localhost:4000');
	});
});
