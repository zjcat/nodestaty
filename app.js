/*
 * @Author: your 赵静
 * @Date: 2019-12-31 14:10:03
 * @LastEditTime : 2020-01-03 16:12:00
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blog\app.js
 */
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const querystring = require('querystring');

//session 数据
const SESSION_DATA = {};

//获取cookie的过期时间
const getCookieExpires=()=>{
    const d=new Date();
    d.setTime(d.getTime()+(24*60*60*1000));
    return d.toGMTString()
}

//用于处理 post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }

        if (req.headers['content-type'] !== 'application/json') {
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
    });
    return promise
}

const serverHandle = (req, res) => {
    //设置返回格式
    res.setHeader('Content-type', 'application/json');

    //获取 path
    const url = req.url;
    req.path = url.split('?')[0];

    //解析 query
    req.query = querystring.parse(url.split('?')[1]);

    //解析 cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=');
        const key = arr[0] ? arr[0].trim() : '';
        const val = arr[1] ? arr[1].trim() : '';
        req.cookie[key] = val;
    });

    //解析session
    let needSetCookite = true;//已经存在userid
    let userId = req.cookie.userid;
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }
    } else {
        needSetCookite = false;//未存在userid
        userId = `${Date.now()}_${Math.random()}`;
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId];

    //处理 post data
    getPostData(req).then(postData => {
        req.body = postData;
        //处理博客路由
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                if(!needSetCookite){
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly;expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(blogData))
            });
            return
        }

        //处理用户路由
        const userResult = handleUserRouter(req, res);
        if (userResult) {
            userResult.then(userData => {
                if(!needSetCookite){
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly;expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(userData))
            });
            return
        };

        //处理404
        res.writeHead(404, {
            "Content-type": "text/plain"
        });
        res.write("404 Not Found\n")
        res.end();
    });


}
module.exports = serverHandle;