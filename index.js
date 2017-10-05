var express = require('express');
var app = express();
var router = require('./routes/index.js');

app.use('/', router);

app.listen(8080, function() {
	console.log('app server start listen on 8080');
})
