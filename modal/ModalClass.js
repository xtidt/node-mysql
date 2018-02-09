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
};

module.exports = ModalClass;