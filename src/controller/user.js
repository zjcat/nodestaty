/*
 * @Author: your name
 * @Date: 2020-01-02 10:15:31
 * @LastEditTime : 2020-01-03 15:16:13
 * @LastEditors  : Please set LastEditors
 * @Description: 用户相关接口处理
 * @FilePath: \blog\src\controller\user.js
 */
const {
    exec
} = require('../db/mysql');

//登录
const loginCheck = (username, password) => {
    const sql = `select * from users where username='${username}' and password=${password}`
    return exec(sql).then(selectData => {
        return selectData[0]?selectData[0]:[]
    })
}

//注册
const registerCheck = (username, password, realname) => {
    const sql = `insert into users (username,password,realname) values ('${username}','${password}','${realname}')`
    return exec(sql).then(insertData => {
        if (insertData.affectedRows) {
            return true
        } else {
            return false
        }
    })
}

//更改用户状态
const updateState = (id,stateNum) => {
    const sql = `update users set state=${stateNum} where id=${id}`
    return exec(sql).then(insertData => {
        if (insertData.affectedRows) {
            return true
        } else {
            return false
        }
    })
}

module.exports = {
    loginCheck,
    registerCheck,
    updateState
}