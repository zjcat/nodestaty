/*
 * @Author: your name
 * @Date: 2020-01-02 15:29:13
 * @LastEditTime : 2020-01-02 16:48:42
 * @LastEditors  : Please set LastEditors
 * @Description: Mysql连接配置
 * @FilePath: \blog\src\conf\db.js
 */
const env = process.env.NODE_ENV//环境参数

//配置
let MYSQL_CONF
if(env === 'dev'){
    MYSQL_CONF = {
        host:'localhost',
        user:"root",
        password:"root",
        port:'3306',
        database:'myblog'
    }
}

if(env === 'prduction'){
    MYSQL_CONF = {
        host:'192.168.168.173',
        user:"root",
        password:"root",
        port:'3306',
        database:'myblog'
    }
}

module.exports = MYSQL_CONF;