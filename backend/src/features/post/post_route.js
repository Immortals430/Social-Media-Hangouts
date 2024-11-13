import express from "express";
import PostController from "./post_controller.js";
import multer from "multer";
const postController = new PostController()
const postRouter = express.Router();
const upload = multer();

postRouter.get("/get-post/", (req, res, next) => postController.getPost(req, res, next));
postRouter.post("/add-post", upload.single("image"), (req, res, next) =>
  postController.addPost(req, res, next)
);
postRouter.delete("/delete-post/:postId", (req, res, next) => postController.deletePost(req, res, next));

export default postRouter