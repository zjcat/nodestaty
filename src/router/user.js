/*
 * @Author: your name
 * @Date: 2019-12-31 17:05:22
 * @LastEditTime : 2019-12-31 17:50:50
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blog\src\router\user.js
 */
const handleUserRouter = (req,res)=>{
    
    const method = req.method;
    
    //登录
    if(req.path==='/api/user/login' && method==='POST'){
        return{
            msg:"这是登录的接口"
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