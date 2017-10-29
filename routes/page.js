var express = require('express');
var page = express.Router();

// 该路由使用的中间件
page.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

page.get('/', function(req, res, next) {
  res.render('pages/index');
});

page.get('/view', function(req, res, next) {
  res.render('pages/view');
});

page.get('/view/:id', function(req, res, next) {
  res.render('pages/detail');
});

page.get('/insert', function(req, res, next) {
  res.render('pages/insert');
});

page.get('/update', function(req, res, next) {
  res.send('page update');
});

page.get('/delete', function(req, res, next) {
  res.send('page delete');
});

module.exports = page;