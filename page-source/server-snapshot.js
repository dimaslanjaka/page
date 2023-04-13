const fs = require('fs');
const upath = require('upath');
const { default: axios } = require('axios');
const config = require('./config');
const { writefile } = require('sbg-utility');
const terserHtml = require('html-minifier-terser');

const paths = ['/page/moment-timezone'];

const _static = () => {
	const app = require('./server-core');
	paths.forEach(path => {
		app.render(
			path,
			{
				// optional metadata here
			},
			(err, res) => {
				if (err) console.log('Error rendering ' + path, err);
				else {
					fs.writeFile(upath.join(__dirname, '/tmp/public/', path + '.html'), res, function (err, _res) {
						if (err) console.log('error saving html file', path, err);
					});
				}
			},
		);
	});
};

/**
 * generate html using axios
 */
const _dynamic = () => {
	config.routes.forEach(routes => {
		axios.get(routes.src).then(response => {
			terserHtml.minify(response.data, { collapseWhitespace: true }).then(minified => {
				writefile(routes.dest.replace('__dirname', __dirname), minified);
			});
		});
	});
};

_dynamic();
