const express=require('express');
const Router=express.Router();
const model=require('./model.js')
const User=model.getModel('user')
const Chat=model.getModel('chat')
const utils=require('utility')
const fs=require("fs");
Router.get('/list',function (req,res) {
    res.header("Access-Control-Allow-Origin", "*");
    // User.remove({},function (err,doc) {
    //     if(err)
    //     {
    //         return err
    //     }
        
        
        
    // })
    // const {type}=req.query
    // User.find({type},function (err,doc) {
    //     if(err)
    //     {return err}
    //     return res.json({code:0,data:doc})
        
    // })
    fs.readFile("../mydata/list.json",function (err,mdata) {
        if(err){
            return console.log(err);
        }else {
                  //toString() 将buffer格式转化为中文
                  return res.json({code:0,data:mdata.toString()})
        }
    })
   
       

    
})

Router.get('/listxq',function (req,res) {
    res.header("Access-Control-Allow-Origin", "*");
    fs.readFile("../mydata/listxq.json",function (err,mdata) {
        if(err){
            return console.log(err);
        }else {
                  //toString() 将buffer格式转化为中文
                  return res.json({code:0,data:mdata.toString()})
        }
    })
   
       

    
})
Router.get('/listss',function (req,res) {
    res.header("Access-Control-Allow-Origin", "*");
    fs.readFile("../mydata/listss.json",function (err,mdata) {
        if(err){
            return console.log(err);
        }else {
                  //toString() 将buffer格式转化为中文
                  return res.json({code:0,data:mdata.toString()})
        }
    })
   
       

    
})
Router.get('/getmsglist',function (req,res) {

    const user=req.cookies.userid
   
    
    User.find({},function(err,doc){
     let users={}
        doc.forEach(v => {
            users[v._id]={name:v.user,avatar:v.avatar}
        })
        Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
            if(err)
            {
                return err
            }
          
           
                    
            return res.json({code:0,data:doc,users:users})
        })
    })

    
})
Router.post('/readmsg',function (req,res) {
    const userid=req.cookies.userid
    const {from}=req.body
    console.log('from',from)
    console.log('userid',userid)
    Chat.update({from,to:userid},{'$set':{read:true}},{'multi':true},function(err,doc){
if(!err)
{
    return res.json({code:0,num:doc.nModified})
}
return res.json({code:1,msg:'修改失败'})
    })

    
})
Router.post('/image',function (req,res) {
    const userid=req.cookies.userid
    if(!userid)
    {
        return JSON.dumps({code:1})
    }
    const body=req.body
   console.log('lianjie')
    return res.json({code:0})

    
})
Router.post('/updata',function (req,res) {
    const userid=req.cookies.userid
    if(!userid)
    {
        return JSON.dumps({code:1})
    }
    const body=req.body
   
    
    User.findByIdAndUpdate(userid,body,function (err,doc) {
     const data=Object.assign({},{
     user:doc.user,
     type:doc.type
     },body)
      return res.json({code:0,data})  
    })

    
})
Router.post('/login',function (req,res) {
    
    
    const {user,pwd}=req.body
    User.findOne({user:user,pwd:md5pwd(pwd)},{pwd:0},function (err,doc) {
        if(err)
        {return err}
        if(!doc)
        {
            return res.json({code:1,msg:'用户名不存在或密码错误'})
        }
      
       
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
        

        
    })
    
})
Router.post('/register',function (req,res) {
   
    
    const {user,pwd,type}=req.body
    User.findOne({user:user},function (err,doc) {
        if(err)
        {return err}
        if(doc)
        {
            return res.json({code:1,msg:'用户名已存在'})
        }
        const userModel=new User({user,type,pwd:md5pwd(pwd)})
        
        userModel.save(function (err,doc) {
            if(err)
            {return err}
            const {user,type,_id}=doc
            res.cookie('userid',_id)
            return res.json({code:0,data:{user,type,_id}})
        })
    })

    
})
Router.get('/info',function (req,res) {
    const {userid}=req.cookies
    if(!userid)
    {
        return res.json({code:1}) 
    }
    User.findOne({_id:userid},{pwd:0,__v: 0},function (err,doc) {
        if(err)
        {
            return err
        }
        if(doc)
        {
         return res.json({code:0,data:doc})
        }
        
    })
    
})
function md5pwd(pwd) {
    const salt='swdaawcjj)_swda(*&^%_@#$$%'
    return utils.md5(utils.md5(pwd+salt))
    
}
module.exports=Router;