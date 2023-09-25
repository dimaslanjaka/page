const fs = require('fs');
const glob = require('glob');
const path = require('path');
const { writefile } = require('sbg-utility');

const webpackEntry = {
  promise: {
    import: 'bluebird'
  },
  shared: {
    import: ['crypto-js', 'moment', 'moment-timezone', 'lodash', 'jquery', 'tslib'],
    dependOn: 'promise'
  },

  // internal/local utility
  internal: {
    import: ['./src/utils/index.ts'],
    dependOn: ['safelinkify', 'shared']
  }
};

const sourcesPaths = glob.sync(path.join(__dirname, 'src/**/*.{ts,js,tsx,jsx,less,scss,cjs,mjs}'), { nodir: true });
const importedModules = sourcesPaths
  .map(file => {
    const str = fs.readFileSync(file, 'utf-8');
    const result = [];
    const regexes = [
      /^import\s.*from\s['"](.*)['"];?/gm,
      /import\s?\(['"](.*)['"]\)/gm,
      /require\s?\(['"](.*)['"]\)/gm
    ];
    regexes.forEach(regex => {
      let m;

      while ((m = regex.exec(str)) !== null) {
        if (m) {
          if (m[1]) {
            result.push(m[1]);
          } else {
            console.log(m[0], '->', m[1], m[2], m[3], 'length=' + m.length);
          }
        }
      }
    });

    return (
      result
        .filter(str => typeof str === 'string')
        // filter local file
        .filter(str => !str.startsWith('.'))
        // filter @types
        .filter(str => !str.startsWith('@types'))
    );
  })
  // flattern
  .flat(1)
  // remove duplicates
  .filter((value, index, array) => array.indexOf(value) === index)
  // filter shared modules
  .filter(
    str => !webpackEntry.shared.import.concat(['react', 'react-dom', 'react-router-dom', 'bluebird']).includes(str)
  );

// turn into webpack entry
importedModules.forEach(str => {
  const key = str.replace(/[^a-zA-Z ]/g, '');
  webpackEntry[key] = {
    import: str,
    dependOn: 'shared'
  };
});

module.exports = webpackEntry;

if (require.main === module) {
  // console.log('called directly');
  writefile(path.join(__dirname, 'webpack.entries.json'), webpackEntry);
}
