const askModel = require('../models/askModule');
module.exports = {
    askAll: function (data, fn) {
        let option = data.options || ""
        askModel.askAll(option, function (res) {
            fn({
                data: res
            })
        })
    }
}
