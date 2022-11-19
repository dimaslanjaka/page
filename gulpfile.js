const { default: git } = require('git-command-helper');
const gulp = require('gulp');
const { join } = require('path');

const buildDir = join(__dirname, 'build');

function copy(done) {
	const finish = () => done();
	gulp
		.src(
			[
				'safelink.html',
				'moment-timezone.html',
				'index.html',
				'bot-detect.{html,js}',
				'cookies.html',
				'disqus-comment.html',
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
	await github.setremote('https://github.com/dimaslanjaka/page.git')
	await github.setbranch('gh-pages')
	await github.pull(['origin', 'gh-pages']);
});

gulp.task('copy', gulp.series('pull', copy));
