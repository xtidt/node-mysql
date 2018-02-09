var express = require('express');
var mysql = require('mysql');
var db = require('../modal/db');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
    if (req.cookies.islogin) {
        req.session.islogin = req.cookies.islogin;
    }

    if (req.session.islogin) {
        res.locals.islogin = req.session.islogin;
    }

    res.render('user/login', {
        'title': '登陆'
    });
});

router.route('/login')
    .get(function(req, res, next) {
        if (req.cookies.islogin) {
            req.session.islogin = req.cookies.islogin;
        }

        if (req.session.islogin) {
            res.locals.islogin = req.session.islogin;
        }

        res.render('user/login', {
            'title': '登陆'
        });
    })
    .post(function(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;

        var sql = `select password from user where username="${username}"`;

        db.query(sql, function(err, result) {
            if (err) {
                res.end('登录失败：' + err);
            } else {
                if (result[0] === undefined) {
                    res.status(400).json({error: '没有该用户'});
                } else {
                    if (result[0].password === req.body.password) {
                        req.session.islogin = req.body.username;
                        res.locals.islogin = req.session.islogin;
                        res.cookie('islogin', res.locals.islogin, {
                            maxAge: 60000
                        });
                        res.send('ok');
                    } else {
                        res.status(400).json({error: '密码错误'});
                    }
                }

            }
        })
    });

router.route('/reg')
    .get(function(req, res, next) {
        res.render('user/reg', {
            'title': '注册'
        });
    })
    .post(function(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        var addSqlParams = [username, password];
    
        var addSql = 'INSERT INTO user(username, password) VALUES(?,?)';
    
        var sql = mysql.format(addSql, addSqlParams);
    
        db.query(sql, function(err, rows) {
            if (err) {
                res.end('新增失败：' + err);
            } else {
                res.send(rows);
            }
        })
    
    });

router.get('/logout', function(req, res, next){
    res.clearCookie('islogin');
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;
