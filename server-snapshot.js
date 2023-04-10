const fs = require('fs');
const app = require('./server-core');
const upath = require('upath');

const paths = ['/page/moment-timezone'];

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
