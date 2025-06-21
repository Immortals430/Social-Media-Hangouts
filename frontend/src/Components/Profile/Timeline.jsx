import { RxCross2 } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_POST,
  deletePost,
  toggleLike,
  UPDATE_POST,
} from "../../redux/reducers/post_reducer";
import {
  DELETE_USER_TIMELINE_POST,
  LOAD_USER_TIMELINE,
  SET_USER_PROFILE,
  SET_USER_TIMELINE,
  UPDATE_USER_TIMELINE,
  userSelector,
} from "../../redux/reducers/user_reducer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostAPI } from "../../api/api";
import GridLoader from "react-spinners/GridLoader";
import ScaleLoader from "react-spinners/ScaleLoader";
import "./profile.scss"

export default function Timeline() {
  const { userTimeline, loggedUser } = useSelector(userSelector);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [postPage, setPostPage] = useState(1);
  const [dontFetch, setDontFetch] = useState(false);
  const [loadPost, setLoadPost] = useState(true);
  const [initialRender, setInitialRender] = useState(true);
  const [dpLoaded, setDpLoaded] = useState([]);

  // like post
  async function callLike(postId) {
    const { payload } = await dispatch(toggleLike(postId));
    dispatch(UPDATE_USER_TIMELINE(payload));
    dispatch(UPDATE_POST(payload));
  }

  // delete post
  async function callDeletePost(postId) {
    dispatch(DELETE_USER_TIMELINE_POST(postId));
    dispatch(deletePost(postId));
  }

  useEffect(() => {
    const reset = async () => {
      await dispatch(SET_USER_PROFILE({}));
      await dispatch(SET_USER_TIMELINE([]));
      setLoading(true);
      setDontFetch(false);
      if (!initialRender && postPage == 1) setLoadPost((prev) => !prev);
      else if (!initialRender) setPostPage(1);
    };
    reset();
  }, [id]);

  // infinite reload posts
  useEffect(() => {
    const callPostAPI = async () => {
      if (!dontFetch) {
        const { data } = await getPostAPI(postPage, id);
        if (data.length === 0) setDontFetch(true);
        await dispatch(LOAD_USER_TIMELINE(data));
      }
      setLoading(false);
    };
    callPostAPI();
  }, [postPage, loadPost]);

  const handleScroll = async (e) => {
    const totalHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    const clientHeight = e.target.clientHeight;
    if (scrollTop + clientHeight + 1 >= totalHeight) {
      setLoading(true);
      setPostPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setInitialRender(false);
    const elem = document.querySelector(".profile-main");
    elem.addEventListener("scroll", handleScroll);
    return () => {
      dispatch(SET_USER_PROFILE({}));
      dispatch(SET_USER_TIMELINE([]));
      elem.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section>
      {userTimeline.map((post, i) => (
        <div className="post-container" key={i}>
          <div className="post-header">
            <div
              className={`${
                dpLoaded.includes(post._id) && "img-loaded"
              } postowner-logo`}
            >

              <img
                src={post.uploader.avatarUrl}
                alt=""
                onLoad={() => setDpLoaded((prev) => [...prev, post._id])}
              />
            </div>
            <div className="postowner-name">
              <h4>{post.uploader.name}</h4>
              <div>2 hour ago</div>
            </div>
            <div>
              {id === loggedUser._id ? (
                <>
                  <div
                    className="delete-post"
                    onClick={() => callDeletePost(post._id)}
                  >
                    <RxCross2 size={16} color="#a2a2a2" />
                  </div>
                </>
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
      ))}
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
