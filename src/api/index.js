//包含应用中所有接口的函数：接口请求函数
import ajax from './ajax'

//const BASE='http://localhost:5000'
const BASE=''

export const reqLogin=(username,password)=>( ajax.post(BASE+'/login',{ username, password})) 
    /*ajax({
        method:'post',
        url:BASE+'/login',
        data:{
           username,
           password
        }
    })
   
/*
export function reqLogin(username,password){
  return  
}

const name="admin"
const pwd="admin"
reqLogin(name,pwd).then(result=>{
    //const result=response.data
   console.log('请求成功了',result); 
},error=>{
    alert('请求失败了'+error.message);

})*/