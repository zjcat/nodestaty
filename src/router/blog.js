/*
 * @Author: your name
 * @Date: 2019-12-31 17:03:30
 * @LastEditTime : 2019-12-31 18:37:13
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blog\src\router\blog.js
 */
const {
    getList,
    getDetail
} = require('../controller/blog');
const {
    SuccessModel,
    ErrorModel
} = require('../modle/resModle');

const handleBlogRouter = (req, res) => {
    const method = req.method;

    //获取博客列表
    if (req.path === '/api/blog/list' && method === 'GET') {
        const author = req.query.author || '',
            keyword = req.query.keyword || '',
            listData = getList(author, keyword);
        return new SuccessModel(listData, "获取数据成功")
    }

    //获取博客详情
    if (req.path === '/api/blog/detail' && method === 'GET') {
        const user_id = 1,
            detailData = getDetail(user_id);
        return new SuccessModel(detailData)
    }

    //新建一篇博客
    if (req.path === '/api/blog/new' && method === 'POST') {
        return {
            msg: "这是新建一篇博客的接口"
        }
    }

    //这是更新一篇博客
    if (req.path === '/api/blog/update' && method === 'POST') {
        return {
            msg: "这是更新一篇博客的接口"
        }
    }

    //这是删除一篇博客
    if (req.path === '/api/blog/del' && method === 'PSOT') {
        return {
            msg: "这是删除一篇博客的接口"
        }
    }


}

module.exports = handleBlogRouter;