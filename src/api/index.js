//包含应用中所有接口的函数：接口请求函数
import ajax from './ajax'

import jsonp from 'jsonp'
import { message } from 'antd'

//const BASE='http://localhost:5000'
const BASE=''

export const reqLogin=(username,password)=>( ajax.post(BASE+'/login',{ username, password})) 
   
export const reqWeather=(city)=>{
    return new Promise((resolve,reject)=>{
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(error,data)=>{
            if(!error&&data.error===0){
               const {dayPictureUrl,weather}= data.results[0].weather_data[0]
                resolve({dayPictureUrl,weather})
        }else{
            message.error("获取天气信息失败")
        }
        })
        
    })
    
}
export const reqCategorys=()=> ajax.get(BASE+"/manage/category/list")

export const reqAddCategory=(categoryName)=> ajax.post(BASE+"/manage/category/add",{
    categoryName
})
export const reqUpdateCategory=({categoryId,categoryName})=> ajax.post(BASE+"/manage/category/update",{
    categoryId,
    categoryName
})

export const reqCategory=(categoryId)=>ajax(BASE+'/manage/category/info',{
    params:{categoryId}
})

export const reqProducts=(pageNum,pageSize)=>ajax(BASE+"/manage/product/list",{
    params:{pageNum,pageSize}
})


export const reqSearchProducts=(
    {pageNum,pageSize,searchName,searchType}
)=>ajax(BASE+"/manage/product/search",{
    params:{pageNum,pageSize,[searchType]:searchName,}   
})

export const reqUpdateStatus=( productId,status)=>ajax(BASE+'manage/product/updateStatus',{
    method:"POST",
   data:{
       productId,
       status
   }
})

export const reqDeleteImg=(name)=>ajax.post(BASE+'/manage/img/delete',{name})

export const reqAddUpdateProduct=(product)=>ajax.post(
    BASE+"/manage/product/"+(product._id?"update":"add"),product)

    export const reqRoles = () => ajax(BASE + '/manage/role/list')
    // 添加角色
    export const reqAddRole = (roleName) => ajax.post(BASE + '/manage/role/add', {
      roleName
    })
    // 更新角色
    export const reqUpdateRole = (role) => ajax.post(BASE + '/manage/role/update', role)
    
    // 获取所有用户的列表
    export const reqUsers = () => ajax(BASE + '/manage/user/list')
    // 删除指定用户
    export const reqDeleteUser = (userId) => ajax.post(BASE + '/manage/user/delete', {
      userId
    })
    // 添加/更新用户
    export const reqAddOrUpdateUser = (user) => ajax.post(BASE + '/manage/user/' + (user._id ? 'update' : 'add'), user)
