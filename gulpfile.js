const { default: git } = require('git-command-helper');
const gulp = require('gulp');
const path = require('path');
const fs = require('fs-extra');

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

gulp.task('build', async function () {
	const files = fs.readdirSync(__dirname);
	for (let i = 0; i < files.length; i++) {
		const script = files[i];
		if (script.startsWith('build.')) await import('./' + script);
	}
});
