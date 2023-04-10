import sass from 'node-sass';
import { writefile } from 'sbg-utility';
import upath from 'upath';

export interface sassMiddlewareOptions {
	[key: string]: any;
	/**
	 * source scss folder
	 */
	src: string;
	/**
	 * destination css folder
	 */
	dest: string;
	/**
	 * base url pathname
	 */
	base?: string;
	/**
	 * root directory
	 */
	cwd?: string;
}

/**
 * modded sass middleware
 * @param options
 * @returns
 */
export default function sassMiddleware(options: sassMiddlewareOptions): import('express').RequestHandler {
	options = Object.assign({ cwd: process.cwd(), base: '' }, options);
	// Source directory (required)
	const src =
		options.src ||
		(function () {
			throw new Error('sass.middleware() requires "src" directory.');
		})();
	// Destination directory (source by default)
	const dest = options.dest || src;
	// cache max age
	const maxAge = options.maxAge || 0;

	return function sassRenderer(req, res, next) {
		const pathname = new URL('http://' + req.hostname + req.url).pathname;
		if (!/\.css$/.test(pathname) || upath.extname(pathname) !== '.css') {
			if (options.debug) console.log('debug', 'skip', pathname, 'nothing to do');
			return next();
		}

		const fixedPath = pathname.replace(options.base, '');
		const cssPath = upath.join(dest, fixedPath);
		const sassPath = upath.join(src, fixedPath.replace(/\.css$/, '.scss'));
		const sassDir = upath.dirname(sassPath);

		writefile(
			'tmp/node-sass-middleware/' + pathname + '.log',
			JSON.stringify({ dest, src, cssPath, sassPath, sassDir }, null, 2),
		);

		const result = sass.renderSync({
			file: sassPath,
			outFile: cssPath,
			outputStyle: /dev/i.test(process.env.NODE_ENV) ? 'expanded' : 'compressed',
		});
		if (options.debug) console.log('css written', writefile(cssPath, String(result.css)).file);

		res.writeHead(200, {
			'Content-Type': 'text/css',
			'Cache-Control': 'max-age=' + maxAge,
		});
		res.end(result.css);
	};
}
