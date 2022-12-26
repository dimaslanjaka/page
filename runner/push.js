const { existsSync, mkdirSync } = require('fs');
const { default: git } = require('git-command-helper');
const { join } = require('path');
const moment = require('moment-timezone');

const deployDir = join(__dirname, '../build');
if (!existsSync(deployDir)) mkdirSync(deployDir);
push();

async function push() {
	const github = new git(deployDir);
	await github.add('-A');
	await github.commit('update page from build ' + moment().format());
	await github.push();
}
