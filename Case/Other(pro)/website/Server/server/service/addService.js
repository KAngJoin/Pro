const addMod = require('../models/addModule');
module.exports = {
    addHistoryData: function (data, fn) {
        let key_arr = Object.keys(data), len = key_arr.length;
        // TODO 先 检查是否有某一期存在了
        let j = 0, i = 0, exist = false, exist_issue = [];
        function check() {
            let issue = key_arr[j]
            if (issue && j < len) {
                addMod.exist([issue], function (result) {
                    if (!result[0].num) {
                        j++
                        if (j == len) {
                            tool()
                        } else {
                            check()
                        }
                    } else {
                        exist_issue.push(issue)
                        j++
                        if (j == len) {
                            fn({
                                code: 30000,
                                data: {
                                    issue: exist_issue,
                                    descript: `issue数组中的期数已存在`
                                },
                                message: '添加失败,存在已添加数据'
                            })
                        } else {
                            check()
                        }
                    }
                })
            }
        }
        // 添加数据
        function tool() {
            let ele = key_arr[i]
            if (ele && i < len) {
                let params = [ele]
                data[ele].forEach(val => {
                    params.push(val)
                });
                addMod.historyM(params, function (res) {
                    if (res.affectedRows) {
                        i++
                        tool()
                    }
                })
            } else if (i == len) {
                fn({
                    code: 0,
                    message: '添加成功'
                })
            }
        }
        check()
    }
}
