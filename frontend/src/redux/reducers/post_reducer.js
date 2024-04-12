import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createCommentAPI, deleteCommentAPI, deletePostAPI, toggleLikeAPI, uploadPostAPI } from '../../api/api';

const initialState = {
    posts: [],
    postImage: {},
}

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    SET_POST: (state, action) => {
      state.posts = action.payload
    },
    SET_POST_IMAGE: (state, action) => {
      state.postImage = action.payload
    }
  }
});

// upload post
export const uploadPost = createAsyncThunk('uploadPost/post', async (args, { dispatch }) => {
  const { data } = await uploadPostAPI(args)
  dispatch(SET_POST(data.data))
})

// like post
export const toggleLike = createAsyncThunk('toggleLike/post', async (postId, { dispatch, getState }) => {
  const {data} = await toggleLikeAPI(postId)
  const posts = [ ...getState().postReducer.posts ]
  const index = posts.findIndex(value => value._id === data.post._id)
  posts[index] = data.post
  dispatch(SET_POST(posts))
})

// create comment
export const createComment = createAsyncThunk('createComment/post', async ({content, postId}, { dispatch, getState }) => {
  const {data} = await createCommentAPI(postId, {content})
  const posts = [ ...getState().postReducer.posts ]
  const index = posts.findIndex(value => value._id === data.post._id)
  posts[index] = data.post
  console.log(posts)
  dispatch(SET_POST(posts))

})

// delete post
export const deletePost = createAsyncThunk('deletepost/post', async (postId, { dispatch }) => {
  const { data } = await deletePostAPI(postId)
  dispatch(SET_POST(data.data))
})

// delete post
export const deleteComment = createAsyncThunk('deleteComment/post', async (commentId, { dispatch, getState }) => {
  const { data } = await deleteCommentAPI(commentId)
  const posts = [ ...getState().postReducer.posts ]
  const index = posts.findIndex(value => value._id === data.data._id)
  posts[index] = data.data
  dispatch(SET_POST(posts))
})




export const postReducer = postSlice.reducer
export const {SET_POST, SET_POST_IMAGE} = postSlice.actions
export const postSelector = state => state.postReducer
