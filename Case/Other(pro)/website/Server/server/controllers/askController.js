const askService = require('../service/askService')
module.exports = {
    askAllData: function (req, res) {
        let data = req.body
        askService.askAll(data, function (result) {
            res.json(result)
        })
    },
}