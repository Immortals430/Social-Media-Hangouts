import express from "express"
const likeRouter = express.Router()
import LikeController from "./like_controller.js"
const likeController = new LikeController()



likeRouter.get('/toggle/:postId', (req, res, next) => likeController.toggle(req, res, next))


export default likeRouter