var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var apiRequest = require('./api');

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

//improt api requrest
router.use('/api/', apiRequest);

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

module.exports = router;