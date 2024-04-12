import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchChatstAPI } from "../../api/api";


const initialState = {
    user: {},
    chats: [],
    unreadMsg: [],
    onlineUsers: []
}
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        SET_USER: (state, action) => {
            state.user = action.payload
        },
        SET_CHATS: (state, action) => {
            state.chats = action.payload
        },
        SET_CHAT_UPDATE: (state, action) => {
           state.chats.push(action.payload)
        },
        SET_UNREAD: (state, action) => {
            if(state.unreadMsg.includes(action.payload)) return
            else state.unreadMsg.push(action.payload)          
        },
        SET_RESET: (state, action) => {
            state.user = {}
            state.chats = []
            const index = state.unreadMsg.indexOf(action.payload)
            state.unreadMsg.splice(index, 1)
        },
        SET_ONLINE_USERS: (state, action) => {
            state.onlineUsers = action.payload
        }
    }
})


// fetch chats
export const fetchChats = createAsyncThunk('chats/fetchChats', async (args, { dispatch }) => {
    const { data } = await fetchChatstAPI(args)
    dispatch(SET_CHATS(data.data))
})



export const {SET_USER, SET_CHATS, SET_CHAT_UPDATE,SET_UNREAD,SET_RESET, SET_ONLINE_USERS} = chatSlice.actions
export const chatReducer = chatSlice.reducer
export const chatSelector = state => state.chatReducer
