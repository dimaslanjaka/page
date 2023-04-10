export interface MinifyOptions {
	js: import('terser').CompressOptions;
	html: import('html-minifier-terser').Options;
	css: import('clean-css').Options;
}
