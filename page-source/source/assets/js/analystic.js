/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference path="./globals.d.ts" />

window.dataLayer = window.dataLayer || [];
let dump, data_analystic, IP;

if (typeof window.gtag !== 'function') {
	window.gtag = function () {
		window.dataLayer.push(arguments);
	};
}

window.gtag('js', new Date());

window.gtag('config', 'UA-106238155-1');

/**
 * Track google analystics
 * @param {string} what
 * @param {string} category
 * @param {string} label
 * @param {string|number} value
 * @returns
 */
function TRACK(what, category, label, value) {
	return window.gtag('event', what, {
		elements: value,
		event_category: category,
		event_label: label,
		value: value,
	});
}

//var timerStart = Date.now();

///track all elements through page
var elementsArray = Array.from(document.querySelectorAll('b,i,a,div,p,span,iframe,ins'));
elementsArray.forEach(function (elem) {
	elem.addEventListener('click', function (event) {
		var clickon = 'X: ' + event.clientX + ' - Y: ' + event.clientY;
		dump = document.getElementById('track');
		var elem = this.tagName;
		//var className = this.className;
		//var id = this.id;
		//var src = this.src;
		var href = this.href;
		var data = elem + '(' + clickon + ')';
		if (dump) {
			dump.textContent = data;
		}
		if (elem == 'A' || elem == 'a') {
			TRACK('Link', href, href, clickon);
		} else {
			TRACK('Click', elem, data, clickon);
		}
	});
});
/*
///Track all outbound links clicked
var trackLinks = document.getElementsByTagName('a');
for(var i = 0, len = trackLinks.length; i < len; i++) {
    trackLinks[i].onclick = function () {
      TRACK("Click",this.href,this.href,this.href);
    };
}*/
//TRACK("event","categories","labels","value");
//initialize navigation timming
window.performance =
	window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};
var timing = performance.timing || {};
var parseTime = timing.loadEventEnd - timing.responseEnd;
//calculate pageload time
var perfData = window.performance.timing;
var pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
TRACK('Timing', 'Calculate', 'PageLoadTime', pageLoadTime);
//calculate request response time
var connectTime = perfData.responseEnd - perfData.requestStart;
TRACK('Timing', 'Calculate', 'RequestResponseTime', connectTime);
//calculate page render time
var renderTime = perfData.domComplete - perfData.domLoading;
TRACK('Timing', 'Calculate', 'RenderTime', renderTime);
// calculate parseTime
TRACK('Timing', 'Calculate', 'ParseTime', parseTime);

/*
(function() {
  var t0 = performance.now();
  window.performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};
 var timing = performance.timing || {};
 var parseTime = timing.loadEventEnd - timing.responseEnd;
  //performance.timing.navigationStart + performance.now() = Date.now()
  $("#time").html("Date.Now(): "+ (performance.now() - performance.timing.navigationStart));
 $("#time").append('<br/>Parsetime: '+ parseTime);
var t1 = performance.now();
var func_timing = "function timing "+(t1 - t0) + " milliseconds.";  $("#time").append('<br/>'+func_timing);
})();
*/

// Opera 8.0+
var isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]"
var isSafari =
	/constructor/i.test(window.HTMLElement) ||
	(function (p) {
		return p.toString() === '[object SafariRemoteNotification]';
	})(!window['safari'] || (typeof window.safari !== 'undefined' && window.safari.pushNotification));

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/ false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1 - 71
var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;

const cloudflare = function () {
	fetch('https://www.cloudflare.com/cdn-cgi/trace')
		.then(response => response.text())
		.then(data => {
			const userData = data
				.split('\n')
				.map(str => {
					const spl = str.split('=');
					const key = spl[0];
					const value = spl[1];
					//console.log(key, value);
					if (key.trim().length > 0)
						return {
							[key]: value,
						};
				})
				.filter(str => typeof str !== 'undefined')
				.reduce((prev, next) => ({ ...prev, ...next }), {});
			return userData;
		})
		.then(setDataUser);
};

const ipApi = function () {
	if (typeof jQuery !== 'undefined') {
		$.ajax({
			url: 'https://ipapi.co/json/',
			method: 'get',
			complete: function (dataip) {
				if (dataip.responseJSON) {
					IP = dataip.responseJSON;
					setDataUser(IP);
				}
			},
		});
	} else {
		fetch('https://ipapi.co/json/')
			.then(response => response.json())
			.then(setDataUser);
	}
};

function setDataUser(IP) {
	data_analystic = {
		referer: location.referer,
		location: location.href,
		origin: location.origin,
		host: location.host,
		'user-agent': navigator.userAgent,
		browser: {
			opera: isOpera,
			firefox: isFirefox,
			chrome: isChrome,
			safari: isSafari,
			ie: isIE,
			edge: isEdge,
			blink: isBlink,
		},
		info: IP,
	};
	//console.log(data_analystic);
}
