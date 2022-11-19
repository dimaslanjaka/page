const { default: git } = require('git-command-helper');
const gulp = require('gulp');
const { join } = require('path');
const { encodeURL } = require('hexo-util');
const nunjucks = require('nunjucks');
const through2 = require('through2');
const fs = require('fs');

const buildDir = join(__dirname, 'build');
const ignores = [buildDir, '**/node_modules/**'];

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
		.pipe(gulp.dest(buildDir))
		.once('end', function () {
			gulp
				.src(['assets/**/*'], {
					cwd: __dirname,
				})
				.pipe(gulp.dest(join(buildDir, 'assets')))
				.once('end', finish);
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

gulp.task('copy', gulp.series('pull', copy));
gulp.task('build', gulp.series('copy', 'push'));

const env = envNunjucks();

gulp.task('compile', function () {
	gulp.src('**/*.njk', { cwd: __dirname, ignore: ['**/*.content.njk'] }).pipe(
		through2.obj((file, _enc, next) => {
			if (file.isDirectory()) return next(null, file);
			if (file.isNull()) return next();
			if (file.extname === '.njk') {
				const template = nunjucks.compile(fs.readFileSync(file.path, 'utf-8'), env);
				const render = template.render({});
				fs.writeFileSync(file.path.replace(/.njk$/, '.html'), render);
			}
		}),
	);
});

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
