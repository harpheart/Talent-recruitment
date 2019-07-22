import React, { Component } from 'react';
import { connect } from "react-redux";
import { Avatar } from 'antd';
import { Redirect } from "react-router-dom";


@connect(
    state=>state.user,
    {}
)

class Myhome extends Component {
    constructor(props) {
        super(props);
        this.state={}
    } 
    
    render() {
      const mydata=[
       
          {data:this.props.company},
          {data:this.props.title},
          {data:this.props.money},

      ]
      const mykeyboss=['公司：','招聘岗位：','岗位薪资：']
     
        
        return (
            this.props.user?
            <div style={{width:'960px',margin:'50px auto 0 auto'}}>

           
      <Avatar size={150} shape="square" icon="user" style={{float:'left'}} src={this.props.avatar}/>
              <div style={{float:'left',margin:'30px 0 0 50px'}}>
              <div style={{fontSize:25}}>
              <h2>{this.props.user}</h2>
              </div>
        {console.log(this.props)
        }  

        {this.props.type==='boss'?
                   mydata.map((v,key)=>{
                       return <div key={key} style={{width:500,fontSize:'18px',fontWeight:550,margin:'50px 0 0 0',borderBottom:'1px solid rgb(232,232,232)'}}>{mykeyboss[key]+v.data}</div>
                       
                }):this.props.type==='seeker'? mydata.map((v,key)=>{
                    return v.data?<div key={key} style={{width:500,fontSize:'18px',fontWeight:550,margin:'50px 0 0 0',borderBottom:'1px solid rgb(232,232,232)'}}>{'求职岗位：'+v.data}</div>:null
                    
             }):null
        }
        {
           this.props.type==='boss'?<div style={{margin:'50px 0 0 0',width:500,minHeight: 300,border:'1px solid rgb(232,232,232)', padding: 10, borderRadius:20}}><div style={{float:'left',fontSize:'18px',fontWeight:550,}}>岗位要求：</div><div style={{float:'left',fontSize:'18px',fontWeight:550,whiteSpace: 'pre-wrap'}}>
                                     {this.props.desc}   
                                   </div></div>:
             this.props.type==='seeker'?<div style={{margin:'50px 0 0 0',width:500,minHeight: 300,border:'1px solid rgb(232,232,232)', padding: 10, borderRadius:20}}><div style={{float:'left',fontSize:'18px',fontWeight:550,}}>个人简历：</div><div style={{float:'left',fontSize:'18px',fontWeight:550,whiteSpace: 'pre-wrap'}}>
             {this.props.desc}   
           </div></div>:null
        }

            
              </div>

            </div>:<Redirect to='/login' />
        );
    }
}

export default Myhome;