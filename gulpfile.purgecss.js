const { PurgeCSS } = require('purgecss');
const config = require('./purgecss.config');
const fs = require('fs-extra');
const Bluebird = require('bluebird');

const purgeCSSExecutor = () => {
  console.log('Removing unused CSS from dist files...');

  const purgecss = new PurgeCSS().purge(config);

  return Bluebird.all(purgecss).map(result => {
    const { css, file } = result;
    console.log('purged css', file);
    return fs.writeFile(file, css);
  });
};

module.exports = purgeCSSExecutor;

if (require.main === module) {
  // console.log('called directly');
  purgeCSSExecutor();
}
