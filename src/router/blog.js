/*
 * @Author: your name
 * @Date: 2019-12-31 17:03:30
 * @LastEditTime : 2020-01-03 09:48:05
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blog\src\router\blog.js
 */
const {
    getList,
    getDetail,
    newBlog,
    updataBlog,
    delBlog
} = require('../controller/blog');
const {
    SuccessModel,
    ErrorModel
} = require('../modle/resModle');

const handleBlogRouter = (req, res) => {
    const method = req.method,
        id = req.query.id;
    //获取博客列表
    if (req.path === '/api/blog/list' && method === 'GET') {
        const author = req.query.author || '',
            keyword = req.query.keyword || '',
            result = getList(author, keyword);
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    //获取博客详情
    if (req.path === '/api/blog/detail' && method === 'GET') {
        const result = getDetail(id);
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    //新建一篇博客
    if (req.path === '/api/blog/new' && method === 'POST') {
        const result = newBlog(req.body);
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    //这是更新一篇博客
    if (req.path === '/api/blog/updata' && method === 'POST') {
        const result = updataBlog(id, req.body);
        return result.then(data => {
            if (data) {
                return new SuccessModel()
            } else {
                return new ErrorModel("更新失败")
            }

        })

    }

    //这是删除一篇博客
    if (req.path === '/api/blog/del' && method === 'POST') {
        const result = delBlog(id);
        return result.then(data => {
            if (data) {
                return new SuccessModel()
            } else {
                return new ErrorModel("删除失败")
            }

        })
    }


}

module.exports = handleBlogRouter;