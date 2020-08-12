import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

import {withRouter} from 'react-router-dom'
import {formateDate} from '../../utils/dateUtils'
import { Modal } from 'antd';
import {reqWeather} from '../../api'
import './index.css'
import menuList from '../../config/menuConfig'
import LinkButton from '../link-button'
 class Header extends Component {

    state={
        currentTime:formateDate(Date.now()),
        dayPictureUrl:'',
        weather:''
    }

    logout=()=>{
        Modal.confirm(
            {
                title: '确认退出吗?',
                
                onOk:()=> {
                  console.log('OK');
                  storageUtils.removeUser()
                  memoryUtils.user={}
                    this.props.history.replace('/login')
                },
                onCancel() {
                  console.log('Cancel');
                },
              }
        )
    }

        getTitle=()=>{
            let title=''
            const path= this.props.location.pathname
            menuList.forEach(item=>{
                if(item.key===path){
                    title=item.title
                }else if(item.children){
                    const cItem=item.children.find(cItem=>cItem.key===path)
                    if(cItem){
                        title=cItem.title
                    }
                }
            })
            return title
        }
        getWeather=async()=>{
            const {dayPictureUrl,weather}=await reqWeather('哈尔滨')
            this.setState({dayPictureUrl,weather})
        }

        componentDidMount(){
         this.intervalId= setInterval(()=>{
               this.setState({
                   currentTime:formateDate(Date.now())
               })
           },1000)
           this.getWeather()
        }
        componentWillMount(){
            clearInterval(this.intervalId)
        }
    render() {

        const {currentTime,dayPictureUrl,weather}=this.state
        const user=memoryUtils.user
        const title=this.getTitle()


        return (
            <div className='header'>
                <div className="header-top">
                    欢迎,{user.username} &nbsp;&nbsp;
                    <LinkButton href="#" onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-botton">
                    <div className='header-botton-left'>{title}</div>
                    <div className='header-botton-right'>
                        <span>{currentTime}</span>&nbsp;&nbsp;
                        <img src={dayPictureUrl} alt="weather"/>&nbsp;&nbsp;
                        <span>{weather}</span>
                    </div>
                     
                </div>
            </div>
        )
    }
}
export default withRouter(Header)