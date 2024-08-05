import { CommentRepository } from "./comment_repository.js";

export default class CommentController {
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  async getComments(req, res, next){
    const { page, postId } = req.query
    const limit = 5;
    const skip = (page - 1) * limit;
    try{
      const comments = await this.commentRepository.getComments(skip, limit, postId)
      return res.status(200).json(comments);
    }
    catch(err){
      next(err)
    }
  }

  async createComment(req, res, next) {
    try {
      const { content } = req.body;
      const { postId } = req.params;
      const comment = await this.commentRepository.createComment(
        content,
        postId,
        req.user.id
      );

      return res.status(200).json(comment);
    } catch (err) {
      next(err);
    }
  }

  async deleteComment(req, res, next) {
    try {
      await this.commentRepository.deleteComment(req.params.commentId, req.user.id);
      res.status(200).json({
        message: "comment deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}
