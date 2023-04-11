/* eslint-disable no-useless-escape */
/* safelink converter */

var queryURL = parse_query('url') || parse_query('o') || parse_query('u');
if (typeof safelinkURL == 'undefined') {
	var safelinkURL = sfUrl();
}
// redirect when in translate google
if (location.host == 'translate.googleusercontent.com' && queryURL) {
	location.href = safelinkURL + queryURL;
}

const EXCLUDE =
	/facebook\.com|twitter\.com|thumblr\.com|blog\.akarmas\.com|web\-manajemen\.blogspot\.com|dimaslanjaka\.github\.io|webmanajemen\.com|www\.blogger\.com|translate\.google\.com|translate\.googleusercontent\.com|javascript\:|\#/gm;
const listener = document.addEventListener || document.attachEvent;
listener('mouseover', function (e) {
	start_safelink(e);
});
listener('click', function (e) {
	start_safelink(e);
});

function start_safelink(e) {
	if ('a' == (e.target.nodeName || e.srcElement.nodeName).toLowerCase()) {
		var t = e.target,
			a = t.href;
		if (e.target.host.match(/javascript\:void/gm)) {
			return;
		}
		let host = parse_url(a) ? parse_url(a).hostname : null;
		if (host && !host.match(EXCLUDE)) {
			t.href = safelinkURL + btoa(a);
			t.setAttribute('target', '_blank');
			if (typeof t.classList != 'undefined') {
				t.classList.toggle('ext-link');
			} else {
				t.setAttribute('class', 'ext-link');
			}
		} else if (host == 'translate.googleusercontent.com') {
			//
		}
	}
}

/**
 * Get safelink URL
 */
function sfUrl() {
	return 'https://www.webmanajemen.com/page/safelink.html?ID=' + Math.random().toString(36).substring(7) + '&url=';
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
