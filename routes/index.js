var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.cookies.islogin) {
        req.session.islogin = req.cookies.islogin;
    }

    if (req.session.islogin) {
        res.locals.islogin = req.session.islogin;
    }

    res.render('index', {
        title: 'Adm',
        username: res.locals.islogin
    });
});

module.exports = router;
