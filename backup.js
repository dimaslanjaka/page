const Bluebird = require('bluebird');
const fs = require('fs-extra');
const { spawn } = require('git-command-helper');
const path = require('path');

var validation = {
  isEmailAddress: function (str) {
    // eslint-disable-next-line no-useless-escape
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(str); // returns a boolean
  },
  isNotEmpty: function (str) {
    var pattern = /\S+/;
    return pattern.test(str); // returns a boolean
  },
  isNumber: function (str) {
    var pattern = /^\d+\.?\d*$/;
    return pattern.test(str); // returns a boolean
  },
  isSame: function (str1, str2) {
    return str1 === str2;
  },
};

const files = Bluebird.resolve(fs.readdir(path.join(__dirname, 'page')))
  .filter(str => validation.isNumber(str))
  .map(str => {
    return {
      name: str,
      absolute: path.join(__dirname, 'page', str),
    };
  });
files
  .each(o => fs.rm(o.absolute, { recursive: true, force: true }))
  .then(() => {
    spawn('git', ['commit', '-am', 'temporary delete page folders'], { cwd: path.join(__dirname, 'page') }).catch(e =>
      console.log(e),
    );
  });
