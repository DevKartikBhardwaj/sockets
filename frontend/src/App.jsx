import React, { useEffect,useState,useMemo } from "react";
import { io } from "socket.io-client";
const App = () => {
  const socket = useMemo(()=>io("http://localhost"),[]);
  const [message,setMessage]=useState('')
  const [receiverSocketId,setReceiverSocketId]=useState('')

  const handleSubmit=(e)=>{
    e.preventDefault();
    socket.emit('message',{message,receiverSocketId})
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected ", socket.id);
    });
    socket.on("message", (msg) => {
      console.log(msg);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="socket id" value={receiverSocketId} onChange={(e)=>setReceiverSocketId(e.target.value)}/>
        <br />
        <input type="text" placeholder="message" value={message} onChange={(e)=>setMessage(e.target.value)}/>
        <br />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default App;
