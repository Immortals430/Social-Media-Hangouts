import "dotenv/config";
import express from "express";
import { Server } from "socket.io";
import http from "http";
import mongoose from "mongoose";
import { Chat } from "./chats_schema.js";
import { Message } from "./message_schema.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
let users = {
  //userid = socketid
};

io.on("connection", (socket) => {
  socket.on("connected", async (id) => {
    // set online
    users[id] = socket.id;
    // emit online users
    io.emit("online-users", Object.keys(users));

    // emit unread messages if any
    const lastMessages = await Chat.find({
      users: { $in: [id] },
    }).populate("lastMessage");

    let unReadMsgs = [];

    lastMessages.forEach(({ lastMessage }) => {
      const userId = lastMessage.seenBy.find((elem) => elem == id);
      if (!userId) unReadMsgs.push(lastMessage.sender);
    });

    unReadMsgs.length > 0 ? io.emit("unread-msgs", { unReadMsgs }) : null;
  });

  socket.on("msg", async (data) => {
    const userSocketId = users[data.receiver];
    // store message in db
    const message = await Message.create({
      sender: data.sender,
      content: data.content,
      seenBy: [data.sender],
    });

    let chat = await Chat.findOne({
      users: { $all: [data.receiver, data.sender] },
    });

    if (!chat) {
      chat = await Chat.create({
        users: [data.sender, data.receiver],
      });
    }
    chat.lastMessage = message.id;
    await chat.save();

    message.chatId = chat.id;
    await message.save();

    // emit msg if user is online
    if (userSocketId) {
      io.to(userSocketId).emit("new-msg", {
        sender: data.sender,
        content: data.content,
      });
    }
  });

  socket.on("disconnect", (data) => {
    Object.keys(users).forEach((key) => {
      if (users[key] === socket.id) {
        delete users[key];
        io.emit("online-users", Object.keys(users));
      }
    });
  });
});

mongoose.connect(process.env.DB);
server.listen(process.env.SOCKET_PORT, () => {
  console.log(`Ready to chat at port: ${process.env.SOCKET_PORT}`);
});
