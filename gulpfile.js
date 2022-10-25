const gulp = require('gulp');
const { join } = require('path');

gulp.task('copy', function () {
	return gulp
		.src(['safelink.html', 'moment-timezone.html', 'index.html', 'bot-detect.{html,js}', 'cookies.html', 'disqus-comment.html'], {
			cwd: __dirname,
		})
		.pipe(gulp.dest(join(__dirname, 'build')));
});
