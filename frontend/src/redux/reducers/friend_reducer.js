import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { respondReqAPI, toggleFrndReqAPI, unfriendAPI } from "../../api/api";
import { SET_USER_PROFILE } from "./user_reducer";

const initialState = {
  friends: [],
  friendReqsRec: [],
  friendSuggestions: [],
};

const friendSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    SET_FRIENDS: (state, action) => {
      state.friends = action.payload;
    },
    ADD_NEW_FRIEND: (state, action) => {
      state.friends.push(action.payload)
    },
    DELETE_FRIEND: (state, action) => {
      const index = state.friends.findIndex(({friend}) => friend._id === action.payload)
      state.friends.splice(index, 1)
    },
    SET_FRIENDS_REQ: (state, action) => {
      state.friendReqsRec = action.payload;
    },
    DELETE_FRIEND_REQ_REC: (state, action) => {
      const index = state.friendReqsRec.findIndex(obj => obj.friend._id === action.payload)
      state.friendReqsRec.splice(index, 1)
    },
    SET_FRIENDS_SUGG: (state, action) => {
      state.friendSuggestions = action.payload;
    },
    UPDATE_FRIENDS_SUGG: (state, action) => {
      const index = state.friendSuggestions.findIndex((user) => user._id === action.payload)
      state.friendSuggestions[index].reqSent = !state.friendSuggestions[index].reqSent
    },
  },
});

// toggle request
export const toggleFrndReq = createAsyncThunk(
  "friend/toggleFrndReq",
  async (friendId, {dispatch, getState}) => {
    try {
      const profileUser = {...getState().userReducer.profileUser}
      const { data } = await toggleFrndReqAPI(friendId);
      if(data === "friend request sent") profileUser.reqSent = true
      else profileUser.reqSent = false
      dispatch(SET_USER_PROFILE(profileUser))
      dispatch(UPDATE_FRIENDS_SUGG(friendId));
    } catch (err) {
      console.log(err);
    }
  }
);

// respond to request
export const respondReq = createAsyncThunk(
  "friend/respondReq",
  async ({ friendId, respond}, { dispatch, getState }) => {
    try {
      const { data } = await respondReqAPI(friendId, respond);
      if(data.message === "request accepted"){
        dispatch(ADD_NEW_FRIEND(data.friend))
      }
      dispatch(DELETE_FRIEND_REQ_REC(friendId))

    } catch (err) {
      console.log(err);
    }
  }
);

// unfriend
export const unfriend = createAsyncThunk(
  "friend/unfriend",
  async (friendId, { dispatch, getState }) => {
    try {
      dispatch(DELETE_FRIEND(friendId))
      await unfriendAPI(friendId);
    } catch (err) {
      console.log(err);
    }
  }
);







export const friendsReducer = friendSlice.reducer;
export const {
  SET_FRIENDS,
  ADD_NEW_FRIEND,
  DELETE_FRIEND,
  SET_FRIENDS_REQ,
  DELETE_FRIEND_REQ_REC,
  SET_FRIENDS_SUGG,
  UPDATE_FRIENDS_SUGG,

} = friendSlice.actions;
export const friendsSelector = (state) => state.friendsReducer;
