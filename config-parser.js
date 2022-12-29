const { readFileSync, writeFileSync } = require('fs');
const { EOL } = require('os');
const { join, basename } = require('path');

/**
 * strip comments from json
 * @param {string} text
 */
function strip(text) {
	text = text.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');
	return text;
}

/**
 * parse jsonc
 * @param {string} input
 * @param {string} output save to file the result
 * @returns {import('./tmp/last.json')}
 */
function jsonc(input, output) {
	const read = readFileSync(input, 'utf-8');
	const stripped = strip(read);
	const prettify = stripped
		.split(/\r?\n/gm)
		.filter(str => str.trim().length > 0)
		.join(EOL);
	if (typeof output === 'string') {
		writeFileSync(output, prettify);
	}
	writeFileSync(join(__dirname, 'tmp', basename(input)), prettify);
	writeFileSync(join(__dirname, 'tmp', 'last.json'), prettify);
	return JSON.parse(stripped);
}

module.exports = jsonc;
