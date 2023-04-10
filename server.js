const { default: axios } = require('axios');
const app = require('./server-core');

// start server
const listen = app.listen(4000, function () {
	console.log('http://localhost:4000');
});
listen.on('listening', function () {
	setTimeout(() => {
		axios.get('http://127.0.0.1:4000/page/moment-timezone.html').catch(function () {
			//
		});
	}, 3000);
});
