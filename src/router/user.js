/*
 * @Author: your name
 * @Date: 2019-12-31 17:05:22
 * @LastEditTime : 2020-01-03 16:19:12
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blog\src\router\user.js
 */
const {
    loginCheck,
    registerCheck,
    updateState
} = require("../controller/user");
const {
    SuccessModel,
    ErrorModel
} = require('../modle/resModle');

const handleUserRouter = (req, res) => {
    const method = req.method;

    //登录验证
    if (method === 'GET' && req.path === '/api/user/login-test') {
        console.log("req.session.username is",req.session.username)
        if (req.session.username) {
            return Promise.resolve(new SuccessModel(
                req.session
            ))
        }
        return Promise.resolve(new ErrorModel('尚未登录'))
    }

    //登录
    if (req.path === '/api/user/login' && method === 'GET') {
        const {
            username,
            password
        } = req.query,
            result = loginCheck(username, password);
        return result.then(data => {
            if (data.id) {
                req.session.username = data.username;
                req.session.realName = data.realname;
                return new SuccessModel()
            }
            return new ErrorModel("登录失败")
        })

    }

    //注册
    if (req.path === '/api/user/register' && method === 'POST') {
        const {
            username,
            password,
            realname
        } = req.body,
            result = registerCheck(username, password, realname);
        return result.then(data => {
            if (data) {
                return new SuccessModel()
            } else {
                return new ErrorModel("注册失败")
            }
        })
    }

    //更改用户状态
    if (req.path === '/api/user/updatestate' && method === 'POST') {
        const {
            userid,
            stateNum
        } = req.body,
            result = updateState(userid, stateNum);
        return result.then(data => {
            if (data) {
                return new SuccessModel()
            } else {
                return new ErrorModel("更改失败")
            }
        })
    }

}

module.exports = handleUserRouter;