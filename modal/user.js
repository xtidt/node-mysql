var db = require('../modal/db');
const user = {
    select: (client, username, callback) => {
        //client为一个mysql连接对象
        client.query('select password from user where username="' + username + '"', function(err, results, fields) {
            if (err) throw err;

            callback(results);
        });
    },

    insert: (client, username, password, callback) => {
        client.query('insert into user value(?,?)', [username, password], function(err, result) {
            if (err) {
                console.log("error:" + err.message);
                return err;
            }
            callback(err);
        });
    },

    test: function(username, password) {
        return new Promise((resolve, reject)=>{
            resolve(1234)
        })
    }
}

module.exports = user;
