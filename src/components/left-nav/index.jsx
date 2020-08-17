import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import './index.css'
import logo from'../../asstes/images/logo.png'
import menuList from '../../config/menuConfig'
import { Menu } from 'antd';

import {
 
  MailOutlined,
  HomeFilled
  
} from '@ant-design/icons';
import memoryUtils from '../../utils/memoryUtils'

const { SubMenu } = Menu;




 class LeftNav extends Component {

    hasAuth=(item)=>{
        const user=memoryUtils.user
        const menus=user.role.menus
        if(user.username==='admin'||item.public||menus.indexOf(item.key)!==-1){
            return true
        }else if(item.children){
            const cItem=item.children.find(cItem=>menus.indexOf(cItem.key)!==-1)
            return !!cItem
        }


        return false
    }
   

    getMenuNodes2=(menuList)=>{

        const path=this.props.location.pathname
        return menuList.reduce((pre,item)=>{
            if(this.hasAuth(item)){
                 if(!item.children){
                pre.push(
                    <Menu.Item key={item.key}
         
                icon={<HomeFilled />}>
                     <Link to={item.key}>
                    <span>{item.title} </span>
                </Link>
                
                  
                </Menu.Item>
                )
            }else{
               const cItem= item.children.find(cItem=>path.indexOf(cItem.key)===0)
               if(cItem){
                   this.openKey=item.key
               }
                pre.push(
                    <SubMenu key={item.key}
                icon={<MailOutlined />} 
                title={item.title}>

               {
                  this.getMenuNodes2(item.children)
               }
                  
                </SubMenu>
                )
            }
            }

           
            return pre
        },[])


    }



    // getMenuNodes=(menuList)=>{
    //     return menuList.map((item)=>{
    //         if(!item.children){
    //             return (<Menu.Item key={item.key}
         
    //             icon={<HomeFilled />}>
    //                  <Link to={item.key}>
    //                 <span>{item.title} </span>
    //             </Link>
                
                  
    //             </Menu.Item>)
    //         }else{
    //             return<SubMenu key={item.key}
    //             icon={<MailOutlined />} 
    //             title={item.title}>

    //            {
    //               this.getMenuNodes(item.children)
    //            }
                  
    //             </SubMenu> 
    //         }
    //     })
    // }
        componentDidMount(){


        }
        componentWillMount(){
             this.menuNodes=this.getMenuNodes2(menuList)
        }
    
    render() {
       
       let selectKey=this.props.location.pathname
       if(selectKey.indexOf('/product')===0){
           selectKey='/product'
       }
        return (
            <div className="left-nav">
               <Link className='left-nav-link' to='/home'>
               <img src={logo} alt="logo"/>
               <h1>硅谷后台</h1>
               </Link>

    <Menu
          selectedKeys={[selectKey]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
       
        >
            {
             this.menuNodes
            }
          {/* <Menu.Item key="/home" 
         
          icon={<HomeFilled />}>
               <Link to='/home'>
              <span>首页 </span>
          </Link>
          
            
          </Menu.Item>
          
          <SubMenu key="/products" icon={<MailOutlined />} title="商品">

          <Menu.Item key="/category" 
         
         icon={<HomeFilled />}>
              <Link to='/category'>
             <span>品类管理 </span>
         </Link>
         
           
         </Menu.Item>
         <Menu.Item key="/product" 
         
         icon={<HomeFilled />}>
              <Link to='/product'>
             <span>商品管理 </span>
         </Link>
         
           
         </Menu.Item>
            
          </SubMenu> */}
          
        </Menu>


            </div>
        )
    }
}
export default withRouter(LeftNav)
