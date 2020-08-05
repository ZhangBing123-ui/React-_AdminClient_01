import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import logo from './images/logo.png'
import './login.css'



class Login extends Component {
    
  
        handleSubmit = (e) => {
          
          e.preventDefault()
          
          
  
        };
        //对密码进行自定义检查
        validatePwd=(rule,value)=>{
          value=value.trim()
            if(!value){
              return Promise.reject("密码必须输入")
            }else if(value.length<4){
              return Promise.reject("密码不能小于四位")
            }else if(value.length>12){
              return Promise.reject("密码不能大于12位")
            }else if(!/^[a-zA-Z0-9]+$/.test(value)){
              return Promise.reject("密码必须是英文 数字或者下划线")
            }else{
              return Promise.resolve()
            }

        }
    
    render(){
     
        return (
            <div className="login">
                <div className='login-header'>
                    <img src={logo} alt="logo"/>
                    <h1>React项目:后台管理系统</h1>
                    
                </div>
                <div className="login-content">
                    <h1>用户登录</h1>

                    <Form className="login-form" 
                    onSubmitCapture={this.handleSubmit}
                    form={this.form}>
      <Form.Item
         name="username"
         initialValue=''
         rules={[{ required: true,whitespace:true,message: '用户名是必须的!' },
              {min:4,message:"用户名不能小于4位"},
              {max:12,message:"用户名不能大于12位"},
              {pattern:/^[a-zA-Z0-9]+$/,message:"用户名必须是英文 数字或下划线组成"},
          ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" style={{color:'rgba(0,0,0,.25)'}} /> }
        type="user"
         placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        initialValue=''
        rules={[
          {
           validator:this.validatePwd
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" style={{color:'rgba(0,0,0,.25)'}}/>}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
            登录
        </Button>
     
      </Form.Item>
    </Form>
                   
                </div>
            </div>
        );
    }
}


export default Login;