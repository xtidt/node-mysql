readme.md
## node express + node mysql 

### step 1
> 安装依赖
```javascript
yarn
或者
npm install
```

### step 2
> 打开MySQL客户端，新建一个数据库
```sql
CREATE TABLE `myclass` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `name` char(20) NOT NULL,
  `sex` int(4) NOT NULL DEFAULT '0',
  `degree` double(16,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
```
> 新建用户关系表
```sql
CREATE TABLE `user` (
  `id` int(4) NOT NULL,
  `username` char(20) DEFAULT NULL,
  `password` char(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
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
### step 3
> 使用ejs建立文件模板
- 根据ejs模板新建增删改查页面

### step 4

> 新建视图路由
- 根据页面目录配置express router
- 视图分为API, 用户user与其他
- 示例：
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

### step 5
> 新建并引入 `db.js` 同时新建api路由
- 新建数据分层用于控制与数据库相关的操作

```javascript
// 引用MySQL模块 并连接MySQL
var mysql = require('mysql');
var pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'test'
});

function query(sql, callback) {
  pool.getConnection(function(err, connection) {
    // Use the connection
    connection.query(sql, function(err, rows) {
      callback(err, rows);
      connection.release(); //释放链接
    });
  });
}

exports.query = query;

```
- get接口 `page/view ` 示例
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

### done :)
> 运行app
```javascript
npm start
```

> 访问列表页面 查询数据
```javascript
http://127.0.0.1:10000/view || localhost:10000/view
```



