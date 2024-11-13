import express from "express";
const commentRouter = express.Router();
import CommentController from "./comment_controller.js";
const commentController = new CommentController()

commentRouter.get("/get", (req, res, next) => commentController.getComments(req, res, next));

commentRouter.post("/create/:postId", (req, res, next) => commentController.createComment(req, res, next));
commentRouter.delete("/delete/:commentId", (req, res, next) => commentController.deleteComment(req, res, next));

export default commentRouter