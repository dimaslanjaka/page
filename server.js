const express = require('express');

const app = express();

app.use(express.static(__dirname));

app.listen(4000, function () {
	console.log('http://localhost:4000');
});
