const express=require('express');
const app=express();
const http=require('http');
const server=http.createServer(app);
const {Server}=require('socket.io');
const io=new Server(server,{cors:true});

const userList=[]

app.use(express.static('./dist'))

app.get('/ispass',(req,res)=>{
    const {username}=req.query
    let ispass=true
    userList.forEach(item=>{
        if(item==username){
            ispass=false
        }
    })
    res.send(ispass)
})

io.on('connection',(socket)=>{
    console.log('a user connected');

    socket.on('CtoS-username',(username)=>{
        socket.username=username
        userList.push(username)
        io.emit('StoC-userList',userList)
    })

    socket.on('sendmessage',(sendmessage)=>{
        io.emit('getmessage',{username:socket.username,message:sendmessage})
    })

    socket.on("disconnect", (reason) => {
        let deleteIndex=-1
        for(let i=0;i<userList.length;i++){
            if(userList[i]==socket.username){
                deleteIndex=i
            }
        }
        userList.splice(deleteIndex,1)      
        })
})

server.listen(3000,()=>{
    console.log('listen on 3000 port');
})