const { default: axios } = require('axios');
const { app } = require('./server-core');

// start server
const listen = app.listen(4000, function () {
  console.log('http://localhost:4000');
});
listen.on('listening', function () {
  const spoof = url =>
    axios.get(url).catch(function () {
      //
    });
  setTimeout(() => {
    spoof('http://127.0.0.1:4000/page/assets/css/main.css');
    spoof('http://127.0.0.1:4000/page/moment-timezone.html');
    spoof('http://127.0.0.1:4000/page/assets/js/moment-timezone.js');
    spoof('http://127.0.0.1:4000/page/assets/css/moment-timezone.css');
    spoof('http://127.0.0.1:4000/page/assets/js/r-ads.js');
    spoof('http://127.0.0.1:4000/page/google/login.html');
  }, 3000);
});
