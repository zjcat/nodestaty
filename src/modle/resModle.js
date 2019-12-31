/*
 * @Author: your name
 * @Date: 2019-12-31 17:53:06
 * @LastEditTime : 2019-12-31 18:23:14
 * @LastEditors  : Please set LastEditors
 * @Description:统一处理成功失败的回调
 * @FilePath: \blog\src\modle\resModle.js
 */
class BaseModle {
    constructor(data, message) {
        if (typeof data === 'string') {
            this.message = data;
            data = null;
            message = null;
        }

        if (data) {
            this.data = data;
        }

        if (message) {
            this.message = message
        }
    }
}

class SuccessModel extends BaseModle {
    constructor(data, message) {
        super(data, message);
        this.errno = 0
    }
}

class ErrorModel extends BaseModle {
    constructor(data, message) {
        super(data, message);
        this.errno = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}