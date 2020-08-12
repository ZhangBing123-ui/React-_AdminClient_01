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

