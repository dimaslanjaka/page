import Minifier from 'html-minifier';
import path from 'path';
import logger from './logger';

export interface MinifyMiddlewareOptions {
	[key: string]: any;
	debug?: boolean;
}

export default function minifyHtmlMiddleware(options: MinifyMiddlewareOptions): import('express').RequestHandler {
	const console = new logger('html-minifier');
	return function minifyHtmlRenderer(req, res, next) {
		const pathname = new URL('http://' + req.hostname + req.url).pathname;
		if (!/\.html$/.test(pathname) || path.extname(pathname) !== '.html') {
			if (options.debug) console.log('debug', 'skip', pathname);
			return next();
		}

		res['oldRender'] = res.render;

		/**
		 * Render with minified HTML (express + nunjucks)
		 *   Works as a response.method that minifies html string
		 *   after nunjucks.render compiles and callback
		 */
		const render = function (view: string, options: Record<string, any>) {
			this.oldRender(view, options, function (err: any, html: string) {
				if (err) throw err;
				html = Minifier.minify(html, {
					removeComments: true,
					// removeCommentsFromCDATA: true,
					collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeEmptyAttributes: true,
					minifyJS: true,
					minifyCSS: true,
					ignoreCustomFragments: [/{([%#])[^]+?\1}/, /{{[^]+?}}/],
					trimCustomFragments: true,
				});
				res.send(html);
			});
		};
		res.render = render;
		next();
	};
}
