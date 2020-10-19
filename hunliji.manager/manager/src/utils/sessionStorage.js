let obj = {};

/**
 * putSessionStorage 把数据放到本地存储
 * @param {*} key
 * @param {*} value
 */
obj.putSessionStorage = function (key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
};

/**
 * getSessionStorage 获取本地存储数据
 * @param {*} key
 */
obj.getSessionStorage = function (key) {
    var obj = window.sessionStorage.getItem(key);
    if (obj && obj != 'undefined' && obj != 'null') {
        return JSON.parse(obj);
    }
    return '';
};

/**
 * removeSessionStorage 清除本地数据
 * @param {*} key
 */

obj.removeSessionStorage = function (key) {
    if (key) {
        window.sessionStorage.removeItem(key);
    } else {
        console.log(arguments)
        for (var i in arguments) {
            window.sessionStorage.removeItem(arguments[i]);
        }
    }
};


export default obj;