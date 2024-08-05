import express from "express"
export const likeRouter = express.Router()
import { toggle } from "../controller/like_controller.js"



likeRouter.get('/toggle/:postId', (req, res) => toggle(req, res))


