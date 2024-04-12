import express from "express"
export const commentRouter = express.Router()
import {createComment, deleteComment} from '../controller/comment_controller.js'


commentRouter.post('/create/:postId', createComment)
commentRouter.delete('/delete/:commentId', deleteComment)



