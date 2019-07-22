import React, { Component } from 'react';
import { getUserList } from "./../../redux/chat.user.redux";
import { Card,Avatar,Button } from 'antd';
import { connect } from "react-redux";
const {Meta}=Card;
@connect(
    state=>state.chatuser,
    { getUserList}
)


class Seeker extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:[]
        }
    }
    
    componentDidMount() {
        this.props.getUserList('boss')
    }
    handleclick(v)
    {
      this.props.history.push(`/chat/${v._id}`)
    }
    render() {
        const mydata=this.props.userlist
        
        return (


            <div style={{width: '700px',margin:'0 auto 0 auto'}}>
 
           
            {
                mydata.map(v=>{
                    
                    return (

                    v.title&&v.desc? (<Card
                        style={{ width: '700px' }}
                        key={v._id}
                        title={                        <Meta
                            avatar={<Avatar src={v.avatar} />}
                            extra={v.title}
                            title={v.user}
                            
                          />}
                          extra={v.title}
                          style={{marginBottom:'10px',marginTop:'10px',position: 'relative' }}

                      >
                         <div style={{float:'right',color:'red',fontSize:'20px'}}>{v.money}</div>
                         <div style={{wordBreak:'break-all',whiteSpace: 'pre-wrap', marginBottom:'0', marginTop:'5px',fontSize:'16px',minHeight: 80 }}>
                          {
                              v.desc
                          }
                         </div>
                         <div style={{fontSize:'18px',position:'absolute',top:120,right:24}}>{v.company}</div>
                         <Button type="primary" style={{fontSize:'18px',position:'absolute',top:150,right:24}} 
                         onClick={()=>this.handleclick(v)}
                         >私聊</Button>
                      </Card>):null


                    )
                    
                })
            }

            </div>
        );
    }
}

export default Seeker;