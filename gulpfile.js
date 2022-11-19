const { default: git } = require('git-command-helper');
const gulp = require('gulp');
const { join } = require('path');

const buildDir = join(__dirname, 'build');

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
			},
		)
		.pipe(gulp.dest(buildDir));

	gulp
		.src(['assets/**/*'], {
			cwd: __dirname,
		})
		.pipe(gulp.dest(join(buildDir, 'assets')))
		.once('end', finish);
}

gulp.task('pull', async function () {
	const github = new git(buildDir);
	await github.pull(['origin', 'gh-pages']);
});

gulp.task('copy', gulp.series('pull', copy));
