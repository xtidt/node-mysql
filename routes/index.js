var path = require('path');
var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var apiRequest = require('./api');
var pgaeRouter = require('./page');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'test'
});

connection.connect();

router.get('/', function(req, res, next) {
    res.send('service api');
});

router.get('/test',function(req,res){
    // res.send('service api test');
    res.render('pages/index');
});

//improt api requrest
router.use('/api/', apiRequest);
router.use('/page/', pgaeRouter);

module.exports = router;