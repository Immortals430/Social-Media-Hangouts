import axios from "axios";
export const baseURL =  process.env.REACT_APP_BASE_URL || "http://localhost:8000"

const API = axios.create({ 
    baseURL: baseURL + "/api/v1",
    withCredentials: true,
 });

export const signupAPI = authData => API.post("/user/signup", authData);
export const signinAPI = authData => API.post("/user/signin", authData);
export const googleLoginAPI = data => API.post("/user/google-login", data);
export const getUserAPI = (id = '') => API.get(`/user/get-user?id=${id}`);
export const getPostAPI = () => API.get(`/post/get-post`)
export const toggleFrndReqAPI = friendId => API.put(`/friendship/toggle-request`, {friendId})
export const respondReqAPI = ({friendId, respond}) => API.put(`/friendship/respond?friendId=${friendId}&respond=${respond}`)
export const uploadPostAPI = data => API.post(`/post/add-post`, data, {headers: {'Content-Type': 'multipart/form-data'}})
export const toggleLikeAPI = postId => API.get(`/like/toggle/${postId}`)
export const createCommentAPI = (postId, content) => API.post(`/comment/create/${postId}`, content)
export const deletePostAPI = (postId) => API.delete(`/post/delete-post/${postId}`)
export const updateProfileAPI = data => API.put(`/user/update-user`, data, {headers: {'Content-Type': 'multipart/form-data'}})
export const unfriendAPI = id => API.delete(`/friendship/unfriend/${id}`)
export const fetchChatstAPI = friendId => API.get(`/chats/get-all-chat/${friendId}`)
export const sendOtpAPI = email => API.post(`/user/send-otp`, {email})
export const changePasswordAPI = data => API.post(`/user/change-password`, data)
export const deleteCommentAPI = (commentId) => API.delete(`/comment/delete/${commentId}`)

