/*
 * @Author: your name
 * @Date: 2019-12-31 18:07:32
 * @LastEditTime : 2020-01-03 09:54:18
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
    let newTime = new Date().getTime();
    let sql = `insert into blogs (title,content,author,createtime) values ('${blogData.title}','${blogData.content}','${blogData.author}',${newTime})`;
    return exec(sql).then(insertData=>{
        return {
            id:insertData.insertId
        }
    })
}

//更新博客详情
const updataBlog = (id,blogData={})=>{
    let newTime = new Date().getTime();
    let sql = `update blogs set title='${blogData.title}', content='${blogData.title}',updatatime=${newTime} where id=${id}`;
    return exec(sql).then(insertData=>{
        if(insertData.affectedRows){
            return true
        }else{
            return false
        }
    })
}

//删除博客
const delBlog = (id)=>{
    let sql = `DELETE FROM blogs WHERE id=${id}`;
    return exec(sql).then(insertData=>{
        if(insertData.affectedRows){
            return true
        }else{
            return false
        }
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updataBlog,
    delBlog
}