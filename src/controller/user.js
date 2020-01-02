/*
 * @Author: your name
 * @Date: 2020-01-02 10:15:31
 * @LastEditTime : 2020-01-02 11:41:52
 * @LastEditors  : Please set LastEditors
 * @Description: 用户相关接口处理
 * @FilePath: \blog\src\controller\user.js
 */
const loginCheck = (username, password) => {
    if (username === 'zhangsan' && password === "123") {
        return true
    }
    return false
}

module.exports = {
    loginCheck
}