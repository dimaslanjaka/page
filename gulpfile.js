const { default: git } = require('git-command-helper');
const gulp = require('gulp');
const { join } = require('path');

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
