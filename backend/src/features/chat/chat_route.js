import express from "express";
export const chatRouter = express.Router();
import ChatController from "./chat_controller.js";
const chatController = new ChatController()

chatRouter.get("/get-chats/", (req, res, next) => chatController.getAllChat(req, res, next));
chatRouter.put("/update-read/:friendId", (req, res, next) => chatController.updateRead(req, res, next))
chatRouter.get("/get-chat-list", (req, res, next) => chatController.getChatList(req, res, next))