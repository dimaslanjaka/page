const pagepkg = require('./page/package.json');

const deps = Object.keys(pagepkg.dependencies).map(str => `!**/${str}/**`);
deps.forEach(str => console.log(str));
