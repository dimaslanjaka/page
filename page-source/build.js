const { default: axios } = require('axios');
const config = require('./config');
const { writefile, path } = require('sbg-utility');
const terserHtml = require('html-minifier-terser');
const { default: _git } = require('git-command-helper');

async function build() {
	const routes = config.routes;
	for (let i = 0; i < routes.length; i++) {
		const route = routes[i];
		const response = await axios.get(route.src);
		const minified = await terserHtml.minify(response.data, { collapseWhitespace: true });
		writefile(path.join(process.cwd(), route.dest), minified);
	}
	// _gulp.series('page:commit')();
}

build();
