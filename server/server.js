const express=require('express')
const cors=require('cors')
const { Server } = require('socket.io')
const {createServer}=require('http')
const app=express()

const server=createServer(app)
const io=new Server(server,{
    cors:{
        origin:"*"
    }
})

app.use(cors())

app.get("/",(req,res)=>{
    res.send("<h1>Hello World</h1>")
})

io.on('connection',(socket)=>{
    console.log(`connected with ${socket.id}`)
    socket.on("disconnect",()=>console.log("disconnected"))
    socket.on("message",({message,receiverSocketId})=>{
        socket.to(receiverSocketId).emit("message",message)
    })
})

server.listen(80,()=>{
    console.log('server is running at 80')
})
