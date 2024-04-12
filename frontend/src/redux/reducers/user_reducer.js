import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { changePasswordAPI, googleLoginAPI, respondReqAPI, sendOtpAPI, signinAPI, signupAPI, toggleFrndReqAPI, unfriendAPI, updateProfileAPI } from '../../api/api';
import { setLocalStorage } from '../../utils/set_local_storage';


const initialState = {
    loggedUser: {},
    users: [],
    userAvatar: [],
    loggedUserAvatar: '',
    userMemories: [] 
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_LOGGED_USER: (state, action) => {
      state.loggedUser = action.payload
    },

    SET_USERS_LIST: (state, action) => {
      state.users = action.payload
    },
    UPDATE_USER_LIST: (state, action) => {
      state.users = [ ...state.users, action.payload]
    },
    SET_AVATAR: (state, action) => {
      state.userAvatar = action.payload
    },
    SET_LOGGED_USER_AVATAR: (state, action) => {
      state.loggedUserAvatar = action.payload
    },
    SET_USER_MEMORIES: (state, action) => {
      state.userMemories = action.payload
    }
  }
});


// sign up
export const signup = createAsyncThunk('user/signup', async (args, { dispatch }) => {
  try{
      const {data}  = await signupAPI(args)
      window.alert(data.message)
  }
  catch(err){
      window.alert(err.response.data.message)
  }
})



// sign in
export const signin = createAsyncThunk('user/signin', async (args, { dispatch }) => {
    try{
        const {data}  = await signinAPI(args)
        document.cookie = data.token
        setLocalStorage(data.data._id)
        dispatch(SET_LOGGED_USER(data.data))
     
    }
    catch(err){
        window.alert(err.response.data.message)
    }
})


// google login
export const googleLogin = createAsyncThunk('user/signin', async (args, { dispatch }) => {
  try{
      const {data}  = await googleLoginAPI(args)
      document.cookie = data.token
      setLocalStorage(data.data._id)
      dispatch(SET_LOGGED_USER(data.data))
   
  }
  catch(err){
      window.alert(err.response.data.message)
  }
})




// logout
export const logout = createAsyncThunk('user/logout', async (args, { dispatch }) => {
    localStorage.removeItem("loggedUser")
    document.cookie = "Hangouts=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(SET_LOGGED_USER({}))
    dispatch(SET_USERS_LIST([]))
    
})

// toggle request
export const toggleFrndReq = createAsyncThunk('user/sndReq', async ({friendId}, { dispatch, getState }) => {
    try{
      const { data } = await toggleFrndReqAPI(friendId)
      const users = [ ...getState().userReducer.users ]
      const index = users.findIndex(value => value._id === data.data._id)
      users[index] = data.data
      dispatch(SET_USERS_LIST(users))
    }
    catch(err){
      console.log('Something went wrong bro')
    }
})


// respond to request
export const respondReq = createAsyncThunk('user/respondReq', async (args, { dispatch, getState }) => {
  try{
    const { data } = await respondReqAPI(args)
    dispatch(SET_LOGGED_USER(data.data.user))
    const users = [ ...getState().userReducer.users ]
    const friendIndex = users.findIndex(value => value._id === data.data.friend._id)
    const userIndex = users.findIndex(value => value._id === data.data.user._id)
    users[friendIndex] = data.data.friend
    users[userIndex] = data.data.user
    dispatch(SET_USERS_LIST(users))
  }
  catch(err){
    console.log('Something went wrong bro')
  }
})


// update profile
export const updateProfile = createAsyncThunk('user/updateProfile', async (args, { dispatch }) => {
  try{
    const { data } = await updateProfileAPI(args)
    dispatch(SET_LOGGED_USER(data.data))
  }
  catch(err){
    console.log('Something went wrong bro')
  }
})

// unfriend
export const unfriend = createAsyncThunk('user/unfriend', async (args, { dispatch, getState }) => {
  try{
    const {data} = await unfriendAPI(args)
    dispatch(SET_LOGGED_USER(data.data.user))
    const users = [ ...getState().userReducer.users ]
    const friendIndex = users.findIndex(value => value._id === data.data.friend._id)
    const userIndex = users.findIndex(value => value._id === data.data.user._id)
    users[friendIndex] = data.data.friend
    users[userIndex] = data.data.user
    dispatch(SET_USERS_LIST(users))
  }
  catch(err){
    console.log('Something went wrong bro')
  }
})


// send otp
export const sendOtp = createAsyncThunk('user/unfriend', async args => {
  try{
    const {data} = await sendOtpAPI(args)
    alert(data.message)

  }
  catch(err){
    console.log('Something went wrong bro')
  }
})


// reset password
export const changePassword = createAsyncThunk('user/unfriend', async (args, { dispatch, getState }) => {
  try{
    const {data} = await changePasswordAPI(args)
    alert(data.message)

  }
  catch(err){
    console.log('Something went wrong bro')
  }
})



export const userReducer = userSlice.reducer
export const {SET_LOGGED_USER, SET_USERS_LIST, UPDATE_USER_LIST, SET_AVATAR, SET_LOGGED_USER_AVATAR, SET_USER_MEMORIES} = userSlice.actions
export const userSelector = state => state.userReducer