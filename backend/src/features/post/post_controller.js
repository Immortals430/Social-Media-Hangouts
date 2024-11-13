import { compressImage } from "../../utils/sharp.js";
import PostRepository from "./post_repository.js";

export default class PostController {
  constructor() {
    this.postRepository = new PostRepository();
  }

  async getPost(req, res, next) {
    const { userId, page } = req.query
    const limit = 10;
    const skip = (page - 1) * limit;

    try {
      const posts = await this.postRepository.getPost(skip, limit, userId);
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  }

  async addPost(req, res, next) {
    try {
      const { caption } = req.body;
      const imageSize = 550;
      let uint8Array;
      if(req.file){
        uint8Array = await compressImage(req.file.buffer, imageSize);
      }
      const post = await this.postRepository.addPost(
        uint8Array,
        caption,
        req.user.id
      );
      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  }

  async deletePost(req, res, next) {
    const { postId } = req.params;
    try {
      await this.postRepository.deletePost(postId, req.user.id);
      this.postRepository.deletePostComments(postId, req.user.id);

      res.status(200).json({ message: "post deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}
