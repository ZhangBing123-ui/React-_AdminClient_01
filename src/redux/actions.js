import {SET_HEADER_TITLE,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT} from './action-types'
import {reqLogin} from '../api'
import storageUtils from '../utils/storageUtils'
export const setHeaderTitle=(headerTitle)=>({type:SET_HEADER_TITLE,data:headerTitle})
export const receiveUser=(user)=>({type:LOGIN_SUCCESS,user})
export const showError=(errorMsg)=>({type:LOGIN_FAIL,errorMsg})

export const logout=()=>{
    storageUtils.removeUser()
    return {type:LOGOUT}
}

export const login= (username,password)=>{
    return async dispatch=>{
        const result=await reqLogin(username,password)

        if(result.status===0){
            const user =result.data
            storageUtils.saveUser(user)
            dispatch(receiveUser(user))
        }else{
            const msg=result.msg
            dispatch(showError(msg))
        }
    }
}