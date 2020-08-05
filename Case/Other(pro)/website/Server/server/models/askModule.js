const dbutils = require('../utils/dbutils');
module.exports = {
    askAll: function (params, fn) {
        const sql = `select issue,one,two,three,four,five from history where issue like "${params}%"`;
        dbutils.select(sql, [], function (result) {
            fn(result)
        })
    },
}