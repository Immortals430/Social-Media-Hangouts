import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  getFriendsAPI,
  getFriendSuggestionAPI,
  getLoggedUser,
} from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGGED_USER, userSelector } from "../redux/reducers/user_reducer";
import { Outlet, useNavigate } from "react-router-dom";
import AsideLeft from "../Components/Aside/AsideLeft";
import Navbar from "../Components/Navbar/Navbar";
import {
  navigateSelector,
  SET_PATH,
} from "../redux/reducers/navigation_reducer";
import {
  SET_FRIENDS,
  SET_FRIENDS_REQ,
  SET_FRIENDS_SUGG,
} from "../redux/reducers/friend_reducer";
import { getFriendReqAPI } from "../api/api";
import {
  chatSelector,
  ADD_CHAT,
  SET_ONLINE_USERS,
  SET_UNREAD,
  UPDATE_UNREAD,
} from "../redux/reducers/chat_reducer";
import { socket } from "../config/socket";
import Chatbox from "../Components/Chats/Chatbox";
import PropagateLoader from "react-spinners/PropagateLoader";
import Aside_M from "../Components/Aside/Aside_M";
import Navbar_M from "../Components/Navbar/Navbar_M";
import Chats from "../Components/Chats/Chats";

export default function Homepage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { path } = useSelector(navigateSelector);
  const { loggedUser, profileUser } = useSelector(userSelector);
  const { user } = useSelector(chatSelector);
  const [loading, setLoading] = useState(false);
  const [mobileAside, setMobileAside] = useState(false);

  // check validation on initial render
  useEffect(() => {
    async function fetchLoginStatus() {
      const token = Cookies.get("Hangouts");

      if (token) {
        const { data } = await getLoggedUser(token);
        dispatch(SET_LOGGED_USER(data));
        dispatch(SET_PATH("home"));
      } else {
        navigate("/auth");
        dispatch(await SET_PATH("auth"));
      }
      setLoading(false);
    }
    fetchLoginStatus();

    window.addEventListener('popstate', fetchLoginStatus);
    return () => window.removeEventListener('popstate', fetchLoginStatus);
  }, []);

  // fetch posts, post login
  useEffect(() => {
    async function setupUserData() {
      if (loggedUser._id) {
        const friends = await getFriendsAPI();
        dispatch(SET_FRIENDS(friends.data));
        const frndReq = await getFriendReqAPI();
        dispatch(SET_FRIENDS_REQ(frndReq.data));
        const users = await getFriendSuggestionAPI();
        dispatch(SET_FRIENDS_SUGG(users.data));
      }
    }
    setupUserData();
  }, [loggedUser]);

  // socket
  useEffect(() => {
    if (loggedUser._id) {
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
      {path == "auth" || loading ? null : (
        <>
          <Navbar mobileAside={mobileAside} setMobileAside={setMobileAside} />
          <AsideLeft
            mobileAside={mobileAside}
            setMobileAside={setMobileAside}
          />
          <Aside_M mobileAside={mobileAside} setMobileAside={setMobileAside} />
          <Navbar_M />
        </>
      )}

      {loading ? (
        <div className="home-loading">
          <PropagateLoader color="#0055ff" />
        </div>
      ) : (
        <Outlet />
      )}
      {user._id && loggedUser ? <Chatbox /> : null}

    </>
  );
}
