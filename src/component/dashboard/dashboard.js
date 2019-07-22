import React, { Component } from 'react';
import { Switch,Route } from "react-router-dom";
import Header from "./../header/header";
import { connect } from "react-redux";
import Boss from "./../boss/boss";
import Seeker from "./../seeker/seeker";
import Myhome from "./../myhome/myhome";
import Msg from "./../msg/msg";
import { Redirect } from "react-router-dom";
import { getMsgList,receiveMsg } from "./../../redux/chat.redux";
@connect(
    state=>state,
    {getMsgList,receiveMsg}  
)
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'mail',
          }
    }
    componentDidMount() {
        
            this.props.getMsgList()
            this.props.receiveMsg()
            
    }
    
    render() {
        const user=this.props.user.user;
        const navList=[{
            path:'/boss',
            title:'企业首页',
            component:Boss,
            hide:user.type=='seeker'
        },{
            path:'/seeker',
            title:'求职者首页',
            component:Seeker,
            hide:user.type=='boss'
        },{
            path:'/myhome',
            title:'个人中心',
            component:Myhome,
        },{
            path:'/message',
            title:'消息',
            component:Msg,
        }]
        return (
            <div>
            {this.props.user.redirectTo?<Redirect to={this.props.user.redirectTo} />:null}

            <Header navList={navList} pathname={this.props.location.pathname} type={this.props.user.type} img={this.props.user.avatar}></Header>
            <Switch>
            {
                navList.map(v=>{
                    return <Route path={v.path} component={v.component} key={v.path}></Route>
                })
            }

            </Switch>
           
          
            </div>
        );
    }
}

export default Dashboard;