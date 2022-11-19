const express = require('express');
const GulpClient = require('gulp');
require('./gulpfile');

GulpClient.series('compile')(null);

const app = express();

app.use(express.static(__dirname));

app.listen(4000, function () {
	console.log('http://localhost:4000');
});
