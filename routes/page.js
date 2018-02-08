var express = require('express');
var page = express.Router();

// 该路由使用的中间件
page.use(function timeLog(req, res, next) {
  // console.log('Time: ', Date.now());

  if(req.cookies.islogin){
    req.session.islogin=req.cookies.islogin;
  }

  if(req.session.islogin){
    res.locals.islogin=req.session.islogin;
  }

  if(!res.locals.islogin){
    res.redirect('/');
  }

  next();
});

page.get('/', function(req, res, next) {
  res.render('pages/index',{
    username: res.locals.islogin
  });
});

page.get('/view', function(req, res, next) {
  res.render('pages/view', {
    username: res.locals.islogin
  });
});

page.get('/view/:id', function(req, res, next) {
  res.render('pages/detail', {
    username: res.locals.islogin
  });
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
