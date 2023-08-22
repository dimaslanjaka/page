const { default: git } = require('git-command-helper');
const gulp = require('gulp');
const { fs, path } = require('sbg-utility');
const Bluebird = require('bluebird');
const glob = require('glob');

gulp.task('page:copy', async function () {
	// copy non-compiled files
	// copy workflow
	const w_src = path.join(__dirname, '.github');
	const w_dest = path.join(__dirname, 'page/.github');

	if (fs.existsSync(w_dest)) fs.rmSync(w_dest, { force: true, recursive: true });
	await fs.copy(w_src, w_dest, { overwrite: true });
});

const sleep = milliseconds => {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
};

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
	await sleep(700);
	let canPush = await pageGit.canPush();
	if (canPush) pageGit.push();
});

gulp.task('page:build', async function () {
	await import('./page-source/build.js');
});

gulp.task('page:clean', function () {
	return new Promise(resolve => {
		const base = path.join(__dirname, 'page');
		const unusedFilesInNodeModules = Bluebird.all(
			glob.glob(
				[
					'**/*.md',
					'**/*.html',
					'**/*.d.ts',
					'**/.eslint*',
					'**/nodejs-package-types',
					'**/git-command-helper',
					'**/hexo-*',
					'**/cross-spawn',
					'**/@expo',
					'**/binary-collections',
					'**/deepmerge-ts',
					'**/.package-lock.json',
					'**/execa',
					'**/sbg-*',
					'**/rmdir'
				],
				{
					cwd: path.join(base, 'node_modules'),
				},
			),
		)
			.map(str => path.join(base, 'node_modules', str))
			.each(str => fs.rmSync(str, { recursive: true, force: true }));

		Bluebird.all(unusedFilesInNodeModules).finally(() => {
			resolve(null);
		});
	});
});

gulp.task('page', gulp.series('page:build', 'page:copy', 'page:clean', 'page:commit'));
// gulp.task('build', gulp.series('page'));
// gulp.task('default', gulp.series('page'));
module.exports = gulp;
