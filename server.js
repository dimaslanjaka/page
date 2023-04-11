const { default: axios } = require('axios');
const { app, bs } = require('./server-core');

// start server
const listen = app.listen(4000, function () {
	console.log('http://localhost:4000');
});
listen.on('listening', function () {
	bs.reload();
	const spoof = url =>
		axios.get(url).catch(function () {
			//
		});
	setTimeout(() => {
		spoof('http://127.0.0.1:4000/page/moment-timezone.html');
		spoof('http://127.0.0.1:4000/page/assets/js/moment-timezone.js');
		spoof('http://127.0.0.1:4000/page/assets/css/moment-timezone.css');
	}, 3000);
});
