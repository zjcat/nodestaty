/*
 * @Author: your name
 * @Date: 2020-01-02 15:31:53
 * @LastEditTime : 2020-01-03 10:52:06
 * @LastEditors  : Please set LastEditors
 * @Description: mysql方法
 * @FilePath: \blog\src\db\mysql.js
 */
const MYSQL_CONF = require('../conf/db');
const mysql = require('mysql');
//创建连接对象
const con = mysql.createConnection(MYSQL_CONF);

//开始连接
con.connect()

//执行sql语句
function exec(sql){
    const promise = new Promise((resolve,reject)=>{
        con.query(sql,(err,result)=>{
            if(err){
                resolve(err);
                console.log(err+"失败")
                return
            }
            resolve(result)
        });
    });
    return promise
}

//con.end();

module.exports = {
    exec
}