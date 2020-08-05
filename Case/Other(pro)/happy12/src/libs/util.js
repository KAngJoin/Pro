let util = {};
//名称
util.title = function (name) {
    window.document.title = name || "";
}

export default util;