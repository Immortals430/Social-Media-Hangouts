import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import Cookies from "js-cookie";
import { SET_LOGGED_USER, userSelector } from "./redux/reducers/user_reducer";
import {
  getFriendReqAPI,
  getFriendsAPI,
  getFriendSuggestionAPI,
  getLoggedUser,
  getPostAPI,
} from "./api/api";
import Navbar from "./Components/Navbar/Navbar";
import AsideLeft from "./Components/Aside/AsideLeft";
import {
  SET_FRIENDS,
  SET_FRIENDS_REQ,
  SET_FRIENDS_SUGG,
} from "./redux/reducers/friend_reducer";
import {
  ADD_CHAT,
  chatSelector,
  SET_ONLINE_USERS,
  SET_UNREAD,
  UPDATE_UNREAD,
} from "./redux/reducers/chat_reducer";
import Chatbox from "./Components/Chats/Chatbox";
import Navbar_M from "./Components/Navbar/Navbar_M";
import Aside_M from "./Components/Aside/Aside_M";
import { LOAD_POST } from "./redux/reducers/post_reducer";
import { connectSocket, socket } from "./config/socket";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedUser } = useSelector(userSelector);
  const [mobileAside, setMobileAside] = useState(false);
  const { user } = useSelector(chatSelector);

  // check login status on initial render
  useEffect(() => {
    async function fetchLoginStatus() {
      const cookie = Cookies.get("Hangouts");
      if (cookie) {
        const user = await getLoggedUser(cookie);
        setLoading(false);
        dispatch(SET_LOGGED_USER(user.data));
      } else {
        navigate("/auth");
      }
    }
    fetchLoginStatus();
  }, []);

  // fetch posts, post login
  useEffect(() => {
    async function setupUserData() {
      if (loggedUser._id) {
        const post = await getPostAPI(1);
        dispatch(LOAD_POST(post.data));    
 

      }
    }
    setupUserData();
  }, [loggedUser]);

  useEffect(() => {
  
    if (loggedUser._id) {
        connectSocket()
      socket.emit("connected", loggedUser._id);
      socket.on("online-users", (onlineUsers) => {
        dispatch(SET_ONLINE_USERS(onlineUsers));
      });
      socket.on("unread-msgs", ({ unReadMsgs }) => {
        dispatch(SET_UNREAD(unReadMsgs));
      });
      socket.on("new-msg", (msg) => {
        dispatch(ADD_CHAT([msg]));
        if (profileUser._id != msg.sender) dispatch(UPDATE_UNREAD(msg.sender));
      });
      return () => {
        socket.off("online-users");
        socket.off("unread-msgs");
        socket.off("new-msg");
      };
    }
  }, [loggedUser._id]);

  return (
    <>
      {loading && (
        <div className="propogator">
          <PropagateLoader color="#0055ff" />
        </div>
      )}

      {loading || !loggedUser._id ? null : (
        <>
          <Navbar mobileAside={mobileAside} setMobileAside={setMobileAside} />
          <Navbar_M />
          <AsideLeft
            mobileAside={mobileAside}
            setMobileAside={setMobileAside}
          />
          <Aside_M mobileAside={mobileAside} setMobileAside={setMobileAside} />
          <Outlet />

          {user._id && loggedUser ? <Chatbox /> : null}
        </>
      )}
    </>
  );
}

export default App;
