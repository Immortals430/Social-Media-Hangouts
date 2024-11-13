import axios from "axios";
export const baseURL =  import.meta.env.VITE_APP_BASE_URL || "http://localhost:8000";

const API = axios.create({
  baseURL: baseURL + "/api/v1",
  withCredentials: true,
});


export const signupAPI = (authData) => API.post("/user/signup", authData);

export const signinAPI = (authData) => API.post("/user/signin", authData);

export const googleLoginAPI = (token) =>
  API.post(`/user/google-login/`, null, {headers: {Authorization: token}});

export const getUserAPI = (id = "") => API.get(`/user/get-user/${id}`);

export const getLoggedUser = (data) =>
  API.get(`/user/get-login-status/${data}`);

export const getPostAPI = (page, userId = "") =>
  API.get(`/post/get-post?page=${page}&userId=${userId}`);

export const toggleFrndReqAPI = (friendId) =>
  API.put(`/friendship/toggle-request/${friendId}`);

export const respondReqAPI = (friendId, respond) =>
  API.put(`/friendship/respond?friendId=${friendId}&respond=${respond}`);

export const createPostAPI = (data) =>
  API.post(`/post/add-post`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const toggleLikeAPI = (postId) => API.get(`/like/toggle/${postId}`);

export const getCommentAPI = (page, postId) => API.get(`/comment/get?page=${page}&postId=${postId}`);

export const createCommentAPI = (postId, content) =>
  API.post(`/comment/create/${postId}`, content);

export const deletePostAPI = (postId) =>
  API.delete(`/post/delete-post/${postId}`);

export const updateProfileAPI = (data) =>
  API.put(`/user/update-user`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const unfriendAPI = (id) => API.delete(`/friendship/unfriend/${id}`);

export const getFriendsAPI = (id) => API.get("/friendship/get-friend-list");

export const getFriendReqAPI = (id) =>
  API.get("/friendship/get-friend-req-list");


export const getFriendSuggestionAPI = () =>
  API.get("/user/get-friend-suggestion");

export const fetchChatstAPI = (friendId, page) =>
  API.get(`/chats/get-chats?friendId=${friendId}&page=${page}`);

export const updateReadAPI = (friendId) =>
  API.put(`/chats/update-read/${friendId}`);

export const sendOtpAPI = (email) => API.post(`/user/send-otp`, { email });

export const changePasswordAPI = (data) =>
  API.post(`/user/change-password`, data);

export const deleteCommentAPI = (commentId) =>
  API.delete(`/comment/delete/${commentId}`);

export const getChatListAPI = () => API.get("/chats/get-chat-list")