//db.js
// 连接MySQL
var mysql = require('mysql');
var pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'test'
});

function query(sql, callback) {
  pool.getConnection(function(err, connection) {
    // Use the connection
    connection.query(sql, function(err, rows) {
      callback(err, rows);
      connection.release(); //释放链接
    });
  });
}

exports.query = query;
