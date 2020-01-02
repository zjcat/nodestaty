/*
 * @Author: your name
 * @Date: 2019-12-31 17:05:22
 * @LastEditTime : 2020-01-02 11:42:01
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blog\src\router\user.js
 */
const {loginCheck} = require("../controller/user");
const {SuccessModel,ErrorModel} =require("../modle/resModle");
const handleUserRouter = (req,res)=>{
    const method = req.method;
    //登录
    if(req.path==='/api/user/login' && method==='POST'){
       const {username,password} = req.body;
       result = loginCheck(username,password);
       if(result){
           return new SuccessModel()
       }else{
           return new ErrorModel("登录失败")
       }
    }

    //注册
    if(req.path==='/api/user/login' && method==='POST'){
        return{
            msg:"注册"
        }
    }
   
}

module.exports = handleUserRouter;