import React, { Component } from 'react';
import browserCookie from "browser-cookies";
import { Modal} from 'antd';
import  "./header.css";
import { logoutSubmit } from "./../../redux/user.redux";
import { connect } from "react-redux";
@connect(null,
    {logoutSubmit}
    )
class Content extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false }
    }
    
    logout=()=>
    {
        this.setState({
            visible: true,
          });


    }
  
    handleOk = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
      browserCookie.erase('userid')
      this.props.logoutSubmit()
    }
  
    handleCancel = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }
    render() {
        return (
            <div className="box-unregister" > 
            
            <div className='unregister' 
            onClick={this.logout}
            >退出登录</div>
              <Modal
          title="提示"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText={'确认'}
          cancelText={'取消'}
        >
          <p>你确定要退出登录吗？</p>
        </Modal>
            </div>
        );
    }
}

export default Content;