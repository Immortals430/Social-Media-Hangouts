import 'dotenv/config'
import express from "express";
import { Server } from "socket.io";
import http from "http";
import { User } from "./user_schema.js";
import mongoose from 'mongoose';
import { Chat } from './chat_Schema.js';



const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
      origin: '*',
      methods: ["GET", "POST"]
  }
});
let users = {
  //userid = socketid
}
  

io.on('connection', socket => {
  socket.on("connected", (id) => {
    // set online
    users[id] = socket.id

    // emit online users
    io.emit('online-users', Object.keys(users))
  })



  socket.on('msg', async (data) => { 
    const userSocketId = users[data.user]
    const loggedUser = await User.findById(data.loggedUser)
    const user = await User.findById(data.user)
    const chatId = loggedUser.chats.find((value) => value.recepient == data.user) //

    // save msg in db if user is offline
    if(chatId){
      const chats = await Chat.findById(chatId.chatId)
      chats.chats.push({
        messenger: data.loggedUser,
        msg: data.msg 
      })
      chats.save()
    }
    else{
        const chats = await Chat.create({
        chats: [{
          messenger: data.loggedUser,
          msg: data.msg 
        }]
      })
      loggedUser.chats.push({
        recepient: data.user,
        chatId: chats._id
      })
      user.chats.push({
        recepient: data.loggedUser,
        chatId: chats._id
      })
      user.save()
      loggedUser.save()
    }

    // emit msg when user is online
    if(userSocketId){
      io.to(userSocketId).emit("new-msg", {messenger: data.loggedUser, msg: data.msg});
    }
  });


  socket.on('disconnect', (data) => {
    Object.keys(users).forEach((key) => {
      if(users[key] === socket.id){
        delete users[key]
        io.emit('online-users', Object.keys(users))
      }
    })
  });
});


mongoose.connect(process.env.DB);
server.listen(process.env.SOCKET_PORT, () => {
  console.log(`Ready to chat at port: ${process.env.SOCKET_PORT}`);
});
