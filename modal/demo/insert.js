var mysql  = require('mysql');  

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'test'
});

connection.connect();

var  addSql = 'INSERT INTO myclass(name, sex, degree) VALUES(?,?,?)';
var  addSqlParams = ['tool1234', 1, 200];

//增
connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         	console.log('[INSERT ERROR] - ', err.message);
         	return;
        }        
 
       console.log('--------------------------INSERT----------------------------');
       console.log('INSERT ID:',result);        
       console.log('-----------------------------------------------------------------\n\n');  
});

connection.end();

