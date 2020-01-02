/*
 * @Author: your name
 * @Date: 2019-12-31 18:07:32
 * @LastEditTime : 2020-01-02 17:23:30
 * @LastEditors  : Please set LastEditors
 * @Description: 返回接口数据
 * @FilePath: \blog\src\controller\blog.js
 */
const {
    exec
} = require('../db/mysql');

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if(author){
        sql +=`and author='${author}'`
    }
    if(keyword){
        sql += `and title like '%${keyword}%'`
    }
    sql +=`order by createtime desc`
    return exec(sql)
}

//返回文章详情
const getDetail = (id) =>{
    let sql = `select * from blogs where `
    if(id){
        sql +=`id='${id}'`
    }
    return exec(sql)
}

//上传新的博客详情
const newBlog = (blogData={})=>{
    return{
        id:3
    }
}

//更新博客详情
const updataBlog = (id,blogData={})=>{
    return true
}

//删除博客
const delBlog = (id)=>{
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updataBlog,
    delBlog
}