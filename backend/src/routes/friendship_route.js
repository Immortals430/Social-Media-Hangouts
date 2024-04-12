import express from "express"
export const friendshipRouter = express.Router()
import { toggleReq, respond, unfriend } from "../controller/friendship_controller.js"


friendshipRouter.put('/toggle-request', toggleReq)
friendshipRouter.put('/respond', respond)
friendshipRouter.delete('/unfriend/:id', unfriend)




