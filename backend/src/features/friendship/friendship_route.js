import express from "express"
const friendshipRouter = express.Router()
import FriendshipController from "./friendship_controller.js"
const friendshipController = new FriendshipController()


friendshipRouter.get('/get-friend-list', (req, res, next) => friendshipController.getFriendList(req, res, next))
friendshipRouter.get('/get-friend-req-list', (req, res, next) => friendshipController.getFriendReq(req, res, next))

friendshipRouter.put('/toggle-request/:friendId', (req, res, next) => friendshipController.toggleReq(req, res, next))
friendshipRouter.put('/respond', (req, res, next) => friendshipController.respond(req, res, next))
friendshipRouter.delete('/unfriend/:id', (req, res, next) => friendshipController.unfriend(req, res, next))



export default friendshipRouter
