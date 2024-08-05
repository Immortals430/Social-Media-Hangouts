import { ApplicationError } from "../../middlewares/error_handler.js";
import { Comment } from "./comment_schema.js";
import { Post } from "../post/post_schema.js";

export class CommentRepository {

  async getComments(skip, limit, postId){
    return await Comment.find({ post: postId })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)
    .populate('user')
  }

  async createComment(content, postId, userId) {
    const post = await Post.findById(postId);
    if (!post) {
      throw new ApplicationError("No post found", 404);
    }

    const comment = await Comment.create({
      content,
      user: userId,
      post: postId,
    });
    await comment.populate('user')
    return comment;
  }

  async deleteComment(commentId, userId){
    const comment = await Comment.findById(commentId)
    if(!comment){
      throw new ApplicationError("No comment found", 404)
    }
    if(comment.user == userId){
      await comment.deleteOne()
    }
    else{
      throw new ApplicationError("User not authorize to delete comment", 401)
    }

  }
}
