import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createCommentAPI,
  deleteCommentAPI,
  getCommentAPI,
} from "../../api/api";
import { connect } from "react-redux";

const initialState = {
  comments: [],
  commentPage: 1,
  dontFetchComment: false,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    SET_COMMENTS: (state, action) => {
      state.comments = action.payload;
    },
    ADD_COMMENTS: (state, action) => {
      state.comments = [...action.payload, ...state.comments];
    },
    LOAD_COMMENTS: (state, action) => {
      state.comments = [...state.comments, ...action.payload];
    },
    UPDATE_COMMENTS: (state, action) => {
      const index = state.comments.findIndex(
        (comment) => comment._id === action.payload.uniqueId
      );
      state.comments[index] = action.payload.data;
    },
    DELETE_COMMENTS: (state, action) => {
      const index = state.comments.findIndex(
        (comment) => comment._id === action.payload
      );
      state.comments.splice(index, 1);
    },
  },
});

// get comments
export const getComments = createAsyncThunk(
  "getComment/comment",
  async (postId, { dispatch }) => {
    try {
      const { data } = await getCommentAPI(postId);
      dispatch(SET_COMMENTS(data));
    } catch (err) {
      console.log(err);
    }
  }
);

// create comment
export const createComment = createAsyncThunk(
  "createComment/comment",
  async (args, { dispatch }) => {
    try {
      const { data } = await createCommentAPI(args.obj.postId, {
        content: args.obj.content,
      });
      // data.uniqueId = args.uniqueId;
      dispatch(UPDATE_COMMENTS({data, uniqueId: args.uniqueId}));
    } catch (err) {
      console.log(err);
    }
  }
);

// delete comment
export const deleteComment = createAsyncThunk(
  "deleteComment/comment",
  async (commentId, { dispatch }) => {
    try {
      dispatch(DELETE_COMMENTS(commentId));
      await deleteCommentAPI(commentId);
    } catch (err) {
      console.log(err);
    }
  }
);

export const commentsReducer = commentSlice.reducer;
export const {
  SET_COMMENTS,
  ADD_COMMENTS,
  LOAD_COMMENTS,
  UPDATE_COMMENTS,
  DELETE_COMMENTS
} = commentSlice.actions;
export const commentsSelector = (state) => state.commentsReducer;
