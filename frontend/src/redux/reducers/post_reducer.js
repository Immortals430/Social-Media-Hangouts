import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deletePostAPI, toggleLikeAPI } from "../../api/api";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    SET_POST: (state, action) => {
      state.posts = action.payload;
    },
    ADD_POST: (state, action) => {
      state.posts = [...action.payload, ...state.posts];
    },
    LOAD_POST: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
    },
    UPDATE_POST: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post._id === action.payload.uniqueId
      );
      delete action.payload.uniqueId;
      state.posts[index] = action.payload;
    },
    DELETE_POST: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post._id === action.payload
      );
      state.posts.splice(index, 1);
    },
  },
});

// like post
export const toggleLike = createAsyncThunk(
  "toggleLike/post",
  async (postId) => {
    try {
      const { data } = await toggleLikeAPI(postId);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

// delete post
export const deletePost = createAsyncThunk(
  "deletepost/post",
  async (postId, { dispatch }) => {
    try {
      dispatch(DELETE_POST(postId));
      deletePostAPI(postId);
      return true;
    } catch (err) {
      console.log(err);
    }
  }
);

export const postReducer = postSlice.reducer;
export const { SET_POST, ADD_POST, LOAD_POST, UPDATE_POST, DELETE_POST } =
  postSlice.actions;
export const postSelector = (state) => state.postReducer;
