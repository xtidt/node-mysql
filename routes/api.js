var express = require('express');
var api = express.Router();

// 该路由使用的中间件
api.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

api.get('/view', function(req, res, next) {
  res.send('view');
});

api.get('/insert', function(req, res, next) {
  res.send('insert');
});

api.get('/update', function(req, res, next) {
  res.send('update');
});

api.get('/delete', function(req, res, next) {
  res.send('delete');
});

module.exports = api;