import React, { Component } from 'react';
import { Menu ,Avatar, Popover,Icon ,Badge } from 'antd';
import  "./header.css";
import { withRouter } from "react-router-dom";
import Content from "./content";
import { connect } from "react-redux";
@withRouter
@connect(
  state=>state.chat,
  null
)
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '',
          }
          
    }

    handleClick = (e) => {
       
        this.setState({
          current: e.key,
        });

        if(this.props.type==='seeker'&&e.key==='/header')
        {
          this.props.history.push('/seeker');
        }else if(this.props.type==='boss'&&e.key==='/header')
        {
          this.props.history.push('/boss');
        }else
        {
          this.props.history.push(e.key);
        }
        

      }
      componentDidMount() {
        if(this.props.pathname==='/seeker'||this.props.pathname==='/boss'){
        this.setState({current:'/header'})
 
        
      }else
      {
        this.setState({current:this.props.pathname})
      
        
      }
      }
      
    render() {
      const navlist=this.props.navList.filter(v=>v.hide==true)
      console.log('une',this.props);
      var unr=0
      this.props.unread?unr=this.props.unread:unr=0
        return (
            <div>
      {this.props.pathname==='/boss'||'/seeker'||'/myhome'?
               <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        className='menu-top'
      >
  
        <Menu.Item key="/header" className='menu-item' >
        
          <Icon type="home" style={{fontSize:20,marginLeft:8}}/>
        
        {'首页'}
        </Menu.Item>
        <Menu.Item key="/myhome" className='menu-item' >
        <Icon type="user" style={{fontSize:20,marginLeft:8}}/>
        {'个人中心'}
        </Menu.Item>
        <Menu.Item key="/message" className='menu-item'>

        <Badge count={unr}>
        <Icon type="message" style={{fontSize:20,marginLeft:8}}/>
       
        </Badge>
        {'消息'}
        </Menu.Item>
              </Menu>:<div>not found!</div> }
           
         <Popover content={<Content  />} >
        <Avatar icon="user" className='header-avatar' src={this.props.img} />
        </Popover> 
            </div>
        );
    }
}

export default Header;