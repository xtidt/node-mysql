var mysql  = require('mysql');  

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'test'
});

connection.connect();

// var delSql = 'DELETE FROM myclass where id=2';
var delSql = 'DELETE FROM myclass where name = "tool"';

//删
connection.query(delSql,function (err, result) {
        if(err){
          console.log('[DELETE ERROR] - ',err.message);
          return;
        }        
 
       console.log('--------------------------DELETE----------------------------');
       console.log('result', result);
       console.log('DELETE affectedRows', result.affectedRows);
       console.log('-----------------------------------------------------------------\n\n');  
});
 
connection.end();



