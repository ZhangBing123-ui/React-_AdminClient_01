//封装能发ajax请求的函数
import axios from 'axios'
import qs from 'qs'


axios.interceptors.request.use(function (config){


    const {method,data}=config
    if(method.toLocaleLowerCase()==="post"&&typeof data==="object"){
        config.data=qs.stringify(data)
    }


    return config;
})


axios.interceptors.response.use(function(response){
    return response.data
},function(error){
  
    return new Promise(()=>{})
})

export default axios