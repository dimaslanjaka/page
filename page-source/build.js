const { default: axios } = require('axios');
const config = require('./config');
const { writefile, path } = require('sbg-utility');
const terserHtml = require('html-minifier-terser');
const { default: _git } = require('git-command-helper');
const jsdom = require('jsdom').JSDOM;

async function build() {
	const routes = config.routes;
	for (let i = 0; i < routes.length; i++) {
		const route = routes[i];
		const response = await axios.get(route.src);
		const dom = new jsdom(response.data);
		const window = dom.window;
		// remove browsersync script
		window.document.querySelector('script#__bs_script__').remove();
		const html = dom.serialize();
		const minified = await terserHtml.minify(html, { collapseWhitespace: true });
		writefile(path.join(process.cwd(), route.dest), minified);
	}
	// _gulp.series('page:commit')();
}

build();
