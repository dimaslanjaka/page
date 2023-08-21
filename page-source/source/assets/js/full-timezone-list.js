const timezones = require('../json/timezones.json');
const moment = require('moment-timezone');

const table = document.getElementById('table-timezones');

const theadInner = timezones
	.flatMap(timezone => {
		return Object.keys(timezone);
	})
	.filter(function (elem, index, self) {
		return index === self.indexOf(elem);
	})
	.map(str => `<th>${str}</th>`)
	.join('');

table.querySelector('thead').innerHTML = `<tr>${theadInner}<th>clock</th><th>moment-timezone</th></tr>`;

const tbodyInner = timezones
	.map(timezone => {
		return `<tr><td>${timezone.value}</td><td>${timezone.abbr}</td><td>${timezone.offset}</td><td>${
			timezone.isdst
		}</td><td>${timezone.text}</td><td>${timezone.utc
			.map(zone => {
				return `<li>${zone}</li>`;
			})
			.join('')}</td><td>${timezone.utc
			.map(zone => {
				return `<li><span timezone="${zone}">${moment().tz(zone).format()}</span></li>`;
			})
			.join('')}</td><td>${timezone.utc
			.map(zone => {
				return `<li><code code="${zone}">moment().tz("${zone}").format()</code></li>`;
			})
			.join('')}</td></tr>`;
	})
	.join('');

table.querySelector('tbody').innerHTML = tbodyInner;

module.exports = { moment };
