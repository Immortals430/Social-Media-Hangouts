import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  changePasswordAPI,
  getPostAPI,
  getUserAPI,
  googleLoginAPI,
  sendOtpAPI,
  signinAPI,
  signupAPI,
  updateProfileAPI,
} from "../../api/api";

const initialState = {
  loggedUser: {},
  profileUser: {}, // for profile page
  userTimeline: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_LOGGED_USER: (state, action) => {
      state.loggedUser = action.payload;
    },
    SET_USER_PROFILE: (state, action) => {
      state.profileUser = action.payload;
    },

    SET_USER_TIMELINE: (state, action) => {
      state.userTimeline = action.payload;
    },
    ADD_USER_TIMELINE_POST: (state, action) => {
      state.userTimeline = [...action.payload, ...state.userTimeline];
    },
    LOAD_USER_TIMELINE: (state, action) => {
      state.userTimeline = [...state.userTimeline, ...action.payload];
    },
    UPDATE_USER_TIMELINE: (state, action) => {
      const index = state.userTimeline.findIndex(
        (post) => post._id === action.payload._id
      );
      delete action.payload.uniqueId;
      state.userTimeline[index] = action.payload;
    },
    DELETE_USER_TIMELINE_POST: (state, action) => {
      const index = state.userTimeline.findIndex(
        (post) => post._id === action.payload
      );
      state.userTimeline.splice(index, 1);
    },
  },
});

// sign up
export const signup = createAsyncThunk(
  "user/signup",
  async (args) => {
    try {
      const { data } = await signupAPI(args);
      return data.message;
    } catch ({ response }) {
      window.alert(response.data.message);
      return false;
    }
  }
);

// sign in
export const signin = createAsyncThunk(
  "user/signin",
  async (args, { dispatch }) => {
    try {
      const { data } = await signinAPI(args);
      document.cookie = data.token;
      dispatch(SET_LOGGED_USER(data.user));
    } catch ({ response }) {
      window.alert(response.data.message);
    }
  }
);

// get user for profile page
export const getUser = createAsyncThunk(
  "user/getUser",
  async (args, { dispatch }) => {
    try {
      const { data } = await getUserAPI(args);
      dispatch(SET_USER_PROFILE(data));
    } catch ({ response }) {
      window.alert(response.data.message);
    }
  }
);

// get user posts for profile page
export const getUserTimeline = createAsyncThunk(
  "user/getUserTimeline",
  async ({ page, id }, { dispatch }) => {
    try {
      const { data } = await getPostAPI(page, id);
      dispatch(SET_USER_TIMELINE(data));
    } catch ({ response }) {
      window.alert(response.data.message);
    }
  }
);

// logout
export const logout = createAsyncThunk("user/logout", () => {
  Cookies.remove("Hangouts");
});

// google login
export const googleLogin = createAsyncThunk(
  "user/googleLogin",
  async (args, { dispatch }) => {
    try {
      const { data } = await googleLoginAPI(args);
      document.cookie = data.token;
      dispatch(SET_LOGGED_USER(data.user));
    } catch (err) {
      window.alert(err.response.data.message);
    }
  }
);

// update profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (args, { dispatch }) => {
    try {
      const { data } = await updateProfileAPI(args);
      dispatch(SET_LOGGED_USER(data));
    } catch (err) {
      console.log(err);
    }
  }
);

// send otp
export const sendOtp = createAsyncThunk("user/sentOtp", async (args) => {
  try {
    const { data } = await sendOtpAPI(args);
    alert(data.message);
    return data.message;
  } catch ({ response }) {
    window.alert(response.data.message);
  }
});

// reset password
export const changePassword = createAsyncThunk(
  "user/unfriend",
  async (args, { dispatch, getState }) => {
    try {
      const { data } = await changePasswordAPI(args);
      alert(data.message);
      return data.message;
    } catch ({ response }) {
      alert(response.data.message);
    }
  }
);

export const userReducer = userSlice.reducer;
export const {
  SET_LOGGED_USER,
  ADD_USER_TIMELINE_POST,
  DELETE_USER_TIMELINE_POST,
  UPDATE_USER_TIMELINE,
  SET_USER_TIMELINE,
  SET_USER_PROFILE,
  SET_USERS_LIST,
  UPDATE_USER_LIST,
  SET_AVATAR,
  SET_LOGGED_USER_AVATAR,
  SET_USER_MEMORIES,
  LOAD_USER_TIMELINE,
} = userSlice.actions;
export const userSelector = (state) => state.userReducer;
