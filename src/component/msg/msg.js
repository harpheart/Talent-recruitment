import React, { Component } from 'react';
import { connect } from "react-redux";
import { List, Avatar,Badge } from 'antd';
@connect(
    state=>state,
    null
)
class Msg extends Component {

    getLastMsg(arr)
    {
        return arr[arr.length]
    }
    render() {
        if(!this.props.chat.chatmsg.length)
        {
            return null
        }
        
        const msgGroup={}
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid]=msgGroup[v.chatid]||[]
            msgGroup[v.chatid].push(v)
            
        });
 
        const chatlist=Object.values(msgGroup).sort( (a,b)=> {
            return b[b.length-1].create_time-a[a.length-1].create_time
            
        })
        const userid=this.props.user._id
        console.log('chatlis',chatlist);
        
        
        return (
            <div style={{width:700,margin:'10px auto 0 auto',cursor: 'pointer'}}>
                 <List
             
    itemLayout="horizontal"
    dataSource={chatlist}
    
    renderItem={(v) => {
  
        const unreadnumber=v.filter(v=>!v.read&&v.to==userid)
        const targetid=userid==v[v.length-1].from?v[v.length-1].to:v[v.length-1].from
        if(!this.props.chat.users[targetid].name)
        {
            return null;
        }
        return(
            <div style={{ border: '1px solid rgb(232, 232, 232)',margin:'10px 0 0 0',padding: '10px 15px 5px 15px', borderRadius:'5px' }}>
      <List.Item actions={ [<Badge count={unreadnumber.length} />]}
       onClick={()=>{this.props.history.push(`/chat/${targetid}`)}}   
      >
        <List.Item.Meta
          avatar={<Avatar src={this.props.chat.users[targetid].avatar}/>}
          title={this.props.chat.users[targetid].name}
          description={v[v.length-1].content}
        />
      </List.Item>
      </div>
    )}}
  />
            </div>
        );
    }
}

export default Msg;