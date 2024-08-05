import LikeRepository from "./like_repository.js";

export default class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }

  async toggle(req, res, next) {
    const { postId } = req.params;
    try {
      const post = await this.likeRepository.toggle(postId, req.user.id);
      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  }
}
