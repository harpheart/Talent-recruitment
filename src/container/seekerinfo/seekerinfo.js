
import React, { Component} from 'react';
import UpLoad from "./../bossinfo/upload";
import './../bossinfo/up.css';
import {
    Form, Input, Button,
  } from 'antd';
import {connect} from "react-redux";
import { updata } from "./../../redux/user.redux";
import { Redirect} from "react-router-dom";
const { TextArea } = Input;
@connect(
  state=>state.user,
  {updata}
)
  

class SeekerInfo extends Component {
    constructor() {
      super()
      this.state = { 
          avatar:'',
          title:'',
          desc:''
        }
    }
  
    handleChange(key,value)
    {
      this.setState({
          [key]:value
      })  
    }
    render() {
        
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24},
              sm: { span: 16 },
            },
          };
          const path=this.props.location.pathname;
      return (
        
          <div className="drop">
         <div className="upload-up">
         {this.props.redirectTo&&path!==this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
         <UpLoad 
        myAvatar={(e)=>{
          this.setState({avatar:e})}}
         ></UpLoad> 
         </div>

            <Form {...formItemLayout} className="bossinfo-form" >     
        <Form.Item  label="求职岗位">               
            <Input  onChange={v=>this.handleChange('title',v.target.value)}/>         
        </Form.Item>

     <Form.Item  label="个人简介">
         
     <TextArea autosize={{ minRows: 4, maxRows: 8 }}   onChange={v=>this.handleChange('desc',v.target.value)}/>
 
       
     </Form.Item>
      </Form>
     
       <div>
       {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
       <Button type="primary" htmlType="submit" className="bossinfo-form-button" style={{width: '200px'}} 
       onClick={()=>{this.props.updata(this.state)}}
       >
         提交
       </Button>

       </div>
          </div>
         
          
        
      
      );
    }
  }
  export default SeekerInfo;


