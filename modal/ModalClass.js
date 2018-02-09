const db = require('./db');

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

    insertOne() {

    }

    updateOne(id, name, sex, degree) {
        return new Promise((resolve, reject) => {
            var updateSqlParams = [name, sex, degree, id];
            var sql = mysql.format('UPDATE myclass SET name = ?, sex = ?, degree = ? WHERE id = ?', updateSqlParams);
            db.query(sql, function (error, results, fields) {
                if (error) {
                    console.log(error);
                    
                    reject(error);
                } else {
                    resolve(results)
                }
            });
        })
    }
};

module.exports = ModalClass;