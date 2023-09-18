const { default: axios } = require('axios');
const { spawn } = require('git-command-helper');

const packages = {
  dependencies: {
    '@fontawesome/fontawesome-svg-core': {
      repo: 'https://github.com/dimaslanjaka/Web-Manajemen',
      branch: 'fontawesome-pro',
    },
  },
};

async function main() {
  for (const pkgName in packages.dependencies) {
    const { repo, branch } = packages.dependencies[pkgName];
    const url = new URL(repo);
    const api = `https://api.github.com/repos/${url.pathname.substring(1)}/branches/${branch}`;
    const req = await axios(api);
    const latestCommit = req.data.commit.sha;
    const pkgArg = `${pkgName}@${repo}/tarball/${latestCommit}`;
    console.log('updating', pkgArg);
    await spawn('yarn', ['up', pkgArg], { cwd: __dirname, stdio: 'inherit' });
  }
}

main();
