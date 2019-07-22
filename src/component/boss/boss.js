import React, { Component } from 'react';
import { getUserList } from "./../../redux/chat.user.redux";
import { Card,Avatar,Button } from 'antd';
import { connect } from "react-redux";
const {Meta}=Card;
@connect(
    state=>state.chatuser,
    { getUserList}
)


class Boss extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:[]
        }
    }
    
    componentDidMount() {
        this.props.getUserList('seeker')
    }
    handleclick(id)
    {
      this.props.history.push(`/chat/${id}`)
    }
    render() {
        const mydata=this.props.userlist
        console.log('chat',this.props);
        
        return (


            <div style={{width: '700px',margin:'0 auto 0 auto'}}>
 
           
            {
                mydata.map(v=>{
                    
                    return (

                        v.title&&v.desc?<Card
                        style={{ width: '700px' }}
                        key={v._id}
                        title={                        <Meta
                            avatar={<Avatar src={v.avatar} />}
                            extra={v.title}
                            title={v.user}
                           
                          />}
                          extra={v.title}
                          style={{marginBottom:'10px',marginTop:'10px' }}
                      >
                        
                         <div style={{wordBreak:'break-all',whiteSpace: 'pre-wrap', marginBottom:'0', marginTop:'5px',minHeight: 80 }}>
                          {
                              v.desc
                          }
                         </div>
                         <Button type="primary" style={{fontSize:'18px',position:'absolute',top:100,right:24}} 
                         onClick={()=>this.handleclick(v._id)}
                         >私聊</Button>
                      </Card>:null


                    )
                    
                })
            }

            </div>
        );
    }
}

export default Boss;