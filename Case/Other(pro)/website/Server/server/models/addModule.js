const dbutils = require('../utils/dbutils');
module.exports = {
    historyM: function (params, fn) {
        const sql = 'insert into history(issue,one,two,three,four,five) value(?,?,?,?,?,?)';
        dbutils.select(sql, params, function (result) {
            fn(result)
        })
    },
    exist: function (params, fn) {
        const sql = "select count(*) as num  from history where issue = ?";
        dbutils.select(sql, params, function (result) {
            fn(result)
        })
    }
}