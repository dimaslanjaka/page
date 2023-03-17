const main = document.querySelector('main#main');
const UAs = ['Mozilla/5.0 (Linux; U; Linux x86_64; en-US) Gecko/20100101 Firefox/46.4'];

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
