/*
 * @Author: your name
 * @Date: 2019-12-31 18:07:32
 * @LastEditTime : 2019-12-31 18:35:18
 * @LastEditors  : Please set LastEditors
 * @Description: 返回接口数据
 * @FilePath: \blog\src\controller\blog.js
 */
const getList = (author, keyword) => {
    //返回列表数据
    return [{
        id: 1,
        title: '标题A',
        content: "内容A",
        createTime: 1546610491112,
        author: "zhangsan"
    }, {
        id: 2,
        title: '标题B',
        content: "内容B",
        createTime: 1546610491113,
        author: "lisi"
    }, {
        id: 3,
        title: '标题C',
        content: "内容C",
        createTime: 1546610491114,
        author: "wangwu"
    }]
}

//返回文章详情
const getDetail = (id) =>{
    return {
        id: 1,
        title: '标题A',
        content: "内容A",
        createTime: 1546610491112,
        author: "zhangsan"
    }
}
module.exports = {
    getList,
    getDetail
}