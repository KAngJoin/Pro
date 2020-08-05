const mysql = require('mysql');

/*连接池*/
const pool = mysql.createPool({
    //cdb
    host: 'cdb-974xkcwy.cd.tencentcdb.com',
    user: 'root',
    password: 'dk+-0918',
    database: 'twelve',
    timezone: "08:00",//解决date获取的数据格式问题
    port: 10039
});
exports.pool = pool;

const select = (sql, param, fn) => {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err)
        } else {
            conn.query(sql, param, (error, result) => {
                conn.release();
                fn(result)
            })
        }
    })
};
exports.select = select;

// test

// var sql = 'insert into history(issue,one,two,three,four,five) value(?,?,?,?,?,?)'
// var param = ['191020001', '2', '5', '6', '10', '11'];
// // var param = []
// select(sql, param, function (res) {
//     console.log(res)
// })