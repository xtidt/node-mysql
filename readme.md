readme.md
## node express + node mysql 

> 安装依赖
```javascript
yarn
或者
npm install
```


> 打开Navicat客户端，新建一个数据库
```sql
CREATE TABLE `myclass` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `name` char(20) NOT NULL,
  `sex` int(4) NOT NULL DEFAULT '0',
  `degree` double(16,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
```

> 连接数据库 新建连接池
```javascript
var mysql = require('mysql');
var pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'test'
});
```

> 新建模板显示文件
- 根据ejs模板新建增删改查页面
- 根据页面目录配置express router

```javascript
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
```

> 引入db 新建api路由
```javascript
api.get('/view', function (req, res, next) {
  db.query('select * from myclass', function (err, rows) {
    if (err) {
      res.send([]);
    } else {
      res.send(rows);
    }
  })
});
```

> 运行app
```javascript
npm start
```

> 访问列表页面 查询数据
```javascript
http://127.0.0.1:10000/view || localhost:10000/view
```



