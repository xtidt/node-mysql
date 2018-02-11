var express = require('express');
var mysql = require('mysql');
var api = express.Router();
var db = require('../modal/db');
var ModalClass = require('../modal/ModalClass');


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
  let modalClass = new ModalClass();
  modalClass.getlist().then(
    (rows) => {
      res.send(rows);
    },
    (err) => {
      res.send(err);
    }
  )
});

/**
 * 查询详情页
 */
api.get('/view/:id', function (req, res, next) {
  let id = req.params.id;
  if(!id){
    res.status(400).json({'error':'require params'})
  }

  let modalClass = new ModalClass();
  modalClass.getDetail(id).then(
    (rows) => {
      res.send(rows[0]);
    },
    (err) => {
      res.status(400).json({'error': err})
    }
  )
});

/**
 * 新增页面跳转
 */
api.post('/insert', function (req, res, next) {
  var name = req.body.name;
  var sex = req.body.sex;
  var degree = req.body.degree;

  if(!name || !sex || !degree){
    res.status(400).json({'error':'require params'})
  }

  let modalClass = new ModalClass();
  modalClass.insertOne(name, sex, degree).then(
    (rows) => {
      res.send(rows);
    },
    (err) => {
      res.status(400).json({'error': err})
    }
  );
  
});

/**
 * 修改
 */
api.post('/update/:id', function (req, res, next) {
  var id = req.body.id;
  var name = req.body.name;
  var sex = req.body.sex;
  var degree = req.body.degree;

  if(!id || !name || !sex || !degree){
    res.status(400).json({'error':'require params'})
  }

  let modalClass = new ModalClass();
  modalClass.updateOne(id, name, sex, degree).then(
    (rows) => {
      res.send(rows);
    },
    (err) => {
      res.status(400).json({'error': err})
    }
  );

});

/**
 * 删
 */
api.get('/delete/:id', function (req, res, next) {
  let id = req.params.id;
  let modalClass = new ModalClass();
  modalClass.deleteOne(id).then(
    (rows) => {
      res.send(rows);
    },
    (err) => {
      res.status(400).json({'error': err})
    }
  )
});

/**
 * 查询
 */
api.get('/search', function (req, res, next) {
  let name = req.query.name;
  let modalClass = new ModalClass();
  modalClass.search(name).then(
    (rows) => {
      res.send(rows);
    },
    (err) => {
      res.status(400).json({'error': err})
    }
  )
})

module.exports = api;
