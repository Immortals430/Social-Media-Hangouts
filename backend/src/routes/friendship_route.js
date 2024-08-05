import express from "express"
export const friendshipRouter = express.Router()
import { toggleReq, respond, unfriend } from "../controller/friendship_controller.js"


friendshipRouter.put('/toggle-request', (req, res) => toggleReq(req, res))
friendshipRouter.put('/respond', (req, res) => respond(req, res))
friendshipRouter.delete('/unfriend/:id', (req, res) => unfriend(req, res))




