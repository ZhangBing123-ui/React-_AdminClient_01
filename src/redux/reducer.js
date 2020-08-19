import storageUtils from '../utils/storageUtils'
import {combineReducers} from 'redux'
import {SET_HEADER_TITLE,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT} from './action-types'


const initHeaderTitle='首页'
function headerTitle(state=initHeaderTitle ,action){
    switch(action.type){
      case SET_HEADER_TITLE:
            return action.data
        default:
            return state
    }
}
const initUser=storageUtils.getUser()
function user(state=initUser ,action){
    switch(action.type){
      case LOGIN_SUCCESS:
          return action.user
      case LOGOUT:
          return {}
    case LOGIN_FAIL:
        return {...state,errorMsg:action.errorMsg}
        default:
            return state
    }
}
export default combineReducers({
    headerTitle,user
})
