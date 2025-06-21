import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { userSelector } from "../../../redux/reducers/user_reducer";
import { IoSendSharp } from "react-icons/io5";
import {
  ADD_COMMENTS,
  createComment,
  deleteComment,
  LOAD_COMMENTS,
  SET_COMMENTS,
} from "../../../redux/reducers/comment_reducer";
import { useEffect, useState } from "react";
import { commentsSelector } from "../../../redux/reducers/comment_reducer";
import { getCommentAPI } from "../../../api/api";
import BeatLoader from "react-spinners/BeatLoader";
import { removeSkeleton } from "../../../utility/removeSkeleton";
import "../homepage.scss"

export default function Comments({ postId }) {
  const { loggedUser } = useSelector(userSelector);
  const { comments } = useSelector(commentsSelector);
  const dispatch = useDispatch();
  const [dontFetch, setDontFetch] = useState(false);
  const [commentPage, setCommentPage] = useState(1);
  const [loading, setLoading] = useState(false);


  // create comment
  function callCreateComment(e) {
    e.preventDefault();
    const content = e.target.comment.value;
    const uniqueId = crypto.randomUUID();

    dispatch(ADD_COMMENTS([{
          _id: uniqueId,
          content,
          post: postId,
          user: loggedUser,
          temp: true
        }])
    );
    e.target.reset();
    const obj = { content, postId };
    dispatch(createComment({ obj, uniqueId }));
  }

  // infinite reload comments
  useEffect(() => {
    const callGetCommentAPI = async () => {
      if (!dontFetch) {
        const { data } = await getCommentAPI(commentPage, postId);
        if (data.length == 0) setDontFetch(true);
        await dispatch(LOAD_COMMENTS(data));
      }
      setLoading(false);
    };
    callGetCommentAPI();
  }, [commentPage]);

  const handleScroll = async (e) => {
    const totalHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    const clientHeight = e.target.clientHeight;
    if (scrollTop + clientHeight + 1 >= totalHeight) {
      setLoading(true);
      setCommentPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    const elem = document.querySelector(".comment-sec");
    elem.addEventListener("scroll", handleScroll);
    return () => {
      dispatch(SET_COMMENTS([]));
      elem.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <hr />
      <section className="create-comment-sec">
        <div className="loading commentor-logo">
          <img src={loggedUser.avatarUrl} onLoad={removeSkeleton} alt="logo" />
        </div>
        <form onSubmit={(e) => callCreateComment(e)}>
          <textarea
            rows="4"
            placeholder={`Comment as ${loggedUser.name}`}
            name="comment"
          ></textarea>
          <button type="submit">
            <IoSendSharp size={20} />
          </button>
        </form>
      </section>

      <section className="comment-sec">
        {comments.map((comment) => (
          <div className="comment-container" key={comment._id}>
            <div
              className="loading commentowner-logo"
            >
              <img
                src={comment.user.avatarUrl}
                onLoad={removeSkeleton}
              />
            </div>
            <div className="comment-content">
              <h3>{comment.user.name}</h3>
              <div>{comment.content}</div>
            </div>
            {comment.user._id == loggedUser._id && (
              <div className="delete-comment">
                <RxCross2
                  size={16}
                  color="#a2a2a2"
                  onClick={() => {!comment.temp && dispatch(deleteComment(comment._id))}}
                />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="loading">
            <BeatLoader className="comment-spinner" color="#0055ff" />
          </div>
        )}
      </section>
    </>
  );
}
