const { default: git } = require('git-command-helper');
const gulp = require('gulp');
const { join, relative } = require('upath');
const { encodeURL } = require('hexo-util');
const nunjucks = require('nunjucks');
const through2 = require('through2');
const fs = require('fs');
const terser = require('terser');
const applySourceMap = require('vinyl-sourcemaps-apply');
const terserHtml = require('html-minifier-terser');
const CleanCSS = require('clean-css');
const { default: gulpDom } = require('gulp-dom');

const buildDir = join(__dirname, 'build');
const ignores = [buildDir, '**/node_modules/**', '**/tmp/**', '**/vendor/**'];

function copy(done) {
	const finish = () => done();
	gulp
		.src(
			[
				'safelink.{html,js,css}',
				'moment-timezone.{html,css,js}',
				'index.{html,js,css}',
				'bot-detect.{html,js,css}',
				'cookies.{html,js,css}',
				'disqus-comment.{html,js,css}',
				'package.json',
			],
			{
				cwd: __dirname,
				ignore: ignores,
			},
		)
		.pipe(minifyPlugin())
		.pipe(gulp.dest(buildDir))
		.once('end', function () {
			gulp
				.src(['assets/**/*'], {
					cwd: __dirname,
				})
				.pipe(minifyPlugin())
				.pipe(gulp.dest(join(buildDir, 'assets')))
				.once('end', function () {
					git.shell('npm', ['run', 'prod'], { cwd: buildDir, stdio: 'inherit' }).then(function () {
						fs.writeFile(join(buildDir, '.nojekyll'), '', () => finish());
					});
				});
		});
}

/**
 * Minify Assets Plugin
 * @param {import('./gulpfile').MinifyOptions} options
 * @returns
 */
function minifyPlugin(options = {}) {
	return through2.obj(async function (chunk, _, next) {
		if (chunk.isStream() || chunk.isNull() || chunk.isDirectory()) {
			return next();
		}
		const chunkString = chunk.contents.toString('utf8');
		if (chunk.extname === '.js') {
			try {
				const terserOptions = options.js || {};
				// SourceMap configuration
				if (chunk.sourceMap) {
					if (!terserOptions.sourceMap || terserOptions.sourceMap === true) {
						terserOptions.sourceMap = {};
					}

					terserOptions.sourceMap.filename = chunk.sourceMap.file;
				}
				let build = {};

				// gulp version compatibility
				if ('sourceMap' in chunk && 'file' in chunk.sourceMap) {
					build[chunk.sourceMap.file] = chunkString;
				} else {
					build = chunkString;
				}

				// Compressed code (terser5 is asynchronous, terser4 is synchronous)
				const minifyOutput = await terser.minify(build, terserOptions);

				// Buffer
				if (minifyOutput.code) {
					chunk.contents = 'from' in Buffer ? Buffer.from(minifyOutput.code) : new Buffer(minifyOutput.code);
				}

				// Output source-map
				if (chunk.sourceMap && minifyOutput.map) {
					applySourceMap(chunk, minifyOutput.map);
				}
			} catch (e) {
				console.trace(e);
			}
		} else if (chunk.extname === '.html') {
			const terserOptions = options.html || {
				collapseWhitespace: true,
				html5: true,
				removeComments: true,
				keepClosingSlash: true,
				minifyCSS: true,
				minifyJS: true,
				preserveLineBreaks: true,
			};

			const minifyOutput = await terserHtml.minify(chunkString, terserOptions);

			// Buffer
			if (typeof minifyOutput === 'string') {
				chunk.contents = 'from' in Buffer ? Buffer.from(minifyOutput) : new Buffer(minifyOutput);
			} else {
				console.log('[HTML] cannot minify', chunk.relative);
			}
		} else if (chunk.extname === '.css') {
			const content = {
				[chunk.path]: { styles: chunkString },
			};
			const minifyOutput = await new CleanCSS(options.css || {}).minify(content);
			// Buffer
			if (typeof minifyOutput.styles === 'string') {
				chunk.contents = 'from' in Buffer ? Buffer.from(minifyOutput.styles) : new Buffer(minifyOutput.styles);
			} else {
				console.log('[CSS] cannot minify', chunk.relative, minifyOutput.errors);
			}

			if (minifyOutput.sourceMap) {
				const iMap = JSON.parse(minifyOutput.sourceMap);
				const oMap = Object.assign({}, iMap, {
					file: relative(chunk.base, chunk.path),
					sources: iMap.sources.map(mapSrc => relative(chunk.base, mapSrc)),
				});
				applySourceMap(chunk, oMap);
			}
		}
		this.push(chunk);
		next(null, chunk);
	});
}

