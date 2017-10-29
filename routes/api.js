var express = require('express');
var mysql  = require('mysql');  
var api = express.Router();
var db = require('../modal/db');


// 该路由使用的中间件
api.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

api.get('/view', function (req, res, next) {
  db.query('select * from myclass', function (err, rows) {
    if (err) {
      res.send([]);
    } else {
      res.send(rows);
    }
  })
});

api.get('/insert', function (req, res, next) {
  res.send('insert');
});

api.post('/insert', function (req, res, next) {
  var name = req.body.name;
  var sex = req.body.sex;
  var degree = req.body.degree;
  var addSqlParams = [name, sex, degree];

  var addSql = 'INSERT INTO myclass(name, sex, degree) VALUES(?,?,?)';
  //Preparing Queries
  sql = mysql.format(addSql, addSqlParams);

  db.query(sql, function (err, rows) {
    if (err) {
      res.end('新增失败：' + err);
    } else {
      res.send(rows);
      // res.redirect('/pages');
    }
  })
});

api.get('/update', function (req, res, next) {
  res.send('update');
});

api.get('/delete', function (req, res, next) {
  res.send('delete');
});

module.exports = api;