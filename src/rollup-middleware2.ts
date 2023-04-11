import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import assert from 'assert';
import fs from 'fs-extra';
import { OutputOptions, rollup, RollupOptions } from 'rollup';
import { writefile } from 'sbg-utility';
import path from 'upath';
import logger from './logger';
import { isDev } from './utils';

const globals = {
	jquery: '$',
	moment: 'moment',
	'moment-timezone': 'MomentTimezone',
	flowbite: 'flowbite',
	'core-js': 'CoreJS',
	'highlight.js': 'hljs',
	axios: 'axios',
	'markdown-it': 'MarkdownIt',
	codemirror: 'CodeMirror',
};

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
	const console = new logger('rollup');
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

		const bundleOpt: RollupOptions = {
			input: sourcePath,
			external: Object.keys(globals),
			plugins: [json(), resolve(), commonjs()],
			output: { plugins: [terser()], file: jsPath, sourcemap: false, format: 'cjs', globals },
		};
		const _bundle = await rollup(bundleOpt);
		const _gen = await _bundle.generate(bundleOpt.output as OutputOptions);
		res.writeHead(200, {
			'Content-Type': 'text/javascript',
			'Cache-Control': 'max-age=' + maxAge,
		});
		let code = '';
		if (!isDev) {
			for (const chunkOrAsset of _gen.output) {
				if (chunkOrAsset.type === 'asset') {
					//console.log('Asset', chunkOrAsset);
				} else {
					//console.log('Chunk', chunkOrAsset.module);
					code += chunkOrAsset.code;
				}
			}
			// write minified
			fs.writeFileSync(jsPath, code);
		} else {
			// by default not minified
			code = fs.readFileSync(jsPath, 'utf-8');
		}
		res.end(code);
	};
}
