import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import './index.css'
import logo from'../../asstes/images/logo.png'
import menuList from '../../config/menuConfig'
import { Menu, Button } from 'antd';
import {
 
  MailOutlined,
  HomeFilled
  
} from '@ant-design/icons';

const { SubMenu } = Menu;




 class LeftNav extends Component {

    getMenuNodes2=(menuList)=>{
        const path=this.props.location.pathname
        return menuList.reduce((pre,item)=>{
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
               const cItem= item.children.find(cItem=>cItem.key===path)
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

    state = {
        collapsed: false,
      };
    
      toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    }
    render() {
        const menuNodes=this.getMenuNodes2(menuList)
       const selectKey=this.props.location.pathname
        return (
            <div className="left-nav">
               <Link className='left-nav-link' to='/home'>
               <img src={logo} alt="logo"/>
               <h1>硅谷后台</h1>
               </Link>

    <Menu
          defaultSelectedKeys={[selectKey]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
            {
              menuNodes
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
