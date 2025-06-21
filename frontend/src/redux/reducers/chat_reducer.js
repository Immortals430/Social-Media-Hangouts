import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateReadAPI } from "../../api/api";

const initialState = {
  chatList: [],
  user: {},
  chats: [],
  unreadMsg: [],
  onlineUsers: [],
  initialLoadChat: true
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    SET_USER: (state, action) => {
      state.user = action.payload;
    },
    ADD_CHAT: (state, action) => {
      state.chats = [...action.payload, ...state.chats];
    },
    SET_CHAT_HISTORY: (state, action) => {
      state.chats = [...state.chats, ...action.payload];
    },
    RESET_CHAT: (state) => {
      state.chats = [];
    },
    SET_UNREAD: (state, action) => {
      state.unreadMsg = action.payload;
    },
    UPDATE_UNREAD: (state, action) => {
      const id = state.unreadMsg.find((elem) => elem === action.payload);
      if (!id) state.unreadMsg.push(action.payload);
    },
    REMOVE_UNREAD: (state, action) => {
      const index = state.unreadMsg.indexOf(action.payload);
      if (index !== -1) state.unreadMsg.splice(index, 1);
    },
    SET_ONLINE_USERS: (state, action) => {
      state.onlineUsers = action.payload;
    },
    SET_CHATLIST: (state, action) => {
      state.chatList = action.payload
    },
    SET_INITIAL_LOAD_CHAT: (state) => {
      state.initialLoadChat = false;
    },
  },
});

// set unread
export const setSeen = createAsyncThunk("chats/setSeen", async (friendId) => {
  try {
    await updateReadAPI(friendId);
  } catch (err) {
    console.log(err);
  }
});



export const {
  SET_USER,
  ADD_CHAT,
  SET_UNREAD,
  REMOVE_UNREAD,
  UPDATE_UNREAD,
  RESET_CHAT,
  SET_ONLINE_USERS,
  SET_CHAT_HISTORY,
  SET_CHATLIST,
  SET_INITIAL_LOAD_CHAT
} = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
export const chatSelector = (state) => state.chatReducer;
