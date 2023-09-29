'use strict';

// test pass argument cli to js

const args = require('minimist')(process.argv.slice(2));
module.exports = args;
