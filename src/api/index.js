//包含应用中所有接口的函数：接口请求函数
import ajax from './ajax'
//const BASE='http://localhost:5000'
const BASE=''


export function reqLogin(username,password){
    ajax({
        method:'post',
        url:BASE+'/login',
        data:{
            username,
            password
        }
    })
}
const name="admin"
const pwd="admin"
reqLogin(name,pwd)