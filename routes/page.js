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
    title: '主页',
    username: res.locals.islogin
  });
});

page.get('/view', function(req, res, next) {
  res.render('pages/view', {
    title: '列表',
    username: res.locals.islogin
  });
});

page.get('/view/:id', function(req, res, next) {
  res.render('pages/detail', {
    title: '详情',
    action: 'view',
    id: req.params.id,
    username: res.locals.islogin
  });
});

page.get('/update/:id', function(req, res, next) {
  res.render('pages/detail', {
    title: '更新',
    action: 'update',
    id: req.params.id,
    username: res.locals.islogin
  });
});

page.get('/insert', function(req, res, next) {
  res.render('pages/insert',{
    title: '新增',
    username: res.locals.islogin
  });
});


module.exports = page;
