import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  chatSelector,
  REMOVE_UNREAD,
  SET_CHATLIST,
  SET_INITIAL_LOAD_CHAT,
  SET_USER,
  setSeen,
} from "../../redux/reducers/chat_reducer";
import { getChatListAPI } from "../../api/api";
import { userSelector } from "../../redux/reducers/user_reducer";
import "./chats.scss";
import ChatLazy from "./ChatLazy";

export default function Chats() {
  const { chatList, initialLoadChat } = useSelector(chatSelector);
  const dispatch = useDispatch();
  const { loggedUser } = useSelector(userSelector);

  useEffect(() => {
    async function loadChatlist() {
      try {
        const { data } = await getChatListAPI();
        await dispatch(SET_CHATLIST(data));
        dispatch(SET_INITIAL_LOAD_CHAT());
      } catch (err) {
        console.log(err);
      }
    }
    loadChatlist();
  }, []);

  // start chat
  async function callStartChat(user) {
    await dispatch(SET_USER({}));
    dispatch(SET_USER(user));
    dispatch(REMOVE_UNREAD(user._id));
    dispatch(setSeen(user._id));
  }

  if (initialLoadChat) {
    return <ChatLazy />;
  }

  return (
    <main className="chats">
      <div>
        <h1>Chats</h1>
        <section>
          {chatList.map((chat) => (
            <div
              className="chatlist-container"
              onClick={() =>
                callStartChat(
                  chat.users.find((user) => user._id != loggedUser._id)
                )
              }
              key={chat._id}
            >
              <div
                className="user-icon"
                style={{
                  backgroundImage: `url(${
                    chat.users.find((user) => user._id != loggedUser._id).avatarUrl
                  })`,
                }}
              ></div>
              <div>
                <h3>
                  {chat.users.find((user) => user._id != loggedUser._id).name}
                </h3>
                <p>{chat.lastMessage.content}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
