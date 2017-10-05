var express = require('express');
var app = express();
var sql = require('mssql');
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'test'
});

connection.connect();

var sql = "select * from myclass";

connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
});
 


app.listen(8080, function() {
	console.log('app listening on 8080');
})

connection.end();