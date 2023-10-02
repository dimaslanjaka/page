const glob = require('glob');
const { writefile } = require('sbg-utility');
const path = require('upath');
/** @type {import('purgecss').UserDefinedOptions} */
const purgecssConfig = {
  content: [
    ...glob.sync(`${path.join(__dirname, 'dist')}/**/*.{js,html}`, { nodir: true }),
    ...glob.sync(`${path.join(__dirname, 'src')}/**/*.{jsx,tsx}`, { nodir: true }),
  ],
  css: glob.sync(`${path.join(__dirname, 'dist')}/**/*.css`, { nodir: true }),
  // enable keyframes remover
  keyframes: true,
  extractors: [
    {
      extractor: content => {
        // eslint-disable-next-line no-useless-escape
        let result = content.match(/[\w-\/:]+(?<!:)/gim) || [];
        // parse classnames and id
        // eslint-disable-next-line no-useless-escape
        const mIdClass = /(?:class|className|id)=(?:["']\W+\s*(?:\w+)\()?["']([^'"]+)['"]/gim.exec(content) || [];
        if (mIdClass[1]) {
          result.push(...mIdClass[1].split(' '));
        }
        result = result
          // filter alphanumeric only
          //.filter(str => /^[a-zA-Z0-9]*$/gm.test(str))
          // filter non special chars only
          .filter(str => !/^[^a-zA-Z0-9]+$/gim.test(str))
          // filter non integer only
          .filter(str => !/^[0-9]*$/gm.test(str))
          //filter only valid css selector
          .filter(str => /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/gim.test(str))
          // unique
          .filter(function (value, index, array) {
            return array.indexOf(value) === index;
          });
        writefile(path.join(__dirname, 'tmp/purgecss/dump-extractor-1.log'), result.join('\n'));
        return result;
      },
      extensions: ['njk', 'html', 'tsx', 'jsx'],
    },
    {
      extractor: content => {
        // eslint-disable-next-line no-useless-escape
        let result = content.match(/[\w-\/:]+(?<!:)/gim) || [];
        //let result = content.match(/[A-z0-9-:\\/]+/g) || [];
        //const test1 = content.match(/[@A-Za-z0-9-:/]+/g) || [];
        //result.push(...test1);

        result = result
          // filter non special chars only
          .filter(str => !/^[^a-zA-Z0-9]+$/gim.test(str))
          // filter non integer only
          .filter(str => !/^[0-9]*$/gm.test(str))
          // filter non integer only
          .filter(str => !/^[0-9]*$/gm.test(str))
          //filter only valid css selector
          .filter(str => /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/gim.test(str))
          // unique
          .filter(function (value, index, array) {
            return array.indexOf(value) === index;
          });

        writefile(path.join(__dirname, 'tmp/purgecss/dump-extractor-2.log'), result.join('\n'));
        return result;
      },
      extensions: ['vue', 'js'],
    },
  ],
};

module.exports = purgecssConfig;
