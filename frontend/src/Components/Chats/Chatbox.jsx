import { RxCross2 } from "react-icons/rx";
import { IoIosSend } from "react-icons/io";
import {
  chatSelector,
  SET_CHAT_HISTORY,
  ADD_CHAT,
  RESET_CHAT,
  SET_USER,
} from "../../redux/reducers/chat_reducer";
import { socket } from "../../config/socket";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { userSelector } from "../../redux/reducers/user_reducer";
import { useEffect } from "react";
import { fetchChatstAPI } from "../../api/api";
import { Link } from "react-router-dom";
import { removeSkeleton } from "../../utility/removeSkeleton";
import "./chats.scss"

export default function Chatbox() {
  const dispatch = useDispatch();
  const { user, chats, onlineUsers } = useSelector(chatSelector);
  const { loggedUser } = useSelector(userSelector);
  const [dontFetch, setDontFetch] = useState(false);
  const [chatPage, setChatPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // infinite reload posts
  useEffect(() => {
    const callGetChastAPI = async () => {
      if (!dontFetch) {
        const { data } = await fetchChatstAPI(user._id, chatPage);
        if (data.length == 0) setDontFetch(true);
        await dispatch(SET_CHAT_HISTORY(data));
      }
      setLoading(false);
    };
    callGetChastAPI();
  }, [chatPage, user._id]);

  const handleScroll = async (e) => {
    const totalHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    const clientHeight = e.target.clientHeight;
    if (scrollTop - clientHeight - 1 <= -totalHeight) {
      setLoading(true);
      setChatPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const elem = document.querySelector(".msg-container");
    elem.addEventListener("scroll", handleScroll);
    return () => {
      dispatch(RESET_CHAT(user._id));
      elem.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // send message
  function sendMsg(e) {
    e.preventDefault();
    const content = e.target.message.value;
    socket.emit("msg", { content, receiver: user._id, sender: loggedUser._id });
    e.target.reset();
    dispatch(ADD_CHAT([{ content, sender: loggedUser._id }]));
  }

  return (
    <section className="chats-container">
      <div className="msg-head">
        <div className="msg-head-dp loading">
          <img src={user.avatarUrl} alt="logo" onLoad={removeSkeleton} />
        </div>
        <h3 className="msg-head-name">
          <Link to={`/profile/${user._id}`}>{user.name}</Link>
        </h3>
        {onlineUsers.includes(user._id) && (
          <span className="online-logo"></span>
        )}

        <RxCross2 size={20} onClick={() => dispatch(SET_USER({}))} />
      </div>

      <div className="msg-container">
        {chats.map((obj, i) =>
          obj.sender == loggedUser._id ? (
            <p className="sent-msg" key={i}>
              {obj.content}
            </p>
          ) : (
            <p className="rec-msg" key={i}>
              {obj.content}
            </p>
          )
        )}
      </div>

      <form className="msg-form" onSubmit={sendMsg}>
        <textarea name="message" placeholder="stat typing...."></textarea>
        <button type="submit">
          <IoIosSend size={20} />
        </button>
      </form>
    </section>
  );
}