gulp.task('pull', async function () {
	const github = new git(buildDir);
	await github.setremote('https://github.com/dimaslanjaka/page.git');
	await github.setbranch('gh-pages');
	//await github.pull(['origin', 'gh-pages']);
	await github.reset('gh-pages');
});

gulp.task('push', async function () {
	const github = new git(buildDir);
	await github.setremote('https://github.com/dimaslanjaka/page.git');
	await github.setbranch('gh-pages');
	await github.addAndCommit('.', 'update ' + new Date());
	if (await github.canPush()) await github.push();
});

gulp.task('copy', copy);

const env = envNunjucks();

gulp.task('compile', function (done) {
	gulp
		.src('**/*.njk', { cwd: __dirname, ignore: ['**/*.content.njk', '_*.njk'] })
		.pipe(
			through2.obj((file, _enc, next) => {
				if (file.isDirectory() || file.isNull()) return next();
				if (file.extname === '.njk') {
					const template = nunjucks.compile(fs.readFileSync(file.path, 'utf-8'), env);
					const render = template.render({});
					fs.writeFileSync(file.path.replace(/.njk$/, '.html'), render);
				}
				next();
			}),
		)
		.pipe(gulp.dest(join(__dirname, 'tmp/compile')))
		.once('end', function () {
			// build index.html
			const files = fs
				.readdirSync(__dirname)
				.map(filename => {
					return {
						filename,
						absolutePath: join(__dirname, filename),
					};
				})
				.filter(o => {
					const stat = fs.statSync(o.absolutePath);
					if (stat.isDirectory()) return false;

					return o.filename.endsWith('.html');
				});
			const list = files.map(file => `<li><a href='${file.filename}'>${file.filename}</a></li>`).join('\n');
			const template = nunjucks.compile(fs.readFileSync(join(__dirname, 'index.njk'), 'utf-8'), env);
			const render = template.render({
				title: 'Index Page',
				content: `<ul>` + list + `</ul>`,
			});
			fs.writeFile(join(__dirname, 'index.html'), render, () => done(null));
		});
});

gulp.task('assign-cache', async function () {
	const github = new git(__dirname);
	const commit = await github.latestCommit();

	return gulp
		.src(['**/*.{html,htm}'], { cwd: buildDir, ignore: ignores })
		.pipe(
			gulpDom(function () {
				//
			}),
		)
		.pipe(gulp.dest(buildDir));
});

gulp.task('build', gulp.series('compile', 'pull', 'copy', 'push'));

/**
 * Env Nunjucks
 * @param {import('express').Express} app
 * @returns
 */
function envNunjucks(app) {
	const env = new nunjucks.Environment([new nunjucks.FileSystemLoader(__dirname)]);
	if (typeof app === 'object') {
		try {
			nunjucks.configure(__dirname, {
				autoescape: true,
				express: app,
			});
		} catch {
			//
		}
	}
	env.addFilter('uriencode', str => {
		return encodeURL(str);
	});
	env.addFilter('noControlChars', str => {
		return str.replace(/[\x00-\x1F\x7F]/g, ''); // eslint-disable-line no-control-regex
	});
	// Extract date from datetime
	env.addFilter(
		'formatDate',
		/**
		 *
		 * @param {import('moment-timezone').Moment} input
		 * @returns
		 */
		input => {
			return input.toISOString().substring(0, 10);
		},
	);
	return env;
}

module.exports = {
	envNunjucks,
};
