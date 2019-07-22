import React, { Component } from 'react';
import {  Input} from 'antd';
import  "./chat.css";
import { connect } from "react-redux";
import {  Avatar } from 'antd';
import { sendMsg,getMsgList,receiveMsg,readMsg} from "./../../redux/chat.redux";
import { getChatId } from "./../../util";
const Search = Input.Search;
@connect(
  state=>state,
  {sendMsg,getMsgList,receiveMsg,readMsg}
)

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state={
            text:'',
            msg:[]
        }
    }
    componentDidMount() {
        if(!this.props.chat.chatmsg.length){
        this.props.getMsgList()
        this.props.receiveMsg()

        }


    } 
   componentWillUnmount() {
    const from=this.props.match.params.user
    this.props.readMsg(from)
   }
   
    
     
    handleSumit()
    {
     
     
    
     const from=this.props.user._id
     const to=this.props.match.params.user
     const msg=this.state.text
     this.props.sendMsg({from,to,msg})
     this.setState({
                text:''
            })
    
    
     
    }
    render() {
       const users=this.props.chat.users
       
        const user=this.props.match.params.user
        if(!users[user])
        {
            return null;
        }
      const mychatid=getChatId(user,this.props.user._id)  
      const chatmsgs=this.props.chat.chatmsg.filter(v=>v.chatid==mychatid)
        
        return (
           <div>
            <div className='chat-wrap'>
             <div className='chat-item'>
             {users[user].name}
            </div>
            <div className='chat-item-2'>
           {
        
chatmsgs.map(v=>{
  return  v.from==user?(
    <div className='msg-wrap'>
    <div className='msg-ava'>
    <Avatar src={users[v.from].avatar}/>
    </div>
    <div className='msg-con'>
   {v.content}
    </div>
 </div>
  ):(
    <div className='msg-wrap'>
    <div className='msg-ava right'>
    <Avatar src={users[v.from].avatar}/>
    </div>
    <div className='msg-con right'>
   {v.content}
    </div>
 </div>
  )
})



        
        }
            </div>
            <div   className='btn-send'>
               <Search
      enterButton="发送"
      onChange={(v)=>{this.setState({text:v.target.value})}}
      onSearch={()=>this.handleSumit()}
      style={{width:500}}
      value={this.state.text}
    
    />  
 </div>  
        </div>        
        </div>
        );
    }
}

export default Chat;