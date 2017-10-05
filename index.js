var express = require('express');
var app = express();
var router = require('./routes.js');

app.use('/', router);

app.listen(8080, function() {
	console.log('app server start listen on 8080');
})
