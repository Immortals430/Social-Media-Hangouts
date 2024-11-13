import { Post } from "../post/post_schema.js";
import { Like } from "./like_schema.js";

export default class LikeRepository {
  async toggle(postId, userId) {
    const post = await Post.findById(postId).populate('uploader');
    const like = await Like.findOne({ post: postId, user: userId });

    if (!like) {
      await Like.create({ post: postId, user: userId });
      post.likeCount = post.likeCount + 1;
    } else {
      await like.deleteOne();
      post.likeCount = post.likeCount - 1;
    }

    await post.save();
    return post
  }
}
