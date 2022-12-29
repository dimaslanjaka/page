const { readFileSync, writeFileSync } = require('fs');
const { EOL } = require('os');
const { join } = require('path');

const file = join(__dirname, 'config.jsonc');
const output = file.replace('.jsonc', '.json');

jsonc(file, output);

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
 * @returns
 */
function jsonc(input, output) {
	const read = readFileSync(input, 'utf-8');
	const stripped = strip(read);
	if (typeof output === 'string') {
		const prettify = stripped
			.split(/\r?\n/gm)
			.filter(str => str.trim().length > 0)
			.join(EOL);
		writeFileSync(output, prettify);
	}
	return JSON.parse(stripped);
}
