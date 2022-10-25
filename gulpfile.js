const gulp = require('gulp');
const { join } = require('path');

gulp.task('copy', function (done) {
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
		.pipe(gulp.dest(join(__dirname, 'build')));
	gulp
		.src(['assets/**/*'], {
			cwd: __dirname,
		})
		.pipe(gulp.dest(join(__dirname, 'build/assets')))
		.once('end', finish);
});
