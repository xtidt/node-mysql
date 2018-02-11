const db = require('./db');
const mysql = require('mysql');

class ModalClass {
    getlist() {
        return new Promise((resolve, reject) => {
            db.query('select * from myclass', function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        });
    }

    getDetail(id) {
        return new Promise((resolve, reject) => {
            db.query('select * from myclass where id = ' + id, function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    insertOne(name, sex, degree) {
        return new Promise((resolve, reject) => {
            var addSqlParams = [name, sex, degree];
            var addSql = 'INSERT INTO myclass(name, sex, degree) VALUES(?,?,?)';

            var sql = mysql.format(addSql, addSqlParams);

            db.query(sql, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows)
                }
            })
        })
    }

    updateOne(id, name, sex, degree) {
        return new Promise((resolve, reject) => {
            var updateSqlParams = [name, sex, degree, id];
            var sql = mysql.format('UPDATE myclass SET name = ?, sex = ?, degree = ? WHERE id = ?', updateSqlParams);
            db.query(sql, function (error, results, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve(results)
                }
            });
        })
    }

    deleteOne(id) {
        return new Promise((resolve, reject) => {
            db.query("delete from myclass where id=" + id, function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve('delete');
                }
            });
        })
    }

    search(keyword) {
        return new Promise((resolve, reject) => {
            var sql = "select * from myclass";

            if (keyword) {
                sql += " and name LIKE '%" + keyword + "%' ";
            }

            // if (age) {
            //   sql += " and age=" + age + " ";
            // }
            sql = sql.replace("and", "where");

            db.query(sql, function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows);
                }
            });

        })
    }

};

module.exports = ModalClass;