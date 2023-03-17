const main = document.querySelector('main#main');
const UAs = [
	'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/536.21 (KHTML, like Gecko) Chrome/53.0.1298.142 Safari/533',
	'Mozilla/5.0 (Linux x86_64) Gecko/20130401 Firefox/55.4',
	'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_0) AppleWebKit/535.49 (KHTML, like Gecko) Chrome/47.0.1481.134 Safari/535',
	'Mozilla/5.0 (Windows NT 10.3; WOW64; en-US) AppleWebKit/536.18 (KHTML, like Gecko) Chrome/53.0.3423.289 Safari/602',
	'Mozilla/5.0 (Linux; U; Linux x86_64) Gecko/20100101 Firefox/60.5',
];

fetch('https://api.codetabs.com/v1/proxy?quest=https://www.webmanajemen.com/sitemap.txt')
	.then(res => res.text())
	.then(res => {
		const urls = res.split(/\r?\n/gm).filter(str => !/\/(tags|categories|page)\//.test(str));
		const url = () => urls.sort(() => 0.5 - Math.random())[0];
		if (UAs.includes(navigator.userAgent)) {
			location.reload(url());
		}
		main.querySelectorAll('iframe').forEach(iframe => {
			iframe.src = url();
		});
	});
