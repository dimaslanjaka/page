const { default: git } = require('git-command-helper');
const gulp = require('gulp');
const path = require('path');
const fs = require('fs-extra');

gulp.task('page:copy', function () {
	// copy non-compiled files
	// copy workflow
	const w_src = path.join(__dirname, '.github');
	const w_dest = path.join(__dirname, 'page/.github');

	if (fs.existsSync(w_dest)) fs.rmSync(w_dest, { force: true, recursive: true });
	fs.copySync(w_src, w_dest, { overwrite: true });
});

gulp.task('page:commit', async function () {
	const currentGit = new git(__dirname);
	const pageGit = new git(path.join(__dirname, 'page'));
	const currentHash = await currentGit.latestCommit();
	try {
		await pageGit.add('-A');
		const url = `${(await currentGit.getremote()).fetch.url.replace(/(.git|\/)$/, '')}/commit/${currentHash}`;
		await pageGit.commit('update from ' + url);
	} catch {
		//
	}
	let canPush = await pageGit.canPush();
	if (canPush) pageGit.push();
});

gulp.task('page', gulp.series('page:copy', 'page:commit'));

gulp.task('build', async function () {
	const files = fs.readdirSync(__dirname);
	for (let i = 0; i < files.length; i++) {
		const script = files[i];
		if (script.startsWith('build.')) await import('./' + script);
	}
});

module.exports = gulp;
