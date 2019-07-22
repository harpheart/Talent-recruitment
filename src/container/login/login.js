import React, { Component } from 'react';
import Logo from "./../../component/logo/logo.js";
import {
    Form, Icon, Input, Button, Checkbox
  } from 'antd';
import  "./login.css";
import { connect } from "react-redux";
import { login } from "./../../redux/user.redux";
import { Redirect } from "react-router-dom";
// import myform from "./../../component/myform/myform";
@connect(
  state=>state.user,
  {login}
)
class Login extends Component {
     constructor(props) {
         super(props);
         this.state={
           user:'',
           pwd:''
         }
         this.handleLogin=this.handleLogin.bind(this);
     }

     handleChange(key,value)
     {
     
       this.setState({
           [key]:value
       })  
     }
     handleLogin()
     {
         
        
         
         
         this.props.login(this.state);
        
     }
    render() {
    
        return (
            <div>
            <Logo></Logo>
            {this.props.redirectTo&&this.props.redirectTo!='/login'?<Redirect to={this.props.redirectTo} />:null}
           
            <Form  className="login-form">
        <Form.Item>
          {(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" 
            onChange={v=>this.handleChange('user',v.target.value)}
            />
          )}
        </Form.Item>
        <Form.Item>
          {(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}  />} type="password" placeholder="请输入密码" 
            onChange={v=>this.handleChange('pwd',v.target.value)}
            />
          )}
        </Form.Item>
        <Form.Item>
          {(
            <Checkbox>记住我</Checkbox>
          )}
          <a className="login-form-forgot" href="">忘记密码？</a>
          {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
          <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleLogin}>
            登录
          </Button>
          没有账号？ <a href="/register">立即注册</a>
        </Form.Item>
      </Form>



        
            </div>
        );
    }
}

export default Login;