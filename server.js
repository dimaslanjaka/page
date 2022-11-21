const express = require('express');
const GulpClient = require('gulp');
const browserSync = require('browser-sync');
const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { envNunjucks } = require('./gulpfile');
const nunjucks = require('nunjucks');
const { join } = require('path');

const env = envNunjucks();
GulpClient.series('compile')(null);

// build index.html
const files = readdirSync(__dirname)
	.concat(readdirSync(join(__dirname, 'js')))
	.concat(readdirSync(join(__dirname, 'auto-table-of-contents')))
	.filter(filename => filename.endsWith('.html'));
const list = files.map(file => `<li><a href='${file}'>${file}</a></li>`).join('\n');
const template = nunjucks.compile(readFileSync(join(__dirname, 'server.njk'), 'utf-8'), env);
const render = template.render({
	title: 'Index Page',
	contents: `<ul>` + list + `</ul>`,
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
