var express = require('express');
var mysql = require('mysql');
var api = express.Router();
var db = require('../modal/db');


// 该路由使用的中间件
api.use(function timeLog(req, res, next) {
  // console.log('Time: ', Date.now());
  if(req.cookies.islogin){
    req.session.islogin=req.cookies.islogin;
  }

  if(req.session.islogin){
    res.locals.islogin=req.session.islogin;
  }

  if(!res.locals.islogin){
    res.status(400).json({error: '用户未登录,没有权限'});
    return;
  }

  next();
});

/**
 * 查询列表页
 */
api.get('/view', function (req, res, next) {
  db.query('select * from myclass', function (err, rows) {
    if (err) {
      res.send([]);
    } else {
      res.send(rows);
    }
  })
});

/**
 * 查询详情页
 */
api.get('/view/:id', function (req, res, next) {
  var id = req.params.id;
  db.query('select * from myclass where id = ' + id, function (err, rows) {
    if (err) {
      res.send([]);
    } else {
      res.send(rows);
    }
  })
});

/**
 * 新增页面跳转
 */
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

/**
 * 修改
 */
api.get('/update', function (req, res, next) {
  res.send('update');
});

/**
 * 删
 */
api.get('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  db.query("delete from myclass where id=" + id, function (err, rows) {
    if (err) {
      res.end('删除失败：' + err)
    } else {
      res.send('delete');
    }
  });
});

/**
 * 查询
 */
api.get('/search', function (req, res, next) {
  var name = req.query.name;
  var sql = "select * from myclass";

  if (name) {
    sql += " and name LIKE '%" + name + "%' ";
  }

  // if (age) {
  //   sql += " and age=" + age + " ";
  // }
  sql = sql.replace("and", "where");


  db.query(sql, function (err, rows) {
    if (err) {
      res.end("查询失败：", err)
    } else {
      res.send(rows);
    }
  });
})

module.exports = api;
