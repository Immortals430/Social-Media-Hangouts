import { RxCross2 } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  postSelector,
  toggleLike,
  UPDATE_POST,
} from "../../../redux/reducers/post_reducer";
import { userSelector } from "../../../redux/reducers/user_reducer";
import Comments from "../Comments/Comments";
import { useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import GridLoader from "react-spinners/GridLoader";

export default function Posts({ loading }) {
  const { posts } = useSelector(postSelector);
  const dispatch = useDispatch();
  const { loggedUser } = useSelector(userSelector);
  const [viewComment, setViewComment] = useState("");

  async function callLike(postId) {
    const { payload } = await dispatch(toggleLike(postId));
    dispatch(UPDATE_POST(payload));
  }

  return (
    <section>
      {posts.map((post, i) => (
        <div className="post-container" key={i}>
          <div className="post-header">
            <div className="postowner-logo">
              <div
                style={{ backgroundImage: `url(${post.uploader.avatarUrl})` }}
              ></div>
            </div>
            <div className="postowner-name">
              <h4>{post.uploader.username}</h4>
              <div>NA hour ago</div>
            </div>
            <div>
              {post.uploader._id == loggedUser._id ? (
                <div
                  className="delete-post"
                  onClick={() => dispatch(deletePost(post._id))}
                >
                  <RxCross2 size={16} color="#a2a2a2" />
                </div>
              ) : null}
            </div>
          </div>
          {post.caption ? (
            <div className="post-text">
              <p>{post.caption}</p>
            </div>
          ) : null}

          {post.url ? (
            post.url === "loading" ? (
              <div className="post-image loading">
                <GridLoader color="#a2a2a2" />
              </div>
            ) : (
              <div className="post-image">
                <img src={post.url} style={{ maxWidth: "100%" }}></img>
              </div>
            )
          ) : null}

          <div className="post-interacts">
            <div onClick={() => callLike(post._id)}>
              <FaRegHeart size={16} color="red" />
              &nbsp; Like {post.likeCount}
            </div>
            <div
              onClick={() =>
                setViewComment((prev) =>
                  prev && prev == post._id ? "" : post._id
                )
              }
            >
              <FaRegComment size={16} color="#12d877" />
              &nbsp; Comment
            </div>
            <div>
              <IoIosShareAlt size={16} color="#0055ff" />
              &nbsp; Share
            </div>
          </div>
          {viewComment == post._id && <Comments postId={post._id} />}
        </div>
      ))}
      {loading && (
        <div className="post-container loading">
          <ScaleLoader color="#0055ff" />
        </div>
      )}
    </section>
  );
}
