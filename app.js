/*
 * @Author: your 赵静
 * @Date: 2019-12-31 14:10:03
 * @LastEditTime : 2019-12-31 19:37:52
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blog\app.js
 */
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const querystring = require('querystring');

//用于处理 post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }

        if (req.headers['Content-type'] !== 'application/json') {
            resolve({})
            return
        }

        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        });
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
}

const serverHandle = (req, res) => {
    //设置返回格式
    res.setHeader('Content-type', 'application/json');

    //获取 path
    const url = req.url;
    req.path = url.split('?')[0];

    //解析 query
    req.query = querystring.parse(url.split('?')[1]);
    //处理 post data
    getPostData(req).then(postData => {
        req.body = postData;
        //处理博客路由
        const blogData = handleBlogRouter(req, res);
        if (blogData) {
            res.end(JSON.stringify(blogData))
            return
        }
        //处理用户路由
        const userData = handleUserRouter(req, res);
        if (userData) {
            res.end(JSON.stringify(userData))
            return
        }
    });

    //处理404
    res.writeHead(404, {
        "Content-type": "text/plain"
    });
    res.write("404 Not Found\n")
    res.end();
}
module.exports = serverHandle;