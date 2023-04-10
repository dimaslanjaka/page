const { default: axios } = require('axios');
const config = require('./config');
const { writefile } = require('sbg-utility');
const terserHtml = require('html-minifier-terser');

config.routes.forEach(routes => {
	axios.get(routes.src).then(response => {
		terserHtml.minify(response.data, { collapseWhitespace: true }).then(minified => {
			writefile(routes.dest.replace('__dirname', __dirname), minified);
		});
	});
});
