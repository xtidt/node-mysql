var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');

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

router.get('/view', function(req, res, next) {
    var sql = "select * from myclass";
    connection.query(sql, function(err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }

        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        res.send(result);
        console.log('------------------------------------------------------------\n\n');
    });
    
});

router.get('/insert', function(req, res, next) {
    res.send('insert');
});

router.get('/update', function(req, res, next) {
    res.send('update');
});

router.get('/delete', function(req, res, next) {
    res.send('delete');
});

module.exports = router;