import express from "express"
export const postRouter = express.Router()
import { getPost, addPost, deletePost } from "../controller/post_controller.js"
import { uploadPost } from "../../config/multer.js"
import multer from "multer"
const upload = multer()


postRouter.get('/get-post', getPost)
postRouter.post('/add-post', upload.single('image'), addPost) 
postRouter.delete('/delete-post/:postId', deletePost)


