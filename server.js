const express = require('express');
const GulpClient = require('gulp');
const browserSync = require('browser-sync');
const { readdirSync, readFileSync, writeFileSync, statSync } = require('fs');
const { envNunjucks } = require('./gulpfile');
const nunjucks = require('nunjucks');
const { join } = require('path');

const env = envNunjucks();
GulpClient.series('compile')(null);

// build index.html
const files = readdirSync(__dirname)
	.map(filename => {
		return {
			filename,
			absolutePath: join(__dirname, filename),
		};
	})
	.filter(o => {
		const stat = statSync(o.absolutePath);
		if (stat.isDirectory()) return false;

		return o.filename.endsWith('.html');
	});
const list = files.map(file => `<li><a href='${file.filename}'>${file.filename}</a></li>`).join('\n');
const template = nunjucks.compile(readFileSync(join(__dirname, '_layout.njk'), 'utf-8'), env);
const render = template.render({
	title: 'Index Page',
	content: `<ul>` + list + `</ul>`,
});

writeFileSync(join(__dirname, 'index.html'), render);

const app = express();
const bs = browserSync.create().init({
	logSnippet: false,
	files: __dirname,
});
app.use(require('connect-browser-sync')(bs));

app.use(express.static(__dirname));
app.use('/page', express.static(__dirname));

app.listen(4000, function () {
	console.log('http://localhost:4000');
});
