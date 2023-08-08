console.clear();
let logdiv = document.getElementById('selenium');
let test = runBotDetection();
logdiv.innerHTML = test;

if (typeof fetch != 'undefined') {
	fetch('https://www.cloudflare.com/cdn-cgi/trace').then(response => {
		response.text().then(function (data) {
			data = data
				.trim()
				.split('\n')
				.reduce(function (obj, pair) {
					pair = pair.split('=');
					return (obj[pair[0]] = pair[1]), obj;
				}, {});
			//console.log(data);
			document.getElementById('ip').innerText = data.ip;
			document.getElementById('ua').innerText = data.uag;
		});
	});

	fetch('https://httpbin.org/headers')
		.then(response => response.json())
		.then(data => {
			//console.log(data.headers);
			const headers = [
				'HTTP_VIA',
				'HTTP_X_FORWARDED_FOR',
				'HTTP_FORWARDED_FOR',
				'HTTP_X_FORWARDED',
				'HTTP_FORWARDED',
				'HTTP_CLIENT_IP',
				'HTTP_FORWARDED_FOR_IP',
				'VIA',
				'X_FORWARDED_FOR',
				'FORWARDED_FOR',
				'X_FORWARDED',
				'FORWARDED',
				'CLIENT_IP',
				'FORWARDED_FOR_IP',
				'HTTP_PROXY_CONNECTION',
			];
			headers.forEach(function (header) {
				const isProxy = header in data.headers;
				document.getElementById('isProxy').innerText = isProxy;
				document.getElementById('proxy').innerText = data.headers[header] || '';
				if (!isProxy) document.getElementById('proxy').remove();
			});
		});
}

function runBotDetection() {
	const documentDetectionKeys = [
		'__webdriver_evaluate',
		'__selenium_evaluate',
		'__webdriver_script_function',
		'__webdriver_script_func',
		'__webdriver_script_fn',
		'__fxdriver_evaluate',
		'__driver_unwrapped',
		'__webdriver_unwrapped',
		'__driver_evaluate',
		'__selenium_unwrapped',
		'__fxdriver_unwrapped',
	];
	const windowDetectionKeys = [
		'_phantom',
		'__nightmare',
		'_selenium',
		'callPhantom',
		'callSelenium',
		'_Selenium_IDE_Recorder',
	];
	for (const windowDetectionKey in windowDetectionKeys) {
		const windowDetectionKeyValue = windowDetectionKeys[windowDetectionKey];
		if (window[windowDetectionKeyValue] || windowDetectionKeyValue in window) {
			return true;
		}
	}
	for (const documentDetectionKey in documentDetectionKeys) {
		const documentDetectionKeyValue = documentDetectionKeys[documentDetectionKey];
		if (window['document'][documentDetectionKeyValue] || documentDetectionKeyValue in document) {
			return true;
		}
	}
	for (const documentKey in window['document']) {
		if (documentKey.match(/\$[a-z]dc_/) && window['document'][documentKey]['cache_']) {
			return true;
		}
	}
	if (
		window['external'] &&
		window['external'].toString() &&
		window['external'].toString()['indexOf']('Sequentum') !== -1
	)
		return true;
	if (window['document']['documentElement']['getAttribute']('selenium')) return true;
	if (window['document']['documentElement']['getAttribute']('webdriver')) return true;
	if (window['document']['documentElement']['getAttribute']('driver')) return true;
	if (window.document.documentElement.getAttribute('webdriver')) {
		return true;
	}
	if ('callPhantom' in window || '_phantom' in window) {
		if (window.callPhantom || window._phantom) {
			return true;
		}
	}
	if ('webdriver' in navigator) {
		if (navigator.webdriver == true) {
			return true;
		}
	}
	if ('userAgentData' in navigator) {
		const udata = JSON.stringify(navigator.userAgentData);
		return udata.includes('Not=A?Brand');
	}
	return false;
}

/**
 * get all cookies
 * @returns
 */
function getCookies() {
	const cookies = document.cookie
		.split(';')
		.reduce((ac, cv, _i) => Object.assign(ac, { [cv.split('=')[0].trim()]: cv.split('=')[1] }), {});

	const index = Object.keys(cookies).sort(function (a, b) {
		return a === b ? 0 : a < b ? -1 : 1;
	});
	console.log(index);

	return cookies;
}

/**
 * set cookie
 * @param {string} name
 * @param {string} value
 * @param {number} days
 */
function setCookie(name, value, days) {
	var expires = '';
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toUTCString();
	}
	document.cookie = name + '=' + (value || '') + expires + '; path=/';
}
function getCookie(name) {
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}
/*function eraseCookie(name) {
	document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}*/

/** Cookies **/
(function () {
	// set current id
	if (!getCookie('___current_id')) {
		setCookie(
			'___current_id',
			Math.random()
				.toString(36)
				.substring(2, 7 + 2),
			1,
		);
	}

	document.querySelector('span#sid').textContent = getCookie('___current_id');
	document.getElementById('unique-id').textContent = getCookie('___current_id');

	const tbl = document.querySelector('table#cookies');
	const tbody = tbl.querySelector('tbody');
	const gck = getCookies();
	for (let key in gck) {
		//console.log(key, gck[key]);
		var row = document.createElement('tr');
		var cell = document.createElement('td');
		var cellText = document.createTextNode(key);
		cell.appendChild(cellText);
		row.appendChild(cell);

		cell = document.createElement('td');
		cellText = document.createTextNode(gck[key]);
		cell.appendChild(cellText);
		row.appendChild(cell);
		tbody.appendChild(row);
	}
})();

/** Navigator **/
(function () {
	const tbln = document.querySelector('table#navigator');
	const tbodyn = tbln.querySelector('tbody');
	for (let key in navigator) {
		let value = navigator[key];
		if (typeof value === 'object') {
			value = '<pre>' + JSON.stringify(value, null, 2) + '</pre>';
		}
		var row = document.createElement('tr');
		var cell = document.createElement('td');
		var cellText = document.createTextNode(key);
		cell.appendChild(cellText);
		row.appendChild(cell);

		cell = document.createElement('td');
		cellText = document.createTextNode(value);
		//cell.appendChild(cellText);
		cell.innerHTML = value;
		row.appendChild(cell);
		tbodyn.appendChild(row);
	}
})();

/** Stylesheet **/
loadStyleSheet('https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.2/css/bootstrap.min.css');
// load google analytics
loadScript('https://www.googletagmanager.com/gtag/js?id=UA-106238155-1').then(function () {
	window.dataLayer = window.dataLayer || [];

	function gtag() {
		window.dataLayer.push(arguments);
	}
	gtag('js', new Date());
	gtag('send', 'pageview');
	gtag('config', 'UA-106238155-1', {
		page_title: document.title,
		page_path: location.pathname,
		page_location: location.href,
	});
	gtag('config', 'G-BG75CLNJZ1', {
		page_title: document.title,
		page_path: location.pathname,
		page_location: location.href,
	});
});

// to defer the loading of stylesheets
// just add it right before the </body> tag
// and before any javaScript file inclusion (for performance)
function loadStyleSheet(src) {
	if (document.createStyleSheet) document.createStyleSheet(src);
	else {
		var stylesheet = document.createElement('link');
		stylesheet.href = src;
		stylesheet.rel = 'stylesheet';
		stylesheet.type = 'text/css';
		document.getElementsByTagName('head')[0].appendChild(stylesheet);
	}
}

function loadScript(src) {
	return new Promise(resolve => {
		const script = document.createElement('script');
		script.src = src;
		script.onload = resolve;
		document.getElementsByTagName('head')[0].appendChild(script);
	});
}
