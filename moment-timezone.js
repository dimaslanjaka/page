/* eslint-disable no-undef */
// https://codepen.io/dimaslanjaka/pen/LYegjaV

if (location.host.includes('cdpn')) console.clear();
const idate = document.querySelector('input#date');
const pattern = document.querySelector('input#pattern');
const result = document.querySelector('#moment-result');

function moment_format(datestr) {
	/*moment.tz.add([
		'America/Los_Angeles|PST PDT|80 70|0101|1Lzm0 1zb0 Op0',
		'America/New_York|EST EDT|50 40|0101|1Lz50 1zb0 Op0',
		'Asia/Jakarta',
	]);*/
	//moment.tz.link('America/Los_Angeles|US/Pacific|Asia/Jakarta');

	return moment(datestr)
		.tz('Asia/Jakarta')
		.format(pattern.value || '');
}

function update() {
	idate.value = new Date().getTime();
	const formatted = moment_format(idate.value);
	result.textContent = formatted;
}

document.addEventListener('DOMContentLoaded', function (_e) {
	update(); // update value on-load
	let interval;
	document.getElementById('start-interval').addEventListener('click', function (e) {
		e.preventDefault();
		if (!interval) interval = setInterval(update, 1000);
	});
	document.getElementById('stop-interval').addEventListener('click', function (e) {
		e.preventDefault();
		clearInterval(interval);
		interval = null;
	});

	document.getElementById('copy-moment').addEventListener('click', function (e) {
		e.preventDefault();
		copyTextToClipboard(result.textContent.trim());
	});
	pattern.addEventListener('change', update);
});

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
