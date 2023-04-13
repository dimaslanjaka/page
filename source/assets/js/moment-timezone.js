/* eslint-disable no-undef */
// https://codepen.io/dimaslanjaka/pen/LYegjaV
// data timezone load https://momentjs.com/timezone/docs/#/data-loading/
// list timezone https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
// require('moment')
// require('moment/min/moment-with-locales');
// require('moment-timezone/builds/moment-timezone-with-data.min');
// const moment = require('moment-timezone');

const moment = require('moment-timezone');

if (location.host.includes('cdpn')) console.clear();
const date_input = document.querySelector('input#date');
const pattern = document.querySelector('input#pattern');
const result = document.querySelector('#moment-result');

const isNumeric = str => parseFloat(str) === parseFloat(str);

function moment_format(datestr) {
	if (isNumeric(datestr)) {
		return moment(datestr)
			.tz('Asia/Jakarta')
			.format(pattern.value || '');
	}
	if (typeof datestr === 'string') {
		datestr = new Date(datestr);
	}
	return moment(datestr)
		.tz('Asia/Jakarta')
		.format(pattern.value || '');
}

/**
 * set datetime-local
 * @param {HTMLInputElement} element
 * @param {Date} date
 */
function setDateLocalValue(element, date) {
	/*const new_date = new Date(date.getTime() - new Date().getTimezoneOffset() * 60 * 1000);
	const isoString = new_date.toISOString();
	const value = isoString.substring(0, ((isoString.indexOf('T') | 0) + 6) | 0);
	console.log('set value', { isoString, value });*/
	const value = moment(date).format('YYYY-MM-DD HH:mm:ss');
	console.log('set value', { value });
	element.value = value;
}

/**
 * update date input
 * @param {boolean} force
 */
function update_datepicker(force) {
	// update date picker when empty or forced
	if (date_input.value.length === 0 || force) setDateLocalValue(date_input, new Date());
	// format and print result
	console.log('date value', date_input.value);
	const formatted = moment_format(date_input.value);
	result.textContent = formatted;
}

update_datepicker(true); // force update value on-load

// auto update interval
let interval;
document.getElementById('start-interval').addEventListener('click', function (e) {
	e.preventDefault();
	if (!interval) interval = setInterval(() => update_datepicker(true), 1000);
});
document.getElementById('stop-interval').addEventListener('click', function (e) {
	e.preventDefault();
	clearInterval(interval);
	interval = null;
});
date_input.addEventListener('change', update_datepicker);
document.getElementById('copy-moment').addEventListener('click', function (e) {
	e.preventDefault();
	copyTextToClipboard(result.textContent.trim());
});
pattern.addEventListener('change', update_datepicker);

function fallbackCopyTextToClipboard(text) {
	var textArea = document.createElement('textarea');
	textArea.value = text;

	// Avoid scrolling to bottom
	textArea.style.top = '0';
	textArea.style.left = '0';
	textArea.style.position = 'fixed';

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		console.log('Fallback: Copying text command was ' + msg);
	} catch (err) {
		console.error('Fallback: Oops, unable to copy', err);
	}

	document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(text);
		return;
	}
	navigator.clipboard.writeText(text).then(
		function () {
			console.log('Async: Copying to clipboard was successful!');
		},
		function (err) {
			console.error('Async: Could not copy text: ', err);
		},
	);
}

// clock
function clock_update() {
	const london = moment.tz('Europe/London').format('MMMM Do YYYY, h:mm:ss a');
	const sydney = moment.tz('Australia/Sydney').format('MMMM Do YYYY, h:mm:ss a');
	const beijing = moment.tz('Asia/Shanghai').format('MMMM Do YYYY, h:mm:ss a');
	const tokyo = moment.tz('Asia/Tokyo').format('MMMM Do YYYY, h:mm:ss a');
	const la = moment.tz('America/Los_Angeles').format('MMMM Do YYYY, h:mm:ss a');

	document.querySelector('#london').textContent = london;
	document.querySelector('#sydney').textContent = sydney;
	document.querySelector('#beijing').textContent = beijing;
	document.querySelector('#tokyo').textContent = tokyo;
	document.querySelector('#la').textContent = la;
}
setInterval(clock_update, 1000);
