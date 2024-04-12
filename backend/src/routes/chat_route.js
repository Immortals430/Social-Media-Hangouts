import express from "express"
export const chatRouter = express.Router()
import { getAllChat } from "../controller/chat_controller.js"


chatRouter.get('/get-all-chat/:friendId', getAllChat)



