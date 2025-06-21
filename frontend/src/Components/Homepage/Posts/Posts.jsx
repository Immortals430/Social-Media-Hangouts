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
import { Suspense, useState } from "react";
import { lazy } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { removeSkeleton } from "../../../utility/removeSkeleton";

const Comments = lazy(() => import("../Comments/Comments"));
import "../homepage.scss"

function Posts({ loading }) {
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
      {posts.map((post) => (
        <div className={`post-container`} key={post._id}>
          <div className="post-header">
            <div className={"loading postowner-logo"}>
              <img
                src={post.uploader.avatarUrl}
                onLoad={removeSkeleton}
                alt=""
              />
            </div>
            <div className="postowner-name">
              <h4>{post.uploader.name}</h4>
              <div>NA hour ago</div>
            </div>
            <div>
              {post.uploader._id == loggedUser._id ? (
                <div
                  className="delete-post"
                  onClick={() => {
                    !post.temp && dispatch(deletePost(post._id));
                  }}
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

          {post.url && (
            <div className={`post-image loading`}>
              <img src={post.url} onLoad={removeSkeleton} alt="" />
            </div>
          )}

          <div className="post-interacts">
            <div onClick={() => callLike(post._id)}>
              <FaRegHeart size={16} color="red" className="center" />
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
          {viewComment == post._id && (
            <Suspense
              fallback={
                <BeatLoader className="comment-spinner" color="#0055ff" />
              }
            >
              <Comments postId={post._id} />
            </Suspense>
          )}
        </div>
      ))}

      {/* loading skeleton */}
      {loading && (
        <div className={`post-container`}>
          <div className="post-header">
            <div className={"loading postowner-logo"}></div>
          </div>

          <div className={`post-image loading`}></div>

          <div className="post-interacts">
            <div>
              <FaRegHeart size={16} color="red" className="center" />
              &nbsp; Like
            </div>
            <div>
              <FaRegComment size={16} color="#12d877" />
              &nbsp; Comment
            </div>
            <div>
              <IoIosShareAlt size={16} color="#0055ff" />
              &nbsp; Share
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Posts;
