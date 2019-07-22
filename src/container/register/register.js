import React, { Component } from 'react';
import Logo from "./../../component/logo/logo.js";
import "./register.css";
import {
    Form, Icon, Input, Button, Radio
  } from 'antd';
import { connect } from "react-redux";
import { register} from "./../../redux/user.redux";
import { Redirect } from "react-router-dom";
const RadioGroup = Radio.Group;
@connect(
    state=>state.user,
    {register}
)
class Register extends Component {
    constructor(props) {
        super(props);
        this.state=
        {
           
            user:'',
            pwd:'',
            type:'seeker',
            repeatpwd:''
        }
      this.onChange=this.onChange.bind(this);  
      this.handleRegister=this.handleRegister.bind(this);
    }
    onChange(e){
        console.log('radio checked', e.target.value);
        this.setState({
            type: e.target.value
        });
      }
    handleChange(key,value)
    {
      this.setState({
          [key]:value
      })  
    }
    handleRegister()
    {
        
        console.log(this.state);
        
        this.props.register(this.state);
       
    }
    render() {
        return (
            <div>
              {this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
            <Logo></Logo>
            <Form  className="register-form">
        <Form.Item>
          {(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名"
            onChange={v=>this.handleChange('user',v.target.value)}
            />
          )}
        </Form.Item>
        <Form.Item>
          {(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码"
            onChange={v=>this.handleChange('pwd',v.target.value)}
            />
          )}
        </Form.Item>
        <Form.Item>
          {(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="确认密码"
            onChange={v=>this.handleChange('repeatpwd',v.target.value)}
            />
          )}
        </Form.Item>
        
        <Form.Item>
          {(     

                  <RadioGroup onChange={this.onChange} value={this.state.type} >
                  <Radio value={"seeker"}>求职者</Radio>
                  <Radio value={"boss"}>老板</Radio>
                </RadioGroup>
               
          )}
        </Form.Item>
      

        <Form.Item>
            {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
         
          <Button type="primary" htmlType="submit" className="register-form-button" onClick={this.handleRegister}>
            注册
          </Button>
          已有账号？ <a href="/login">直接登录</a>
        </Form.Item>
      </Form>
            </div>
        );
    }
}

export default Register;