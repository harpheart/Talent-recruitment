const express=require('express');
const userRouter=require('./user.js')
const untils=require('utility')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const model=require('./model.js')
const Chat=model.getModel('chat')
const app=express();
const server=require('http').Server(app)
const io=require('socket.io')(server)

io.on('connection',function(socket){
    console.log('user login');
    socket.on('sendmsg',function(data){
        
        const {from,to,msg}=data
        const chatid=[from,to].sort().join('_')
        const time=new Date().getTime()
        Chat.create({chatid,from,to,content:msg,create_time:time},function(err,doc){
           
            
            io.emit('receivemag',Object.assign({},doc._doc))
         
        })
        
        
    })
})





app.use(bodyParser.json());
app.use(cookieParser());
app.use('/user',userRouter);







server.listen(9093,function() {
    console.log('node app start at port 9093');
})
