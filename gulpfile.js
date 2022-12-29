const { default: git } = require('git-command-helper');
const gulp = require('gulp');
const { join, relative, toUnix } = require('upath');
const { encodeURL } = require('hexo-util');
const nunjucks = require('nunjucks');
const through2 = require('through2');
const fs = require('fs');
const terser = require('terser');
const applySourceMap = require('vinyl-sourcemaps-apply');
const terserHtml = require('html-minifier-terser');
const CleanCSS = require('clean-css');
const sass = require('node-sass');
const config = require('./config-parser')(join(__dirname, 'config.jsonc'), join(__dirname, 'config.json'));
const { default: safelink } = require('safelinkify/dist/safelink');
const { spawnAsync } = require('git-command-helper/dist/spawn');

global.minifyPlugin = minifyPlugin;
const executeFunc = opt => {
	opt = Object.assign({ input: null, output: null, pipe: null, ignore: [] }, opt);
	const { input, output, pipe, ignore } = opt;
	return new Promise(function (resolve) {
		const fn = global[pipe];
		if (typeof fn === 'function') {
			console.log('using pipe', pipe);
			gulp
				.src(input, {
					cwd: __dirname,
					ignore: Array.isArray(ignore)
						? globalIgnore.concat(...ignore)
						: typeof ignore === 'string'
						? globalIgnore.concat(ignore)
						: globalIgnore,
				})
				.pipe(fn.apply(null))
				.pipe(gulp.dest(output))
				.once('end', () => resolve(null));
		} else {
			console.log('not using pipe');
			resolve(null);
		}
	});
};

/**
 * Task running indicators
 * @type {Record<string, boolean>}
 */
const indicators = {};
const buildDir = join(__dirname, 'build');
const globalIgnore = [buildDir, '**/node_modules/**', '**/temp/**', '**/vendor/**', '**/tmp/**', '**/build/**'];

/**
 * copy build
 * @param {gulp.TaskFunctionCallback} done
 */
async function copy(done) {
	for (let i = 0; i < config.copy.length; i++) {
		const o = config.copy[i];
		await executeFunc(o);
	}
	console.log('installing packages...');
	spawnAsync('npm', ['run', 'prod'], { cwd: buildDir, stdio: 'inherit' }).then(function () {
		fs.writeFile(join(buildDir, '.nojekyll'), '', function () {
			// assign cache
			assignCache(function () {
				// copy safelink
				fs.copyFileSync(join(__dirname, config.safelink.input), join(__dirname, config.safelink.output));
				done();
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
	await github.pull(['-X', 'theirs']);
	// await github.pull(['origin', 'gh-pages',]);
	//await github.reset('gh-pages');
});

gulp.task('push', async function () {
	const github = new git(buildDir);
	try {
		await github.add('-A');
		const url = `${(await github.getremote()).fetch.url.replace(
			/(.git|\/)$/,
			'',
		)}/commit/${await github.latestCommit()}`;
		await github.commit('update from ' + url);
	} catch {
		//
	}
	let canPush = await github.canPush();
	let counter = 0;
	const delay = millis =>
		new Promise(resolve => {
			setTimeout(_ => resolve(), millis);
		});
	while (!canPush) {
		if (counter > 5) {
			try {
				// force push
				await github.push();
			} catch {
				//
			}
			break;
		}
		canPush = await github.canPush();
		if (canPush) await github.push();
		await delay(1000);
		counter++;
		console.log(`[${counter}]`, 'Retrying...');
	}
});

const env = envNunjucks();

gulp.task('compile', function (done) {
	if (indicators.compile) return done();
	indicators.compile = true;

	gulp
		.src('**/*.scss', { cwd: __dirname, ignore: [].concat(globalIgnore) })
		.pipe(
			through2.obj(function (file, _enc, next) {
				if (file.isNull() || file.isDirectory() || file.isStream()) return next();
				if (file.isBuffer()) {
					const scss_content = file.contents.toString('utf-8');
					try {
						const result = sass.renderSync({
							data: scss_content,
						});
						file.contents = result.css;
						file.extname = '.css';
						console.log('[scss] success compile', file.path);
						return next(null, file);
					} catch {
						console.log('[scss] cannot compile', file.path);
					}
				}
				next();
			}),
		)
		.pipe(gulp.dest(__dirname))
		.once('end', () => {
			gulp
				.src('**/*.njk', { cwd: __dirname, ignore: ['**/*.content.njk', '_*.njk'].concat(globalIgnore) })
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
					fs.writeFile(join(__dirname, 'index.html'), render, () => {
						indicators.compile = false;
						if (typeof done === 'function') done(null);
					});
				});
		});
});

async function assignCache(done) {
	if (indicators.ac) return done();
	indicators.ac = true;
	const github = new git(__dirname);
	const commit = await github.latestCommit();

	return gulp
		.src(['**/*.{html,htm}'], { cwd: buildDir, ignore: globalIgnore })
		.pipe(
			through2.obj(function (file, _enc, callback) {
				if (file.isNull()) return callback();
				if (file.isBuffer()) {
					let content = file.contents.toString('utf-8');
					const toMatch = '?hash=GEN-HASH';
					while (content.includes(toMatch)) {
						content = content.replace(toMatch, '?hash=' + commit);
					}
					file.contents = Buffer.from(content);
				}
				callback(null, file);
			}),
		)
		.pipe(gulp.dest(buildDir))
		.once('end', function () {
			indicators.ac = false;
			console.log('used cache parameter', commit);
			if (typeof done === 'function') done();
		});
}

// anonymize link on production
gulp.task('safelink', function () {
	const instance = new safelink({
		// exclude patterns (dont anonymize these patterns)
		exclude: [/([a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?[.])*webmanajemen\.com/],
		// url redirector
		redirect: 'https://www.webmanajemen.com/page/safelink.html?url=',
		// debug
		verbose: false,
		// encryption type = 'base64' | 'aes'
		type: 'base64',
		// password aes, default = root
		password: 'unique-password',
	});
	const destDir = join(__dirname, 'build');
	return gulp
		.src(['**/*.html'], {
			cwd: destDir,
			ignore: [
				// exclude non-website and react production files
				'**/tmp/**',
				'**/node_modules/**',
			],
		})
		.pipe(
			through2.obj(async (file, _enc, next) => {
				// drop null, folder, stream
				if (file.isNull() || file.isDirectory() || file.isStream()) return next();
				// do safelinkify
				const content = String(file.contents);
				const parsed = await instance.parse(content);
				if (parsed) {
					file.contents = Buffer.from(parsed);
					next(null, file);
				} else {
					console.log('cannot parse', toUnix(file.path).replace(toUnix(process.cwd()), ''));
					next();
				}
			}),
		)
		.pipe(gulp.dest(destDir));
});

gulp.task('copy', copy);
gulp.task('build', gulp.series('compile', 'pull', 'copy', 'safelink', 'push'));
gulp.task('default', gulp.series('build'));

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
	env.addGlobal('css', str => {
		return `
<link
		rel="preload"
		href="${str}"
		as="style"
		onload="this.onload=null;this.rel='stylesheet'"
	/>
	<noscript>
		<link rel="stylesheet" href="${str}" />
	</noscript>
		`.trim();
	});
	return env;
}

module.exports = {
	envNunjucks,
};
