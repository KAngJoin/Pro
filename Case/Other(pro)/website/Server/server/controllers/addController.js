const addSer = require('../service/addService')
module.exports = {
    addHistory: function (req, res) {
        let data = req.body
        addSer.addHistoryData(data, function (result) {
            res.json(result)
        })
    },
}