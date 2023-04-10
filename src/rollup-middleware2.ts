import assert from 'assert';
import { rollup } from 'rollup';
import { writefile } from 'sbg-utility';
import path from 'upath';

const defaults = {
	mode: 'compile',
	bundleExtension: '.bundle',
	src: null as string,
	dest: null as string,
	cwd: process.cwd(),
	prefix: null,
	rebuild: 'deps-change', // or 'never' or 'always'
	serve: false /* or 'on-compile' or true. 'on-compile' has the benefit
                   that the bundle which is already in memory will be
                   written directly into the response */,
	type: 'javascript',
	rollupOpts: {},
	bundleOpts: { format: 'iife' },
	debug: false,
	maxAge: 0,
	base: '',
};

export default function rollupMiddleware(options: Partial<typeof defaults>): import('express').RequestHandler {
	const opts = Object.assign({}, defaults, options);
	assert(opts.src, 'rollup middleware requires src directory.');
	// Source directory (required)
	const src = path.join(options.cwd, options.src.replace(options.cwd, ''));
	// Destination directory (source by default)
	const dest = path.join(options.cwd, options.dest.replace(options.cwd, '')) || src;
	// cache max age
	const maxAge = options.maxAge || 0;

	return async function rollupRenderer(req, res, next) {
		const pathname = new URL('http://' + req.hostname + req.url).pathname;
		if (!/\.js$/.test(pathname) || path.extname(pathname) !== '.js') {
			if (options.debug) console.log('debug', 'skip', pathname);
			return next();
		}

		const fixedPath = pathname.replace(options.base, '');
		const jsPath = path.join(dest, fixedPath);
		const sourcePath = path.join(src, fixedPath.replace(/\.css$/, '.scss'));

		writefile('tmp/rollup-middleware/' + pathname + '.log', JSON.stringify({ dest, src, jsPath, sourcePath }, null, 2));

		const bundle = await rollup({ input: sourcePath, external: [] });
		const writeBundle = await bundle.write(
			Object.assign({ format: 'cjs', file: jsPath, sourcemap: false }, <any>options.bundleOpts),
		);
		res.writeHead(200, {
			'Content-Type': 'text/css',
			'Cache-Control': 'max-age=' + maxAge,
		});

		const results: string[] = [];
		writeBundle.output.forEach(chunk => {
			results.push(chunk['code']);
		});
		res.end(results.join('\n'));
	};
}
