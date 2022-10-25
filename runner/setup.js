const { existsSync, mkdirSync } = require("fs");
const { default: git } = require("git-command-helper");
const { join } = require("path");

const deployDir = join(__dirname, '../build')
if (!existsSync(deployDir)) mkdirSync(deployDir)
setup()

async function setup() {
  const github = new git(deployDir)
  await github.init()
  await github.setremote('https://github.com/dimaslanjaka/page.git')
  await github.pull(['origin', 'gh-pages'])
  await github.checkout('gh-pages')
}