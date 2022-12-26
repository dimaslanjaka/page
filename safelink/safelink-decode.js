/* global safelink */
document.addEventListener('DOMContentLoaded', function () {
	if (!islocalhost()) {
		window.addEventListener('scroll', decodeStart);
	} else {
		decodeStart();
	}
});

if (typeof log === 'undefined') {
	/**
	 * debug on localhost
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const log = islocalhost()
		? console.log
		: function (..._args) {
				//
		  };
}

function decodeStart() {
	/**
	 * @type {(typeof import('safelinkify'))['default']}
	 */
	const instance = new safelink({
		// exclude patterns (dont anonymize these patterns)
		exclude: [/([a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?[.])*webmanajemen\.com/],
		// url redirector
		redirect: 'https://www.webmanajemen.com/page/safelink.html?url=',
		// debug
		verbose: false,
		// encryption type = 'base64' | 'aes'
		type: 'base64',
		// password aes, default = root
		password: 'unique-password',
	});
	const parse_safelink = instance.resolveQueryUrl(location.href);
	const value_safelink = parse_safelink.url || parse_safelink.o || parse_safelink.u;
	console.log(value_safelink);
	if (value_safelink) {
		/**
		 * @type {import('safelinkify').Nullable<string>}
		 */
		const redirect_to = value_safelink.o
			? value_safelink.o.decode
			: value_safelink.u
			? value_safelink.u.decode
			: value_safelink.base64
			? value_safelink.base64.decode
			: null;
		if (redirect_to) {
			replaceGoButton(redirect_to);
		}
	}
}

function replaceGoButton(url) {
	const go = document.querySelector('#go');
	const a = document.createElement('a');
	a.href = url;
	a.rel = 'nofollow noopener noreferer';
	a.classList.add('btn', 'btn-sm', 'btn-success', 'text-decoration-none');
	const parse_redirect = parse_url(url);
	a.textContent = 'goto ' + parse_redirect.host;
	replaceWith(a, go);
}

/**
 * Replace elements with new
 * @param {HTMLElement} newElement
 * @param {HTMLElement} oldElement
 */
function replaceWith(newElement, oldElement) {
	if (!oldElement.parentNode) {
		console.log(oldElement, 'parent null');
		let d = document.createElement('div');
		d.appendChild(oldElement);
	} else {
		//log(oldElement.parentNode.tagName);
		oldElement.parentNode.replaceChild(newElement, oldElement);
	}
}

/**
 * parse url to object
 * @param string href
 * @return HTMLAnchorElement
 * @return Object.query
 */
function parse_url(href) {
	if (!href) {
		href = location.href;
	}
	var l = document.createElement('a');
	l.href = href;
	l.query = parse_query({}, href);
	return l;
}

/**
 * Parse Query URL and Hash
 * @param string query
 * @param string search query (?url=xxxx)
 */
function parse_query(query, search) {
	if (!search) {
		search = window.location.search;
	} else if (/^https?:\/\//i.test(search)) {
		search = new URL(search).search;
	}
	var urlParams = new URLSearchParams(search);
	var urlp = Object.fromEntries(urlParams);
	var hash = window.location.hash.substr(1);
	urlParams = new URLSearchParams(hash);
	var urlh = Object.fromEntries(urlParams);
	var urlO = Object.assign(urlh, urlp);
	if (typeof query == 'function') {
		return urlO;
	}
	if (query && urlO[query]) {
		return urlO[query];
	}
	return false;
}

/**
 * check current script running on localhost
 * @returns
 */
function islocalhost() {
	// local hostname
	if (['adsense.webmanajemen.com', 'localhost', '127.0.0.1'].includes(location.hostname)) return true;
	// local network
	if (location.hostname.startsWith('192.168.')) return true;
	// port defined
	if (location.port.length > 0) return true;
	return false;
}
