import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { Post } from "./post_schema.js";
import { Comment } from "../comment/comment_schema.js";
import { ApplicationError } from "../../middlewares/error_handler.js";

export default class PostRepository {
  async getPost(skip, limit, userId) {
    const posts = await Post.find(userId ? { uploader: userId } : null)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("uploader");
    return posts;
  }

  async addPost(uint8Array, caption, uploader) {
    const currentDate = Date.now();
    let url;
    let image;
    if (uint8Array) {
      const storageRef = ref(getStorage(), `post/image-${currentDate}.jpeg`);
      await uploadBytes(storageRef, uint8Array, { contentType: "image/jpeg" });
      url = await getDownloadURL(storageRef);
      image = `image-${currentDate}.jpeg`;
    }

    const post = await Post.create({
      caption,
      image,
      uploader,
      url,
    });
    await post.populate("uploader");

    return post;
  }

  async deletePost(postId, userId) {
    const post = await Post.findById(postId);
    if (post.uploader != userId) {
      throw new ApplicationError("cannot delete other user posts", 401);
    }
    if (!post) {
      throw new ApplicationError("post does not exist", 404);
    }
    if (post.url) {
      const storageRef = ref(getStorage(), `post/${post.image}`);
      deleteObject(storageRef);
    }
    await post.deleteOne();
  }

  async deletePostComments(postId, userId) {
    let deletedCount = 0;
    while (true) {
      const result = await Comment.deleteMany({
        post: postId,
        user: userId,
      }).limit(1);

      if (result.deletedCount === 0) break;
      deletedCount += result.deletedCount;
    }
  }

  async deletePostLikes() {}
}
